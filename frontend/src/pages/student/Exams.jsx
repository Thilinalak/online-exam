import { Row, Col, Container, Form, Button, Table } from "react-bootstrap";
import { Header } from "../../components/Header"
import { useEffect , useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Exams = () => {

  const [examData, setExamData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/exam/student-view-exams")
    .then((res) => {
      setExamData(res.data);
    });
  }, []);

  const navigate = useNavigate()
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
                  <tr key={index} onClick={() => {
                    navigate('/student-single-exam',{state:{
                      examid: exam.idexam,
                      examname: exam.exam_name,
                      exduration: exam.duration
                    }})
                  }}>
                      <td>{exam.idexam}</td>
                      <td>{exam.exam_name}</td>
                      <td>{exam.datetime}</td>
                      <td>{exam.duration}</td>
                      <td>
                        {exam.isAttended === 0 ? (
                          <div>Pending</div>
                        ) : (
                          <div>Attened</div>
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
