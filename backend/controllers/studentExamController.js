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
  const {examID, studentID} = req.query
//   console.log(studentID);

  
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

// Student Exam Save
// @Route POST exam/student-save-exam
const studentExamSave = (req, res) => {
  const { examID, questions, studentID } = req.body;
  let questionIDsandCorrectAnswers = [];

  questions.map((q) => {
    if (q.correctAnswer) {
      let qansC = { questionId: q.questionId, correctAnswer: q.correctAnswer };
      questionIDsandCorrectAnswers.push(qansC);
    }
  });

  db.query(
    `SELECT * FROM student_exam WHERE student_id=${studentID} AND exam_id= ${examID} `,
    (err, result) => {
      if(err){
        console.log(err);
      }
      else if (result.length === 0) {
        insertIntoStudentExam(studentID, examID, questionIDsandCorrectAnswers);
        res.status(200).json({ message: "Saved" });
      } else {
        saveAnswers(questionIDsandCorrectAnswers, studentID, examID);
        res.status(200).json({ message: "Saved" });
      }
    }
  );
};

const insertIntoStudentExam = (
  studentID,
  examID,
  questionIDsandCorrectAnswers
) => {
  db.query(
    `INSERT INTO student_exam (student_id , exam_id , points, grade,isPass)
    VALUES (${studentID}, ${examID} , '0' , 'Pending','0')`,
    (err, result) => {
      !err
        ? saveAnswers(questionIDsandCorrectAnswers, studentID, examID)
        : console.log(err);
    }
  );
};
const saveAnswers = (questionIDsandCorrectAnswers, studentID, examID) => {
  questionIDsandCorrectAnswers.map((qa) => {
    db.query(
      `SELECT * FROM student_answer WHERE question_id =${qa.questionId}`,
      (err, result) => {
        if(err){
          console.log(err);
        }
        else if (result.length === 0) {
          db.query(
            `INSERT INTO student_answer (answer, student_id, exam_id, question_id) 
      VALUES (${qa.correctAnswer}, ${studentID},  ${examID}, ${qa.questionId})`,
            (err, result) => {
              if (err) {
                console.log(err);
              }
            }
          );
        } else {
          let student_answerid = result[0].student_ansid;
          db.query(
            `UPDATE student_answer SET answer = ${qa.correctAnswer} WHERE student_ansid = ${student_answerid}`,
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
module.exports = {
  questionsAnswers,
  searchExam,
  studentViewExams,
  studentExamSave,
};
