import { Button, Row, Col, Form, Card, Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Timer from "../../components/Timer";
import "../../App.css";

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

function SingleExam ()  {
  const [duration, setDuration] = useState("");
  const [examName, setExamName] = useState("");
  const [examID, setExamID] = useState();
const [currentUserID, setCurrentUserID] = useState()
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate()

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const userr = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {

    userr ? console.log() : navigate('/')
    const exmID = location?.state?.examid;
    setExamID(exmID)
    setCurrentUserID(userr.user[0].idstudent)
    setExamName(location?.state?.examname);
    setDuration(location?.state?.duration);
    axios
      .get(`http://localhost:5000/exam/questions-answers/${exmID}`)
      .then((res) => {
        console.log("response ", res.data);
        setQuestions(res.data);
      });
  }, []);

  const answerChange = (answer) => {
    questions[count].correctAnswer = answer;
    setQuestions(questions)
    console.log(questions);
    forceUpdate();
    
  };

  const nextQuestion = () => {
    let c = count + 1;
    if (c < questions.length) setCount(c);
  };
  const previousQuestion = () => {
    let c = count - 1;
    if (c > -1) setCount(c);
  };

  const onSave = () =>{
    axios.post(`http://localhost:5000/exam/student-save-exam`,{
      examID , currentUserID, questions
    })
    .then((res) => {

    })
  }
  const onComplete = () =>{

  }

  return (
    <Container style={styles.center}>
      <div className="text-center">{/* <h3>Time Left : <Timer/></h3> */}</div>
      {/* {console.log('Q ', questions[count])} */}
      <div className="pt-4">
        {questions && questions.length > 0 ? (
          <Row>
            <div>
              <h5 className="pt-5">Q. {questions[count].question} </h5>
              <Card border="success" className="p-4">
                <Card.Body>
                  <Form.Check
                    type="radio"
                    className="pt-1"
                    label={questions[count].answers[0].answer}
                    name="a"
                    id="a1"
                    onChange={()=>answerChange(1)}
                    checked = {(questions[count].correctAnswer===1 ? true:false)}
                  />
                  <Form.Check
                    type="radio"
                    className="pt-1"
                    label={questions[count].answers[1].answer}
                    name="a"
                    id="a2"
                    onChange={()=>answerChange(2)} 
                    checked = {(questions[count].correctAnswer===2 ? true:false)}
                  />
                  <Form.Check
                    type="radio"
                    className="pt-1"
                    onChange={()=>answerChange(3)}
                    label={questions[count].answers[2].answer}
                    checked = {(questions[count].correctAnswer===3 ? true:false)}
                    name="a"
                    id="a3"
                  />
                  <Form.Check
                    type="radio"
                    className="pt-1"
                    label={questions[count].answers[3].answer}
                    checked = {(questions[count].correctAnswer ===4 ? true:false)}
                    name="a"
                    data-title={(questions[count].correctAnswer)}
                    onChange={()=>answerChange(4)}
                    id="a4"
                  />
                </Card.Body>
              </Card>
            </div>
            <div className="pt-3">
              <Row>
                <Col>
                  <Button
                    onClick={previousQuestion}
                    style={styles.btnpadding}
                    variant="secondary"
                  >
                    Prev
                  </Button>
                </Col>
                <Col className="text-center fw-bold">Question 1</Col>
                <Col>
                  <div className="float-end">
                    <Button
                      onClick={nextQuestion}
                      style={styles.btnpadding}
                      variant="secondary"
                    >
                      Next
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Row>
        ) : (
          <></>
        )}
      </div>
      <div className="float-end pt-5">
        <Row>
          <Col>
            <Button onClick={onSave} variant="success">Save</Button>{" "}
            <Button variant="info">Complete</Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default SingleExam;
