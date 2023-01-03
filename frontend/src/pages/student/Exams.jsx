import { Row, Col, Container, Form, Button, Table } from "react-bootstrap";
import { Header } from "../../components/Header"
import { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


export const Exams = () => {

  const [examData, setExamData] = useState([]);

  const userr = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    userr ? console.log() : navigate('/')
    axios.get(`http://localhost:5000/exam/student/view-exams/${userr.user[0].idstudent}`)
    .then((res) => {
      console.log('resp', res.data );
      setExamData(res.data);
    });
  }, []);

  const navigate = useNavigate()

  const onRowClick = (exam) => {
    let currentTime = new Date().getTime();
    let time = new Date(exam.datetime);
        
        
  
        let duration = exam.duration.toString();
        time.setHours(time.getHours() + parseInt(duration[0]));
  
        if (parseInt(duration.substring(5, 7))) {
          time.setMinutes(time.getMinutes() + parseInt(duration.substring(5, 7)));
        }
    if(exam.isAttended === 0 ){
      if(currentTime > new Date(exam.datetime).getTime()  &&
      currentTime < time.getTime()){
        navigate('/student-single-exam',{state:{
          examid: exam.idexam,
          examname: exam.exam_name,
          exduration: exam.duration,
          exdatetime: exam.datetime,
        }})
      }else{
        toast.error("Please wait for untill the Exam Start Time")
      }
    
  }else{ 
    axios.get(`http://localhost:5000/exam/student/get-student-exam-result/?studentid=${userr.user[0].idstudent}&examid=${exam.idexam}`)
    .then(resp=>{
      resp.status === 200 ? 
      navigate('/student-exam-result',{state:{studentData:resp.data}}) 
      : console.log('bad response');
    })  
  }
  }
  return (
    <>
    <Header/>
      <Container style={{ paddingTop: 100 }}>
        <Row>
          <Col sm={8}>
            <Form>
              <Row className="align-items-center">
                <Col xs="auto">
                  <Form.Control className="mb-2" id="searchText" />
                </Col>
                <Col xs="auto">
                  <Button type="submit" className="mb-2">
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>

        <div className="pt-5">
          <Table striped bordered hover>
            <thead>
              <tr className="table-primary">
                <th>Exam ID</th>
                <th>Exam</th>
                <th>Starting Time</th>
                <th>Exam Duration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {examData.length > 0 ? (
                examData.map((exam, index) => {
                  return (
                  <tr key={index} onClick={()=> onRowClick(exam)}>
                      <td>{exam.idexam}</td>
                      <td>{exam.exam_name}</td>
                      <td>{exam.datetime}</td>
                      <td>{exam.duration}</td>
                      <td>
                        {exam.isAttended == 0 ? (
                          <div>Pending</div>
                        ) : (
                          <div>Attended</div>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div>No Exams Available</div>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};
