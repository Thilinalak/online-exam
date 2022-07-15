const dbConfig = require("../config/dbConfig");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

//add new exam
//@Route /exam/add-new-exam
const addNewExam = (req, res) => {
  const lastUpdatedDateTime = new Date().toLocaleString();

  const { examName, selectedDateTime, duration, id, tableData } = req.body;

  db.query(
    "SELECT idteacher FROM teacher WHERE user_credentials_id = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        let examData = {
          exam_name: examName,
          last_updated: lastUpdatedDateTime,
          status: true,
          datetime: selectedDateTime,
          duration: duration,
          student_status: false,
          isEnd: false,
          teacher_idteacher: result[0].idteacher,
        };

        db.query("INSERT INTO exam SET ?", examData, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            saveQuestions(result.insertId, tableData);
            res.status(200);
          }
        });
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
        if (err) {
          console.log(err);
        } else {
          saveAnswers(result.insertId, quesdata.answers);
        }
      }
    );
  });
};

const saveAnswers = (questionID, answers) => {
  answers.map((answerData) => {
    db.query(
      "INSERT INTO answers (answer, question_id) VALUES (?,?)",
      [answerData, questionID],
      (err, result) => {
        if (err) {
          console.log(err);
        } 
      }
    );
  });
};

// Teacher View Exams
//@Route /exam/teacher-view-exam
const teacherViewExams = (req, res) =>{

  db.query('SELECT * FROM exam WHERE teacher_idteacher = ?', )
}


module.exports = {
  addNewExam,
  teacherViewExams
};
