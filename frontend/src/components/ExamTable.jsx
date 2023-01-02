import { useState } from 'react'
import {Table} from 'react-bootstrap'
import  {AddNewExam}  from '../pages/teacher/AddNewExam'

export default function ExamTable({tableData}) {

  console.log('tableData',tableData);

  const [initialValues , setInitialValues] = useState({
    question_id: "12",
    question: "dddd",
    correctAnswer: "",
    answers: [{
      idanswer: "22",
      answer: 'ddd',
    }, {
      idanswer: "",
      answer: '',
    }, 
    {
      idanswer: "",
      answer: '',
    }, {
      idanswer: "",
      answer: '',
    }],
  })

  const onRawClick = (data)=>{

    console.log('press' ,data)
  }
  return (
    <div>
        <Table striped bordered hover>
                <thead>
                  <tr className="table-primary">
                    <th>Questions</th>
                    <th>Answers</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((data,index) => {
                    return(
                      <tr onClick={()=>onRawClick(data)} key={index}>
                      <td>{data.question}</td>
                      <td>1. {data.answers[0].answer} 2. {data.answers[1].answer} 3. {data.answers[2].answer} 4. {data.answers[3].answer} </td>
                    </tr>
                    )
                  })}
                </tbody>
              </Table>
             
    </div>
    
  )
}



