import { useEffect } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header"


export const ExamResults = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const userr = JSON.parse(localStorage.getItem("user"));
    userr ? console.log() : navigate('/')
  }, [navigate]);

  const { answeredQuestions, isPass, grade, points } =
    location.state.studentData;


    const onPress = ()=>navigate('/student-exams')
  return (
    <>
    <Header/>

      <Container className="d-flex justify-content-center">
        <div className="">
          <Row xs={1} md={2} className="pt-5">
            <Col className="pt-4">
              <Card
                border="success"
                style={{ width: "33rem", height: "11rem" }}
              >
                <Card.Header>
                  <h6>Exam Completed</h6>
                </Card.Header>
                <Card.Body className="m-auto">
                  <Card.Text>
                    {isPass === 'Passed' ? (
                      <h1 className="text-success">{isPass}</h1>
                    ):(
                      <h1 className="text-danger">{isPass}</h1>
                    )}
                  </Card.Text>
                  <Card.Text>
                    <h4>
                      {grade} - {points} points
                    </h4>
                  </Card.Text>
                </Card.Body>
              </Card>
              <div className="pt-4">
                <Card
                  border="success"
                  style={{ width: "33rem", height: "auto" }}
                >
                  <Card.Header>
                    <h6>Your Answered List</h6>
                  </Card.Header>

                  {answeredQuestions.map((cq, index) => (
                    <div className="p-3" key={index}>
                      <Card border="dark" style={{ width: "30.9rem" }}>
                        <Row >
                          <Col sm={8}>
                            <Card.Body>{cq.questionText}</Card.Body>
                          </Col>
                          <Col sm={4}>
                            {cq.isCorrect === "Correct" ? (
                              <Card.Body className="text-end fw-bold text-success">
                                {cq.isCorrect}
                              </Card.Body>
                            ) : (
                              <Card.Body className="text-end fw-bold text-danger">
                                {cq.isCorrect}
                              </Card.Body>
                            )}
                          </Col>
                        </Row>
                      </Card>
                    </div>
                  ))}
                </Card>
              </div>
            </Col>
          </Row>

          <Row>
            <Col className="pt-4 " style={{}}>
              <div className="float-start">
                <Button cls variant="info" onClick={onPress}>
                  Close
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};
