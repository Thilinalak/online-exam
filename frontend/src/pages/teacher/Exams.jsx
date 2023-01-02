import { Row, Col, Container, Form, Button, Table } from "react-bootstrap";
import { useNavigate, useRoutes } from "react-router-dom";
import { Header } from "../../components/Header";
import { useState, useEffect } from "react";
import axios from "axios";

export const Exams = () => {
  const [examData, setExamData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const userr = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    userr ? console.log() : navigate('/')
    axios.get(`http://localhost:5000/exam/teacher-view-exams/${userr.user[0].idteacher}`).then((res) => {
      setExamData(res.data);
    });
  }, []);

  const onSearch = () =>{
    console.log('btn pressed');
    axios.post("http://localhost:5000/exam/search-exam",{searchText: searchText})
    .then((response) =>{
      console.log(response.data);
    })
  }

  // const route = useRoutes()
  return (
    <>
      <Header />
      <Container style={{ paddingTop: 100 }}>
        <Row>
          <Col sm={8}>
            <Form >
              <Row className="align-items-center">
                <Col xs="auto">
                  <Form.Control className="mb-2" id="searchText" name="searchText" onChange={(e) => setSearchText(e.target.value)} value={searchText} />
                </Col>
                <Col xs="auto">
                  <Button onSubmit={onSearch} type="submit" className="mb-2">
                    Search
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col sm={4}>
            <div className="float-end">
              <Button
                onClick={() => navigate("/add-new-exam")}
                variant="success"
              >
                New Exam
              </Button>
            </div>
          </Col>
        </Row>

        <div className="pt-5">
          <Table striped bordered hover>
            <thead>
              <tr className="table-primary">
                <th>Exam ID</th>
                <th>Exam Name</th>
                <th>Exam Date Time</th>
                <th>Last Updated</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {examData.length > 0 ? (
                examData.map((exam, index) => {
                  return (
                  <tr key={index} onClick={() => {
                    {console.log(exam)}
                    exam.isPublished === 0 ? navigate('/add-new-exam',{state:{
                      examid: exam.idexam,
                      examname: exam.exam_name,
                      datetime: exam.datetime,
                      exduration: exam.duration
                    }}) : navigate("/Monitor-Started-Exam",{state:{examinfo : exam}})
                  }}>
                      <td>{exam.idexam}</td>
                      <td>{exam.exam_name}</td>
                      <td>{exam.datetime}</td>
                      <td>{exam.last_updated}</td>
                      <td>
                        {exam.isPublished !== 1 ? (
                          <div>Draft</div>
                        ) : (
                          <div>Published</div>
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
