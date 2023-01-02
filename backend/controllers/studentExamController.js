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

// Student View Exams
// @Route GET /exam/student-view-exam
const studentViewExams = (req, res) => {
    const studentID = req.params.studentid
    db.query(
      `SELECT idexam, exam_name, datetime , duration FROM exam WHERE  isPublished = ${true}`,
      (err, result) => {
        if(!err){
          checkIsAttended(result,studentID,res)
        }else{
          console.log(err);
        }
       
        // !err ? res.send(result) : console.log(err);
      }
    ); 
  const checkIsAttended = (exams,studentID, res)=>{
      let ExamsArry = []

      exams.map((exm)=>{
        db.query(`SELECT isExamComplete FROM student_exam WHERE student_id = ${studentID} AND exam_id =${exm.idexam}`,
        (err, result)=>{
          if(!err){
            exm.isAttended= result.length == 0 ? 0 : result[0].isExamComplete == 1 ? 1: 0
            ExamsArry.push(exm)
          }else{
            console.log(err);
          }
        })
      })

setTimeout(() => {
  res.send(ExamsArry)
}, 500);
  }
  
  
};

// GET Questions and answers
//@Route GET /exam/questions-answers/:id
const questionsAnswers = (req, res) => {
  const {examID, studentID} = req.query
  
   db.query(
    `SELECT q.*, a.* FROM question q
    JOIN answers a ON
    q.question_id = a.aquestion_id WHERE q.exam_id = ${examID}`,
    (err, result) => {
      if (!err) {
        let questions = _.groupBy(result, "question_id");

        let quetionsDtso = [];

        for (const question in questions) {
          // console.log(questions[question]);

        // db.query(`SELECT * from student_answer WHERE student_id = ${studentID} AND exam_id =${examID} AND question_id = ${questions[question][0].aquestion_id}`,
        //   (err, result)=>{
        //     if(!err){
        //       if(result.length !== 0){ 
        //         console.log(result[0].answer);
        //         previousAnswer = result[0].answer
        //       }else{previousAnswer = 0 }
        //     }else{
        //       console.log(err);
        //     }
        //   })

          let answers = _.groupBy(questions[question], "idanswer");

          let quetionDto = {
            questionId: questions[question][0].aquestion_id,
            question: questions[question][0].question,
            answers: [],
          };

          for (const answerskey in answers) {
            for (const answer of answers[answerskey]) {
              let answerDto = {
                answerId: answer.idanswer,
                answer: answer.answer,
              };

              quetionDto.answers.push(answerDto);
            }
          }

          quetionsDtso.push(quetionDto);
        }
        res.status(200).json(quetionsDtso);
      } else {
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

// Student Single Exam Save/Complete
// @Route POST exam/student-save-exam
const studentExamSave = (req, res) => {
  const { examID, questions, studentID ,isExamCompleted} = req.body;
  let questionIDsWithEnteringAnswers = [];

  questions.map((q) => {
    if (q.enteringAnswer) {
      let qansC = { questionId: q.questionId, enteringAnswer: q.enteringAnswer };
      questionIDsWithEnteringAnswers.push(qansC);
    }
  });
  db.query(
    `SELECT * FROM student_exam WHERE student_id=${studentID} AND exam_id= ${examID} `,
    (err, result) => {
      if(err){
        console.log(err);
      }
      else if (result.length === 0) {
        insertIntoStudentExam(studentID, examID, questionIDsWithEnteringAnswers);
        isExamCompleted ?
          generateFinalResult(questionIDsWithEnteringAnswers,studentID, examID, res)
        :
        res.status(200).json({ message: "Saved" });
      } else {
        saveAnswers(questionIDsWithEnteringAnswers, studentID, examID);
        isExamCompleted ?
          generateFinalResult(questionIDsWithEnteringAnswers,studentID, examID,res)
        :
        res.status(200).json({ message: "Saved" });
      }
    }
  );
};
const insertIntoStudentExam = (
  studentID,
  examID,
  questionIDsWithEnteringAnswers
) => {
  db.query(
    `INSERT INTO student_exam (student_id , exam_id , points, grade,isPass,isExamComplete)
    VALUES (${studentID}, ${examID} , '0' , 'Pending','0','0')`,
    (err, result) => {
      !err
        ? saveAnswers(questionIDsWithEnteringAnswers, studentID, examID)
        : console.log(err);
    }
  );
};
const saveAnswers = (questionIDsWithEnteringAnswers, studentID, examID) => {
  questionIDsWithEnteringAnswers.map((qa) => {
    db.query(
      `SELECT * FROM student_answer WHERE student_id=${studentID} AND exam_id=${examID} AND question_id =${qa.questionId}`,
      (err, result) => {
        if(err){
          console.log(err);
        }
        else if (result.length === 0) {
          db.query(
            `INSERT INTO student_answer (answer, student_id, exam_id, question_id) 
      VALUES (${qa.enteringAnswer}, ${studentID},  ${examID}, ${qa.questionId})`,
            (err, result) => {
              if (err) {
                console.log(err);
              }
            }
          );
        } else {
          let student_answerid = result[0].student_ansid;
          db.query(
            `UPDATE student_answer SET answer = ${qa.enteringAnswer} WHERE student_ansid = ${student_answerid}`,
            (err, result) => {
              if (err) {
                console.log(err);
              }
            }
          );
        }
      }
    );
  });

};

const generateFinalResult =(questionIDsWithEnteringAnswers,studentID, examID, res)=>{
  let answeredQuestions = []
  let studentCorrectAnswersCount = 0
  let value ;

  questionIDsWithEnteringAnswers.map((qa)=>{
    db.query(`SELECT question, correct_answer FROM question WHERE question_id= ${qa.questionId}`, (err, result)=>{
      if(!err){

        if(result[0].correct_answer == qa.enteringAnswer){
          studentCorrectAnswersCount+= 1
          value = "Correct"
        }else{
          value = "InCorrect"
        }
        answeredQuestions.push({
          questionText: result[0].question, 
          isCorrect: value
        })
      }else{
        console.log(err);
      }
    })
  })

  setTimeout(()=>{

    let points =  ~~((studentCorrectAnswersCount *100)/ answeredQuestions.length)
    let isPass;
    let grade='';

    switch (true) {
      case (75 <= points):
        grade = 'A'
        isPass='Passed'
        break;
      case 65 <= points:
        grade='B'
        isPass='Passed'
      break;
      case 50 <= points:
        grade='C'
        isPass='Passed'
        break;
      case 40 <= points:
        grade='S'
        isPass='Passed'
        break;
      case 39 >= points:
        grade='F'
        isPass='Failed'
        break;    
    }
    db.query(`UPDATE student_exam SET points = ${points}, grade='${grade}',isPass = ${isPass === 'Passed'?true: false},
    isExamComplete=${true}
    WHERE student_id = ${studentID} AND exam_id = ${examID}`,(err, result)=>{
      !err ?
      
  res.status(200).json({ answeredQuestions: answeredQuestions,points: points,grade:grade,isPass:isPass })
  : console.log(err)
    })
  },500)

}

// @Desc    Exam compeleted student's result show
// @Method  GET
// @Route   /exam/student/get-student-exam-result/
const getStudentResult = (req, res)=>{
  console.log('got request');
  const {studentid, examid} = req.query

  let points
  let grade
  let isPass
  let value
  let answeredQuestionList = []

  db.query(`SELECT points, grade, isPass FROM student_exam WHERE student_id=${studentid} AND exam_id=${examid}`,
  (err , result)=>{
    if(!err){
        points= result[0].points;
        grade= result[0].grade;
        isPass= result[0].isPass == 1 ? "Passed" : "Failed"
    }else{
      console.log(err);
    }
  })

  db.query(`SELECT  question_id , answer FROM student_answer WHERE student_id=${studentid} AND exam_id=${examid}`,
  (err, enteredAnswers)=>{
    if(!err){
      enteredAnswers.map(qu=>{
        db.query(`SELECT question, correct_answer FROM question WHERE question_id=${qu.question_id}`
        ,(errr,result)=>{
          if(!errr){
            if(result[0].correct_answer == qu.answer){
              value= 'Correct'
            }else{
              value= 'InCorrect'
            }
            answeredQuestionList.push({
              questionText:result[0].question,
              isCorrect: value
            })
          }else{
            console.log(errr);
          }
        })
      })
    }else{
      console.log(err);
    }
  })
  setTimeout(() => {
    res.status(200).json({ answeredQuestions: answeredQuestionList,points: points,grade:grade,isPass:isPass })
  }, 1000);

  res.status(200)

}
module.exports = {
  getStudentResult,
  questionsAnswers,
  searchExam,
  studentViewExams,
  studentExamSave,
};
