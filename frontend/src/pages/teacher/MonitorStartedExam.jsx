import { Button, Card, Container, Row, Col } from "react-bootstrap";

export const MonitorStartedExam = () => {
  return (
    <>
      <Container className="p-4">
        <Row xs={1} md={2} className="pt-5">
          <Col className="pt-4">
            <Card border="success" style={{ width: "33rem", height: "11rem" }}>
              <Card.Header>
                <h6>Exam Completed</h6>
              </Card.Header>
              <Card.Body className="m-auto">
                <Card.Text>
                  <h1>10 / 20</h1>
                </Card.Text>
                <Card.Text>
                  <h4>Time Left : 21 min</h4>
                </Card.Text>
              </Card.Body>
            </Card>
            <div className="pt-4">
              <Card
                border="success"
                style={{ width: "33rem", height: "11rem" }}
              >
                <Card.Body className="pt-4">
                  <Card.Title>Exam Started Time :</Card.Title>
                  <Card.Title>Exam Ending Time :</Card.Title>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col className="pt-4">
            <Card
              border="success"
              style={{ width: "33rem", height: "23.5rem" }}>
              <Card.Header>
                <h6>Attending Stuednt List</h6>
              </Card.Header>
              {/* loop */}
              <div className="p-3">
                <Card border="dark" style={{ width: "30.9rem" }}>
                  <Row>
                    <Col sm={8}>
                      <Card.Body>Thilina Lakshan</Card.Body>
                    </Col>
                    <Col sm={4}>
                      <Card.Body className="text-end fw-bold text-success">
                        Completed
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </div>
            </Card>
          </Col>
        </Row>
        <div className="float-end pt-4">
        <Row>
          <Col>
              <Button variant="danger">End Exam</Button>
          </Col>
        </Row>
      </div>
      </Container>
    </>
  );
};
