import { Row, Col, Container, Form, Button, Table } from "react-bootstrap";

export const Exams = () => {
  const examData = [
    {
      id: 1,
      exmname: "IT",
      lastUpdate: "2022-06-22 10.00am",
      status: "Draft",
    },
    {
      id: 2,
      exmname: "maths",
      lastUpdate: "2022-06-23 10.00am",
      status: "Pending",
    },
    {
      id: 3,
      exmname: "English",
      lastUpdate: "2022-06-24 10.00am",
      status: "Pending",
    },
    {
      id: 4,
      exmname: "Bio",
      lastUpdate: "2022-06-24 2.00pm",
      status: "Draft",
    },
  ];

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
              <Button variant="success">New Exam</Button>
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
              {examData.map((exam) => {
                return (
                  <tr key={exam.id}>
                    <td>{exam.exmname}</td>
                    <td>{exam.lastUpdate}</td>
                    <td>{exam.status}</td>
                  </tr>
                );
              })}
             
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};
