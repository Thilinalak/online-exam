import { Button, Row, Col, Form, Card, Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "../../App.css";
import Alert from 'react-popup-alert'

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
  const [studentID, setStudentID] = useState()
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const [pa, setPA] = useState();
  const location = useLocation();
  const navigate = useNavigate()
  const [timeLeft, setTimeLeft] = useState("");

  const [, updateState] = useState();
  const [enteringAnswer, setEnteringAnswer] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  // const userr = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  const userr = JSON.parse(localStorage.getItem("user"));
 

    !userr ? navigate('/') : console.log()

    const exmID = location?.state?.examid;
    const stID = userr.user[0].idstudent
    setExamID(exmID)
    setStudentID(userr.user[0].idstudent)
    setExamName(location?.state?.examname);
    setDuration(location?.state?.exduration);

    let time;
  let hh;
  let mm;
  let ss;

    axios
      .get(`http://localhost:5000/exam/student/questions-answers/?examID=${exmID}&studentID=${stID}`)
      .then((res) => {
        console.log("response ", res.data);
        setQuestions(res.data);
      });

      const calculateTime = () => {
        time = new Date(location.state.exdatetime);
        
        
  
        let duration = location.state.exduration.toString();
        time.setHours(time.getHours() + parseInt(duration[0]));
  
        if (parseInt(duration.substring(5, 7))) {
          time.setMinutes(time.getMinutes() + parseInt(duration.substring(5, 7)));
        }
  
        
      };

      const timeLeft = () => {
        let currentTime = new Date().toLocaleString();

        if (
          currentTime < new Date(location.state.exduration).toLocaleString() &&
          currentTime < time.toLocaleString()
        ) {
          let now = new Date().getTime();
          let distance = time.getTime() - now;
          hh = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          mm = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          ss = Math.floor((distance % (1000 * 60)) / 1000);
  
          setTimeLeft(hh + "h : " + mm + "m : " + ss+"s");

        } else {
          console.log("00:00:00");
          setTimeLeft("00:00:00");
          clearInterval(intervalid);
        }
      };

      const intervalid = setInterval(() => {
        calculateTime()
        timeLeft();

      }, 1000);
  
      return () => clearInterval(intervalid);

  }, []);



  const answerChange = (answer) => {
    questions[count].enteringAnswer = answer;
    setQuestions(questions)
    console.log(questions);
    forceUpdate();
    
  };

  const nextQuestion = () => {
    let c = count + 1;
    if (c < questions.length) {
      setCount(c)
      // questions[count].enteringAnswer = 3;
      
    }
  };
  const previousQuestion = () => {
    
    let c = count - 1;
    if (c > -1) {
      setCount(c);}
      // questions[count].enteringAnswer = 1;
  };

  const onSave = () =>{

    axios.post(`http://localhost:5000/exam/student/save-exam`,{
      examID , studentID, questions
    })
    .then((res) => {
      res.status === 200 ? navigate('/student-exams') : console.log('bad response');
    })
  }

  const onComplete = () =>{


    let totalQuestions = questions.length
    let givenAnswers = []
    questions.map(q =>{
      q.enteringAnswer !== undefined ? givenAnswers.push(q.enteringAnswer) : console.log() 
    })
    if(givenAnswers.length === totalQuestions ){
      axios.post(`http://localhost:5000/exam/student/save-exam`,{
      examID , studentID, questions, isExamCompleted:true
    })
    .then((res) => {
      res.status === 200 ? 
      navigate('/student-exam-result',{state:{studentData:res.data}}) 
      : console.log('bad response');
    })
    }else{
      toast.error('Please Before Press Complete, You Must Answer To the All Questions !')
    }
   
  }

  return (
    <Container style={styles.center}>
      <div className="text-center">
        <h3>Time Left : {timeLeft}</h3>
        </div>
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
                    checked = {((questions[count].enteringAnswer ) ==1 ? true: false)}
                  />
                  <Form.Check
                    type="radio"
                    className="pt-1"
                    label={questions[count].answers[1].answer}
                    name="a"
                    id="a2"
                    onChange={()=>answerChange(2)} 
                    checked = {((questions[count].enteringAnswer ) ==2 ? true:false)}
                  />
                  <Form.Check
                    type="radio"
                    className="pt-1"
                    onChange={()=>answerChange(3)}
                    label={questions[count].answers[2].answer}
                    checked = {(questions[count].enteringAnswer===3 ? true:false)}
                    name="a"
                    id="a3"
                  />
                  <Form.Check
                    type="radio"
                    className="pt-1"
                    label={questions[count].answers[3].answer}
                    checked = {(questions[count].enteringAnswer ===4 ? true:false)}
                    name="a"
                    data-title={(questions[count].enteringAnswer)}
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
                <Col className="text-center fw-bold">Question {count+1}</Col>
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
            <Button onClick={onComplete}variant="info">Complete</Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default SingleExam;
