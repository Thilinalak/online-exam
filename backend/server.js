const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/exam', require('./routes/teacherExamRoutes'))
app.use('/exam', require('./routes/studentExamRoutes'))


app.listen(port, () => console.log(`Server is running on port ${port}...`))
