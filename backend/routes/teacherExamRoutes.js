const express = require('express')
const router = express.Router()
const { addNewExam, teacherViewExams,questionsAnswers,searchExam, publishExam,monitorStartedExam,endExam, } = require('../controllers/teacherExamController')

// Teacher Routes
router.post('/add-new-exam',addNewExam).post('/search-exam', searchExam)
router.get('/teacher-view-exams/:id', teacherViewExams)
router.put('/exam-publish/:id',publishExam)
router.get('/questions-answers/:id', questionsAnswers)
router.get('/monitor-started-exam/', monitorStartedExam)
router.put('/end-exam/:id',endExam)


module.exports = router