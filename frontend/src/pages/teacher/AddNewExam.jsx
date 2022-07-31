import { Row, Form, Col, Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import DateFnsUtils from "@date-io/date-fns";
import {
  TimePicker,
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import ExamTable from "../../components/ExamTable";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "../../components/Header";
import { Formik, Form as FormikForm, Field } from "formik";
import axios from "axios";

export const AddNewExam = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedDateTime, setSelectedDataTime] = useState(new Date());
  const [duration, setDuration] = useState("");
  const [examName, setExamName] = useState("");
  const [currentUser, setCurrentUser] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
    const examID = location?.state?.examid
    setExamName(location?.state?.examname)
    setSelectedDataTime(location?.state?.datetime)
    setDuration(location?.state?.duration)

    axios.get(`http://localhost:5000/exam/questions-answers/${examID}`)
    .then((res) => {
      console.log('QA RES',res.data);
    })
  }, []);

 
  // const onChange = (e) => {
  //   setExamData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const onSave = (e) => {
    e.preventDefault();

    const id = currentUser[0].iduser_login;
    console.log(
      "data ",
      examName +
        " " +
        selectedDateTime +
        " " +
        duration +
        " " +
        id +
        " array " +
        tableData
    );

    const alldata = {
      examName,
      selectedDateTime,
      duration,
      id,
      tableData,
    };
    axios
      .post("http://localhost:5000/exam/add-new-exam", alldata)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          navigate("/teacher-exams");
        }
      });
    const clearTextFields = {
      examName: "",
    };
    // setExamName(clearTextFields);
  };

  const onPublish = () =>{
    axios.put('http://localhost:5000/exam/exam-publish')
    .then((res)=>{

    })
  } 

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
              <ExamTable tableData={tableData} />
            </div>
          </Col>
          <Col md={4} className="pt-1">
            <Card border="success" className="p-3">
              <Formik
                initialValues={{
                  question: "",
                  correctAnswer: "",
                  answers: [{
                    idanswer: '',
                    answer: '',
                  }, {
                    idanswer: '',
                    answer: '',
                  }, 
                  {
                    idanswer: '',
                    answer: '',
                  }, {
                    idanswer: '',
                    answer: '',
                  }],
                }}
                onSubmit={(value, { resetForm }) => {
                  console.log(value);

                  const questionArray = (data) => [...data, value];
                  setTableData(questionArray);
                  // resetForm()
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
            <div className="p-4">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  ampm={true}
                  label="Exam Date and Time"
                  inputVariant="filled"
                  value={selectedDateTime}
                  onChange={setSelectedDataTime}
                  onError={console.log}
                  disablePast
                  showTodayButton
                  format="yyyy/MM/dd HH:mm"
                />{" "}
                <select onChange={(e) => setDuration(e.target.value)}>
                  <option value="1 Hr">1 hr</option>
                  <option value="1 Hr 30min">1 hr 30min</option>
                  <option value="2 Hr">2 hr</option>
                  <option value="2 Hr 30min">2 hr 30min</option>
                </select>
              </MuiPickersUtilsProvider>
              <Button onClick={onSave} variant="success" className="m-3">
                Save
              </Button>
              <Button onClick={onPublish} variant="danger" className="">
                Publish Paper
              </Button>
            </div>
          </Col>
        </Row>
      </section>
    </>
  );
};
