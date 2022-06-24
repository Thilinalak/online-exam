import {
  Row,
  Col,
  Form,
  Button,
  Table,
  Card,
} from "react-bootstrap";

export const AddNewExam = () => {
  return (
    <>
      <section className="p-5">
        <Row>
          <Col xs={12} md={8}>
            <div className="pt-5 p-4">
              <Table striped bordered hover>
                <thead>
                  <tr className="table-primary">
                    <th>Questions</th>
                    <th>Answers</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>IT</td>
                    <td>fgfggfg</td>
                  </tr>
                  <tr>
                    <td>Maths</td>
                    <td>dfgdfgfdgfg</td>
                  </tr>
                </tbody>
              </Table>
            </div>

            <div>
            </div>
          </Col>
          <Col xs={6} md={4}>
            <Card className="p-3">
              <Form className="p-1">
                <Form.Group className="p-3">
                  <Form.Label>Question</Form.Label>
                  <Form.Control
                    type="text"
                    id="question"
                    name="question"
                    placeholder="Enter Question"
                  />
                </Form.Group>
                <Form.Group className="p-3">
                  <Form.Label>Answers List</Form.Label>
                  <Form.Control
                    id="q1"
                    name="q1"
                    type="text"
                    placeholder="Answer"
                  />
                </Form.Group>
                <Form.Group className="pt-0 p-3">
                  <Form.Control
                    id="q2"
                    name="q2"
                    type="text"
                    placeholder="Answer"
                  />
                </Form.Group>
                <Form.Group className="pt-0 p-3">
                  <Form.Control
                    id="q3"
                    name="q3"
                    type="text"
                    placeholder="Answer"
                  />
                </Form.Group>
                <Form.Group className="pt-0 p-3">
                  <Form.Control
                    id="q4"
                    name="q4"
                    type="text"
                    placeholder="Answer"
                  />
                </Form.Group>
                <Form.Group className="p-3">
                  <Button>Add Question</Button>
                </Form.Group>
              </Form>
            </Card>
          </Col>
        </Row>
      </section>
    </>
  );
};
