const express = require('express')
const router = express.Router()
const { questionsAnswers, studentViewExams, searchExam, studentExamSave} = require('../controllers/studentExamController')

// Student Routes
router.get('/view-exams', studentViewExams)
router.post('/save-exam', studentExamSave)
router.get('/questions-answers/', questionsAnswers)


module.exports = router