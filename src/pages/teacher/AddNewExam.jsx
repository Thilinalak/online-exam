import { Row, Col, Form, Button, Table, Card } from "react-bootstrap";
import { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  TimePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

export const AddNewExam = () => {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <>
      <section className="p-5">
        <Row>
          <Col xs={12} md={8}>
            <div className="pt-5 p-4">
              <h5>Question List</h5>
              <Table striped bordered hover>
                <thead>
                  <tr className="table-primary">
                    <th>Questions</th>
                    <th>Answers</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>asdjf iahsf ia sfdoia ioajsd o oiasd ohj oiashd oashj oiahdsoias oihj  oaisdad  oijhad ad</td>
                    <td>answer, answeranswer, answeranswer, answeranswer, answeranswer, answer</td>
                  </tr>
                  <tr>
                    <td>Maths</td>
                    <td>answer, answeranswer</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="p-4" style={{ position: "absolute", bottom: 0 }}>
              <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                <KeyboardDateTimePicker 
                  ampm={false}
                  label="Exam Date and Time"
                  inputVariant="filled"
                  value={selectedDate}
                  onChange={handleDateChange}
                  onError={console.log}
                  disablePast
                  showTodayButton
                  format="yyyy/MM/dd HH:MM"
                />
                <TimePicker
                  inputVariant="filled"
                  label="Exam Duration"
                  ampm={true}
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
              <Button variant="success" className="m-3">
                Save
              </Button>
              <Button variant="danger" className="">
                Publish Paper
              </Button>
            </div>

            <div></div>
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
