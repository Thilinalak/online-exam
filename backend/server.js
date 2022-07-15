const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/api/users', require('./routes/userRoutes'))
app.use('/exam', require('./routes/examRoutes'))


// app.post('/api/users', (req, res) => {
//     const username = req.body.username
//     const password = req.body.password

//     db.query('SELECT * FROM user_credentials WHERE email = ? AND password = ?',[username, password],
//     (err, result) => {
//         if (err){
//             console.log(err);
//             res.send(err)
//         }
//         if(result.length > 0){
//             res.status(200).send(result)
//         }else{
//             res.send({message: "Invalid User Credentials"})
//         }
//     }
//     )
// })

app.listen(5000, () => console.log('Server is running on port 5000...'))
