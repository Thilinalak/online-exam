import {Table} from 'react-bootstrap'

export default function ExamTable({tableData}) {
  console.log(tableData)
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
                      <tr key={index}>
                      <td>{data.question}</td>
                      <td>{data.answer1} | {data.answer2} | {data.answer3} | {data.answer4} </td>
                    </tr>
                    )
                  })}
                  
                  <tr>
                    <td>Maths</td>
                    <td>answer, answeranswer</td>
                  </tr>
                </tbody>
              </Table>
    </div>
  )
}



