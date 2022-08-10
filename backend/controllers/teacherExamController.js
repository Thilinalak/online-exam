const dbConfig = require("../config/dbConfig");
const mysql = require("mysql2");
const _ = require("lodash")

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
          student_status: false,
          isPublished: false,
          teacher_idteacher: result[0].idteacher,
          status: true
        };

        db.query("INSERT INTO exam SET ?", examData, (err, result) => {
          if (!err) {
            saveQuestions(result.insertId, tableData);
            res.status(200);
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
// @Route GET /exam/teacher-view-exam
const teacherViewExams = (req, res) => {
  db.query(
    "SELECT idexam, exam_name,datetime,duration, last_updated, status FROM exam WHERE teacher_idteacher = ?",
    [1],
    (err, result) => {
      !err ? res.send(result) : console.log(err);
    }
  );
};


// Publish exam
// @Route PUT /exam/publish-exam/:id
const pubishExam = (req, res) =>{
  console.log('got the ID ' ,req.params.id);
}


// GET Questions and answers
//@Route GET /exam/questions-answers/:id
const questionsAnswers = (req, res) => {
  const examID = req.params.id;
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


module.exports = {
  addNewExam,
  teacherViewExams,
  questionsAnswers,
  searchExam,
  pubishExam,
};


