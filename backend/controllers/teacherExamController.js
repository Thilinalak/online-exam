const dbConfig = require("../config/dbConfig");
const mysql = require("mysql2");
const _ = require("lodash");
const { result } = require("lodash");

const db = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

//add new exam
//@Route POST /exam/add-new-exam
const addNewExam = (req, res) => {
  const lastUpdatedDateTime = new Date().toLocaleString();

  const { examName, selectedDateTime, duration, id, tableData } = req.body;

  db.query(
    `SELECT idteacher FROM teacher WHERE user_credentials_id =${id}`,
    (err, result) => {
      if (!err) {
        let examData = {
          exam_name: examName,
          last_updated: lastUpdatedDateTime,
          datetime: selectedDateTime,
          duration: duration,
          isPublished: false,
          teacher_idteacher: result[0].idteacher,
          status: true
        };

        db.query("INSERT INTO exam SET ?", examData, (err, result) => {
          if (!err) {
            saveQuestions(result.insertId, tableData);
            res.status(200).json({message :'SUCCESS'});
          } else {
            console.log(err);
          }
        });
      } else {
        console.log(err);
        
      }
    }
  );
};

const saveQuestions = (examID, tableData) => {
  tableData.map((quesdata) => {
    db.query(
      "INSERT INTO question (question, correct_answer, exam_id) VALUES (?,?,?)",
      [quesdata.question, quesdata.correctAnswer, examID],
      (err, result) => {
        if (!err) {
          saveAnswers(result.insertId, quesdata.answers);
        } else {
          console.log(err);
        }
      }
    );
  });
};

const saveAnswers = (questionID, answers) => {

  answers.map((answerData) => {
    db.query(
      "INSERT INTO answers (answer, aquestion_id) VALUES (?,?)",
      [answerData.answer, questionID],
      (err, result) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
};

// Teacher View Exams
// @Route GET /exam/teacher-view-exam/:id
const teacherViewExams = (req, res) => {
  db.query(
    `SELECT * FROM exam WHERE teacher_idteacher = ${req.params.id}`,
    (err, result) => {
      !err ? res.send(result) : console.log(err);
    }
  );
};


// GET Questions and answers
//@Route GET /exam/questions-answers/:id
const questionsAnswers = (req, res) => {
  const examID = req.params.id;

  console.log('asdsadsssa ',examID);
  db.query(`SELECT q.*, a.* FROM question q
    JOIN answers a ON
    q.question_id = a.aquestion_id WHERE q.exam_id = ${examID}`,
    (err, result) => {
      if(!err){
        let questions = _.groupBy(result,'question_id');

        let quetionsDtso = []

        for (const question in questions) {
          // console.log(questions[question]);

          let quetionDto = {
            questionId : questions[question][0].aquestion_id,
            question : questions[question][0].question,
            answers : []
          }

            let answers = _.groupBy(questions[question],'idanswer');

            for (const answerskey in answers) {
              for (const answer of answers[answerskey]) {
                
                let answerDto = {
                  answerId:answer.idanswer,
                  answer:answer.answer
                }

                quetionDto.answers.push(answerDto);

              }
            }
            
          quetionsDtso.push(quetionDto)
        }
        res.status(200).json(quetionsDtso)
       
      }else{
        console.log(err);
      }     
    }
  );
  

};

// Search Exam
//@Route POST /exam/serach-exam
const searchExam = (req, res) => {
  const searchExam = req.body.searchText;
  console.log(searchExam);
  db.query(
    `SELECT * FROM exam WHERE exam_name = ${searchExam}`,
    (err, result) => {
      err ? console.log(err) : consoe.log(result);
      res.send(result);
    }
  );
};

// @Desc    send info to monitorStartedExam page
// @Method  GET
// @Route   /exam//monitor-started-exam/
const monitorStartedExam = (req, res)=>{
    const examID = req.query.examid

    let responseObj = {
      total_Students : 0,
      examCompletedStudents : 0,
      attendingList: []
    }

    db.query(`SELECT(SELECT COUNT(*) FROM   student) AS Total_Students,
    (SELECT COUNT(*)  FROM   student_exam WHERE exam_id= ${examID} AND isExamComplete=${true}) AS examCompletedStudents FROM dual`,(err, result)=>{
      if(!err){
        responseObj.total_Students = result[0].Total_Students 
        responseObj.examCompletedStudents = result[0].examCompletedStudents 
      }else{
        console.log(err);
      }
    })

    db.query(`SELECT student_id, isExamComplete FROM student_exam WHERE exam_id =${examID} `,(err, student_examResult) =>{
      if(!err){
        student_examResult.map((se) =>{
          db.query(`SELECT f_name, l_name FROM student WHERE idstudent = ${se.student_id}`,(error, resultt) =>{
            if(!error){
              responseObj.attendingList.push({
                studentName: resultt[0].f_name +" "+ resultt[0].l_name,
                completeStatus : se.isExamComplete === 1 ? "Complete" : "Pending"
              })
            }else{
                console.log(error);
            }
          })
        })
      }else{
        console.log(err);
      }
      
    })
    db.query(`SELECT f_name, l_name FROM student WHERE idstudent NOT IN (SELECT student_id FROM student_exam WHERE exam_id = ${examID})`,(errr, reslt) =>{
      if(!errr){
        if(reslt.length > 0){
          reslt.map((student)=>{
            responseObj.attendingList.push({
              studentName: student.f_name +" "+ student.l_name,
                completeStatus : "Pending"
            })
          })
        }
      }else{
        console.log(errr);

      }
    })

    setTimeout(()=>{
      res.status(200).json({resObj:responseObj})
    },1000)
 
}

// @Desc    Publish exam
// @Method  PUT
// @Route   /exam/exam-publish/:id
const publishExam = (req, res) =>{
  const examID = req.params.id
  db.query(`UPDATE exam SET isPublished=${true} WHERE idexam=${examID}`,(err, result)=>{
    !err ? res.status(200).json({message: 'OK'}) : console.log(err);
  })
}

// @Desc    Teacher end exam 
// @Method  PUT
// @Route   /exam//end-exam/:id
const endExam = (req, res)=>{
  
  db.query(`UPDATE exam SET isPublished=${false} WHERE idexam=${req.params.id}`,(err, result)=>{
    !err ? res.status(200).json({message: 'OK'}) : console.log(err)
  })
}

module.exports = {
  addNewExam,
  teacherViewExams,
  questionsAnswers,
  searchExam,
  publishExam,
  monitorStartedExam,
  endExam,
};


