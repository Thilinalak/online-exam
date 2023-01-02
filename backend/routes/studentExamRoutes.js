const express = require('express')
const router = express.Router()
const { getStudentResult, questionsAnswers, studentViewExams, searchExam, studentExamSave} = require('../controllers/studentExamController')

// Student Routes
router.get('/view-exams/:studentid', studentViewExams)
router.post('/save-exam', studentExamSave)
router.get('/questions-answers/', questionsAnswers)
router.get('/get-student-exam-result/', getStudentResult)


module.exports = router