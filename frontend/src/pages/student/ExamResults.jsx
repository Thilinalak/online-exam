import { Button, Card, Container, Row, Col } from "react-bootstrap";

export const ExamResults = () => {
  return (
    <>
      <Container className="d-flex justify-content-center">
        <div className="">
        <Row xs={1} md={2} className="pt-5">
          <Col className="pt-4">
            <Card border="success" style={{ width: "33rem", height: "11rem" }}>
              <Card.Header>
                <h6>Exam Completed</h6>
              </Card.Header>
              <Card.Body className="m-auto">
                <Card.Text>
                  <h1 className="text-success">Passed</h1>
                </Card.Text>
                <Card.Text>
                  <h4>A - 90 points</h4>
                </Card.Text>
              </Card.Body>
            </Card>
            <div className="pt-4">
            <Card
              border="success"
              style={{ width: "33rem", height: "auto" }}>
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
                        Correct
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </div>
              <div className="p-3">
                <Card border="dark" style={{ width: "30.9rem" }}>
                  <Row>
                    <Col sm={8}>
                      <Card.Body>Thilina Lakshan</Card.Body>
                    </Col>
                    <Col sm={4}>
                      <Card.Body className="text-end fw-bold text-success">
                        Correct
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </div>
            </Card>
            </div>
          </Col>
         
        </Row>

        <Row>
          <Col className="pt-4 " style={{}}>
            <div className="float-start">
              <Button cls variant="info">
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
