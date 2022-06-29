import { Button, Row, Col, Form, Card, Container } from "react-bootstrap";

const styles = {
  btnpadding: {
    paddingRight: 60,
    paddingLeft: 60,
  },
  center: {
    width: "50rem",
    height: "22rem",
    paddingTop: 90,
  },
  
};

export const SingleExam = () => {
  return (
    <Container style={styles.center}>
      <div className="text-center">
        <h3>Time Left : 45 min</h3>
      </div>
      <div>
        <h5 className="pt-5">Q. What is React JS ?</h5>
        <Card   border="success"  className="p-4">
          <Card.Text>
            <Form.Check type="radio" label="Answer 1" name="group1" id="a1" />
            <Form.Check
              className="pt-2"
              type="radio"
              label="Answer 2"
              name="group1"
              id="a2"
            />
            <Form.Check
              className="pt-2"
              type="radio"
              label="Answer 13"
              name="group1"
              id="a3"
            />
            <Form.Check
              className="pt-2"
              type="radio"
              label="Answer 16"
              name="group1"
              id="a4"
            />
          </Card.Text>
        </Card>
      </div>
      <div className="pt-4">
        <Row>
          <Col>
            <Button style={styles.btnpadding} variant="secondary">
              Prev
            </Button>
          </Col>
          <Col className="text-center fw-bold">Question 1</Col>
          <Col>
            <div className="float-end">
              <Button style={styles.btnpadding} variant="secondary">
                Next
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      <div className="float-end pt-5">
        <Row>
          <Col>
              <Button variant="success">Save</Button>{' '}
              <Button variant="info">Complete</Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
