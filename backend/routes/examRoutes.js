const express = require('express')
const router = express.Router()
const {addNewExam, teacherViewExams} = require('../controllers/examController')

router.post('/add-new-exam',addNewExam)
router.get('/teacher-view-exams', teacherViewExams)


module.exports = router