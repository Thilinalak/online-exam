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
  db.query(
    `SELECT idexam, exam_name, datetime , duration , isAttended FROM exam WHERE student_status = ${true} AND isPublished = ${true}`,
    (err, result) => {
      !err ? res.send(result) : console.log(err);
    }
  );
};

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


// Student Exam Save
// @Route POST exam/student-save-exam
const studentExamSave = (req, res) => {
  const { examID , questions , currentUserID} = req.body
  console.log('got request', questions, examID, currentUserID);
    // res.status(200).send('Got request' );'
    
  let questionIDsandCorrectAnswers = []
    questions.map(q =>{
      if(q.correctAnswer){
        let qansC = {questionId: q.questionId,correctAnswer: q.correctAnswer}
        questionIDsandCorrectAnswers.push(qansC)
      }
    })

    questionIDsandCorrectAnswers.map(qa => {
      db.query(`INSERT INTO student_answer (answer, student_id, exam_id, question_id) 
      VALUES (${qa.correctAnswer}, ${currentUserID},  ${examID}, ${qa.questionId})`)
    })

}

module.exports = {
  questionsAnswers,
  searchExam,
  studentViewExams,
  studentExamSave
};


