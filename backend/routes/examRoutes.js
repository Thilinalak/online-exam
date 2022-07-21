const express = require('express')
const router = express.Router()
const {addNewExam, teacherViewExams,questionsAnswers, studentViewExams, searchExam, pubishExam} = require('../controllers/examController')

router.post('/add-new-exam',addNewExam).post('/search-exam', searchExam)
router.get('/teacher-view-exams', teacherViewExams).get('/student-view-exams', studentViewExams)
router.get('/questions-answers/:id', questionsAnswers)
router.put('/publish-exam',pubishExam)


module.exports = router