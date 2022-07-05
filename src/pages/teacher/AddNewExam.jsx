import { Row, Col, Form, Button, Card } from "react-bootstrap";
import { useState } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  TimePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import ExamTable from "../../components/ExamTable";
import { useNavigate } from "react-router-dom";

export const AddNewExam = () => {
  const navigate = useNavigate();

  const initials = {};

  const [selectedDate, handleDateChange] = useState(new Date());
  const [formData, setFormData] = useState({
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
  });

  const [tableData, setTableData] = useState([]);

  const { examname, question, answer1, answer2, answer3, answer4 } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newData = (data) => [...data, formData];
    setTableData(newData);
    const clearTextFields = {
      examname: "",
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
    };
    setFormData(clearTextFields);
  };

 

  return (
    <>
      <section className="p-5">
        <Row>
          <Col xs={12} md={8}>
            <div className="pt-5">
              <h3 className="pb-3">Exam Name</h3>
              <h5>Question List</h5>
              <ExamTable tableData={tableData} />
            </div>
          </Col>
          <Col md={4} className="pt-5">
            <Card border="success" className="p-3">
              <Form onSubmit={onSubmit} className="">
                <Form.Group className="p-3">
                  <Form.Label>Exam Name </Form.Label>
                  <Form.Control
                    type="text"
                    id="examname"
                    placeholder="Enter Exam Name"
                    name="examname"
                    onChange={onChange}
                    value={formData.examname}
                    required="required"
                  />
                </Form.Group>
                <Form.Group className="p-3">
                  <Form.Label>Question</Form.Label>
                  <Form.Control
                    type="text"
                    id="question"
                    name="question"
                    placeholder="Enter Question"
                    onChange={onChange}
                    value={question}
                    required="required"
                  />
                </Form.Group>
                <Form.Group className="p-3">
                  <Form.Label>Answers List</Form.Label>
                    <Row className="pt-1">
                      <Col className="m-auto" xs={1}>
                        <Form.Check type="radio"  id="radio1" name="radio1" />
                      </Col>
                      <Col>
                        <Form.Control
                          id="answer1"
                          name="answer1"
                          type="text"
                          placeholder="Answer 1"
                          onChange={onChange}
                          value={answer1}
                          required="required"
                        />
                      </Col>
                    </Row>
                    <Row className="pt-2">
                      <Col className="m-auto" xs={1}>
                        <Form.Check type="radio"  id="radio2" name="radio1" />
                      </Col>
                      <Col>
                        <Form.Control
                          id="answer2"
                          name="answer2"
                          type="text"
                          placeholder="Answer 2"
                          onChange={onChange}
                          value={answer2}
                          required="required"
                        />
                      </Col>
                    </Row>
                    <Row className="pt-2">
                      <Col className="m-auto" xs={1}>
                        <Form.Check type="radio" id="radio3" name="radio1" />
                      </Col>
                      <Col>
                        <Form.Control
                          id="answer3"
                          name="answer3"
                          type="text"
                          placeholder="Answer 3"
                          onChange={onChange}
                          value={answer3}
                          required="required"
                        />
                      </Col>
                    </Row>
                    <Row className="pt-2">
                      <Col className="m-auto" xs={1}>
                        <Form.Check type="radio" id="radio4" name="radio1" />
                      </Col>
                      <Col>
                        <Form.Control
                          id="answer4"
                          name="answer4"
                          type="text"
                          placeholder="Answer 4"
                          onChange={onChange}
                          value={answer4}
                          required="required"
                        />
                      </Col>
                    </Row>
                </Form.Group>
                

                <Form.Group className="p-3">
                  <Button type="submit">Add Question</Button>
                </Form.Group>
              </Form>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="p-4">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  ampm={true}
                  label="Exam Date and Time"
                  inputVariant="filled"
                  value={selectedDate}
                  onChange={handleDateChange}
                  onError={console.log}
                  disablePast
                  showTodayButton
                  format="yyyy/MM/dd HH:mm"
                />{" "}
                <TimePicker
                  autoOk={false}
                  inputVariant="filled"
                  label="Exam Duration"
                  ampm={false}
                  value={selectedDate}
                  onChange={handleDateChange}
                  openTo="hours"
                />
              </MuiPickersUtilsProvider>
              <Button variant="success" className="m-3">
                Save
              </Button>
              <Button variant="danger" className="">
                Publish Paper
              </Button>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};
