const express = require('express')
const router = express.Router()
const { questionsAnswers, studentViewExams, searchExam, studentExamSave} = require('../controllers/studentExamController')

// Student Routes
router.get('/student-view-exams', studentViewExams)
router.post('/student-save-exam', studentExamSave)
router.get('/questions-answers/:id', questionsAnswers)


module.exports = router