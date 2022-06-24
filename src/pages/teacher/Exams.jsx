import { Row, Col, Container, Form, Button, Table } from "react-bootstrap";

export const Exams = () => {
  return (
    <>
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
          <Col sm={4}>
            <div>
            <Button  variant="success">
              New Exam
            </Button>
            </div>
            
          </Col>
        </Row>

        <div className="pt-5">
          <Table striped bordered hover>
            <thead>
              <tr className="table-primary">
                <th>Exam</th>
                <th>Last Updated</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>IT</td>
                <td>2022-06-22 10.00pm</td>
                <td>Draft</td>
              </tr>
              <tr>
                <td>Maths</td>
                <td>2022-06-21 11.00pm</td>
                <td>Pending</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};
