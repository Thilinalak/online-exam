import { Row, Form, Col, Button, Card, } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import ExamTable from "../../components/ExamTable";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "../../components/Header";
import { Formik, Form as FormikForm, Field } from "formik";
import axios from "axios";
import { toast } from "react-toastify";

export const AddNewExam = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [correctedDateTime, setCorrectedDateTime] = useState();
  const [duration, setDuration] = useState(["s","sd","asd"]);
  const [examName, setExamName] = useState("");
  const [examID, setExamID] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const [tableData, setTableData] = useState([]);
  const [initialValues, setInitialValues] = useState({
    question_id: "",
    question: "",
    correctAnswer: "",
    answers: [
      {
        idanswer: "",
        answer: "",
      },
      {
        idanswer: "",
        answer: "",
      },
      {
        idanswer: "",
        answer: "",
      },
      {
        idanswer: "",
        answer: "",
      },
    ],
  });

  const userr = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    userr ? console.log() : navigate("/");
    const exmID = location?.state?.examid;
    console.log('examIddd ', exmID);
    setExamID(exmID);
    setExamName(location?.state?.examname);
    setSelectedDate(location?.state?.datetime);
    setDuration(location?.state?.duration);
    setCurrentUser(userr);

    if (exmID) {
      axios
        .get(`http://localhost:5000/exam/questions-answers/${exmID}`)
        .then((res) => {
          console.log("QA RES", res.data);
          setTableData(res.data)

        });
    }
  }, []);


  const handleDateChange = (date) => {
    setSelectedDate(date);

    let tempDate = new Date(date).toLocaleString();
    setCorrectedDateTime(tempDate);
  };

  const onSave = (e) => {
    e.preventDefault();

    const id = currentUser.user[0].user_credentials_id;

    const alldata = {
      examName,
      selectedDateTime: correctedDateTime,
      duration,
      id: id,
      tableData,
    };
    axios
      .post("http://localhost:5000/exam/add-new-exam", alldata)
      .then((res) => {
        console.log(res);
        if (res.data.message === "SUCCESS") {
          navigate("/teacher-exams");
        }
      });
    const clearTextFields = {
      examName: "",
    };
    setExamName(clearTextFields);
  };

  const onPublish = () => {
    axios
      .put(`http://localhost:5000/exam/exam-publish/${examID}`)
      .then((res) => {
        if (res.status === 200) {
          navigate("/teacher-exams");
        } else {
          toast.error("Exam Not Published! ");
        }
      });
  };

  return (
    <>
      <Header />
      <section className="p-5">
        <Row>
          <Col xs={12} md={8}>
            <div className="pt-1">
              <div className="pb-3">
                <Form.Control
                  type="text"
                  id="examname"
                  placeholder="Enter Exam Name"
                  name="examname"
                  onChange={(e) => setExamName(e.target.value)}
                  value={examName}
                  required="required"
                />
              </div>

              <h5>Question List</h5>
              <ExamTable initialValues={initialValues} tableData={tableData} />
            </div>
          </Col>
          <Col md={4} className="pt-1">
            <Card border="success" className="p-3">
              <Formik
                initialValues={initialValues}
                onSubmit={(value, { resetForm }) => {
                  console.log(value);

                  const questionArray = (data) => [...data, value];
                  setTableData(questionArray);
                  resetForm()
                }}
              >
                {({ values, errors, touched }) => (
                  <FormikForm>
                    <Form.Group className="p-3">
                      <Form.Label>Question</Form.Label>
                      <Field
                        value={values.question}
                        type="text"
                        id="question"
                        name="question"
                        placeholder="Enter Question"
                        required="required"
                        as={Form.Control}
                      />
                    </Form.Group>
                    <Form.Group className="p-3">
                      <Form.Label>Answers List</Form.Label>
                      <Row className="pt-1">
                        <Col className="m-auto" xs={1}>
                          <Field
                            type="radio"
                            as={Form.Check}
                            value="1"
                            id="radio1"
                            name="correctAnswer"
                          />
                        </Col>
                        <Col>
                          <Field
                            id="answer1"
                            name="answers[0].answer"
                            type="text"
                            placeholder="Answer 1"
                            required="required"
                            as={Form.Control}
                          />
                        </Col>
                      </Row>
                      <Row className="pt-2">
                        <Col className="m-auto" xs={1}>
                          <Field
                            type="radio"
                            value="2"
                            as={Form.Check}
                            id="radio2"
                            name="correctAnswer"
                          />
                        </Col>
                        <Col>
                          <Field
                            id="answer2"
                            name="answers[1].answer"
                            type="text"
                            placeholder="Answer 2"
                            required="required"
                            as={Form.Control}
                          />
                        </Col>
                      </Row>
                      <Row className="pt-2">
                        <Col className="m-auto" xs={1}>
                          <Field
                            type="radio"
                            value="3"
                            as={Form.Check}
                            id="radio3"
                            name="correctAnswer"
                          />
                        </Col>
                        <Col>
                          <Field
                            id="answer3"
                            name="answers[2].answer"
                            type="text"
                            placeholder="Answer 3"
                            required="required"
                            as={Form.Control}
                          />
                        </Col>
                      </Row>
                      <Row className="pt-2">
                        <Col className="m-auto" xs={1}>
                          <Field
                            type="radio"
                            value="4"
                            as={Form.Check}
                            id="radio4"
                            name="correctAnswer"
                          />
                        </Col>
                        <Col>
                          <Field
                            id="answer4"
                            name="answers[3].answer"
                            type="text"
                            placeholder="Answer 4"
                            required="required"
                            as={Form.Control}
                          />
                        </Col>
                      </Row>
                    </Form.Group>

                    <Form.Group className="p-3">
                      <Button type="submit">Add Question</Button>
                    </Form.Group>
                  </FormikForm>
                )}
              </Formik>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="p-4 d-flex flex-row">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  label="Material Date Picker"
                  variant="inline"
                  format="yyyy/MM/dd HH:mm"
                  value={selectedDate}
                  rifmFormatter={(val) => val.replace(/[^ ,a-zA-Z0-9]+/gi, "")}
                  refuse={/[^ ,a-zA-Z0-9]+/gi}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>{" "}
              <select style={{width:200 ,}}  className="form-select m-3 " onChange={(e) => setDuration(e.target.value)}>
                <option selected>Select Duration</option>
                <option value="1 Hr">1 Hr</option>
                <option value="1 Hr 30min">1 Hr 30min</option>
                <option value="2 Hr">2 Hr</option>
                <option value="2 Hr 30min">2 Hr 30min</option>
              </select>
              <Button onClick={onSave} variant="success" className="m-3">
                Save
              </Button>
              <Button onClick={onPublish} variant="danger" className="m-3">
                Publish Paper
              </Button>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};
