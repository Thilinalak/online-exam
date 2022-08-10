const express = require('express')
const router = express.Router()
const { addNewExam, teacherViewExams,questionsAnswers,searchExam, pubishExam, } = require('../controllers/teacherExamController')

// Teacher Rouutes
router.post('/add-new-exam',addNewExam).post('/search-exam', searchExam)
router.get('/teacher-view-exams', teacherViewExams)
router.put('/publish-exam/:id',pubishExam)
router.get('/questions-answers/:id', questionsAnswers)


module.exports = router