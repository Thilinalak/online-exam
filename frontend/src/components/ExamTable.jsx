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
                      <td>1. {data.answers[0].answer} 2. {data.answers[1].answer} 3. {data.answers[2].answer} 4. {data.answers[3].answer} </td>
                    </tr>
                    )
                  })}
                </tbody>
              </Table>
             
    </div>
    
  )
}



