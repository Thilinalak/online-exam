import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { toast } from "react-toastify";
import { Header } from "../../components/Header";



export const MonitorStartedExam = () => {
  const [totalStudents, setTotalStudents] = useState("");
  const [examCompletedStudents, setExamCompletedStudents] = useState("");
  const [attendingList, setAttendingList] = useState([]);
  const [examID, setExamID] = useState("");
  const [exam, setExam] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const [endingTime, setEndingTime] = useState("");
  const [timeLeft, setTimeLeft] = useState("");
  const [isExamEnd, setIsExamEnd] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const examInfo = location.state.examinfo;
    setExam(examInfo);
    setExamID(examInfo.idexam);
    let time;
    let hh;
    let mm;
    let ss;

    let fetchData = () => {
      axios
        .get(
          `http://localhost:5000/exam/monitor-started-exam/?examid=${examInfo.idexam}`
        )
        .then((resp) => {
          setTotalStudents(resp.data.resObj.total_Students);
          setExamCompletedStudents(resp.data.resObj.examCompletedStudents);
          setAttendingList(resp.data.resObj.attendingList);
        });
    };

    const calculateTime = () => {
      time = new Date(examInfo.datetime);

      setStartingTime(
        time.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })
      );

      let duration = examInfo.duration.toString();
      time.setHours(time.getHours() + parseInt(duration[0]));

      if (parseInt(duration.substring(5, 7))) {
        time.setMinutes(time.getMinutes() + parseInt(duration.substring(5, 7)));
      }

      setEndingTime(
        time.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })
      );
    };

    const timeLeft = () => {
      let currentTime = new Date().toLocaleString();
      if (
        currentTime > new Date(examInfo.datetime).toLocaleString() &&
        currentTime < time.toLocaleString()
      ) {
        let now = new Date().getTime();
        let distance = time.getTime() - now;
        hh = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        mm = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        ss = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(hh + "h : " + mm + "m : " + ss+"s")
        setIsExamEnd(false)
      } else {
        setIsExamEnd(true)
        setTimeLeft("00:00:00");
      }
    };

    const intervalid = setInterval(() => {
      fetchData()
      calculateTime();
      timeLeft();
    }, 1000);

    return () => clearInterval(intervalid);
  }, []);

  const onEndExam = () => {
    if(isExamEnd){
      axios.put(`http://localhost:5000/exam/end-exam/${examID}`).then((res) => {
        console.log(res);
        if (res.status === 200) {
          navigate("/teacher-exams");
        }
      });
    }else{
      toast.error("Please wait for untill the Exam End")
    }
    
  };

  return (
    <>
      <Header />

      <Container className="p-4">
        <Row xs={1} md={2} className="pt-5">
          <Col className="pt-4">
            <Card border="success" style={{ width: "33rem", height: "11rem" }}>
              <Card.Header>
                <h6>Exam Completed</h6>
              </Card.Header>
              <Card.Body className="m-auto">
                <Card.Text>
                  <h1>
                    {examCompletedStudents} / {totalStudents}
                  </h1>
                </Card.Text>
                <Card.Text>
                  <h4>Time Left : {timeLeft}</h4>
                </Card.Text>
              </Card.Body>
            </Card>
            <div className="pt-4">
              <Card
                border="success"
                style={{ width: "33rem", height: "11rem" }}
              >
                <Card.Body className="pt-4">
                  <Card.Title>Exam Starting Time : {startingTime}</Card.Title>
                  <Card.Title>Exam Ending Time : {endingTime}</Card.Title>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col className="pt-4">
            <Card
              border="success"
              style={{ width: "33rem", height: "23.5rem" }}
            >
              <Card.Header>
                <h6>Attending Stuednt List</h6>
              </Card.Header>
              <Scrollbars>
                <div className="p-3">
                  {attendingList.map((student, index) => (
                    <Card
                      key={index}
                      border="dark"
                      style={{ width: "30.9rem" }}
                    >
                      <Row>
                        <Col sm={8}>
                          <Card.Body>{student.studentName}</Card.Body>
                        </Col>
                        <Col sm={4}>
                          {student.completeStatus === "Pending" ? (
                            <Card.Body className="text-end fw-bold text-danger">
                              Pending
                            </Card.Body>
                          ) : (
                            <Card.Body className="text-end fw-bold text-success">
                              Completed
                            </Card.Body>
                          )}
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </div>
              </Scrollbars>
            </Card>
          </Col>
        </Row>
        <div className="float-end pt-4">
          <Row>
            <Col>
              <Button variant="danger" onClick={onEndExam}>
                End Exam
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};
