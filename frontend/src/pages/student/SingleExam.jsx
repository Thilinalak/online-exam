import { Button, Row, Col, Form, Card, Container } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
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

export const SingleExam = () => {
  const [duration, setDuration] = useState("");
  const [examName, setExamName] = useState("");
  const [currentUser, setCurrentUser] = useState([]);

  const [questions, setQuestions] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setCurrentUser(user);
    }
    const examID = location?.state?.examid;
    setExamName(location?.state?.examname);
    setDuration(location?.state?.duration);
    axios
      .get(`http://localhost:5000/exam/questions-answers/${examID}`)
      .then((res) => {
        console.log("response ", res.data);
        setQuestions(res.data.slice(0, res.data.length));
      });
  }, []);

  const questionPerPage = 1;
  const pagesVisited = pageNumber * questionPerPage;

  const displayQuestions = questions
    .slice(pagesVisited, pagesVisited + questionPerPage)
    .map((question) => {
      return (
        <div>
          <h5 className="pt-5">Q. {question.question}</h5>
          <Card border="success" className="p-4">
            <Card.Text>
              {question.answers.map((ans) => {
                console.log("answer ", ans.answer);
                return (
                  <>
                    <Form.Check
                      type="radio"
                      className="pt-1"
                      label={ans.answer}
                      name="group1"
                      id="a1"
                    />
                  </>
                );
              })}
            </Card.Text>
          </Card>
        </div>
      );
    });

  const pageCount = Math.ceil(questions.length / questionPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const location = useLocation();

  return (
    <Container style={styles.center}>
      <div className="text-center">
        <h3>Time Left : 45 min</h3>
      </div>
      {displayQuestions}

      <div className="pt-4">
        <Row>
          <ReactPaginate
            previosLabale={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationButtons"}
            previousLinkClassName={"previousBtn"}
            nextLinkClassName={"nextBtn"}
            disabledLinkClassName={"paginationDisabled"}
            activeLinkClassName={"paginationActive"}
          />

          {/* <Col>
            <Button style={styles.btnpadding} variant="secondary">
              Prev
            </Button>
          </Col>
          <Col className="text-center fw-bold">Question 1</Col>
          <Col>
            <div className="float-end">
              <Button style={styles.btnpadding} variant="secondary">
                Next
              </Button>
            </div>
          </Col> */}
        </Row>
      </div>
      <div className="float-end pt-5">
        <Row>
          <Col>
            <Button variant="success">Save</Button>{" "}
            <Button variant="info">Complete</Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
};
