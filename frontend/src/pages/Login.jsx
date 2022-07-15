import { Button, Form, Container, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../actions/auth";

const Login = (props) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const {user, isSuccess, isError, message} = useSelector((state) => state.auth)
  // const userr = JSON.parse(localStorage.getItem("user"));

  // useEffect(()=>{
  //   if(isError){
  //     console.log('ERROR');
  //     toast.error(message)
  //   }
  //   if(isSuccess){
  //     console.log('Success');
  //     // navigate('/student-exams')
  //   }
  //   dispatch(reset())
  // },[user, isError, isSuccess, message, navigate, dispatch])

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginData;

  const onChange = (e) => {
    setLoginData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(login(email, password))
      .then(() => {
        const userr = JSON.parse(localStorage.getItem("user"));

        // const userType = currentUser.map(u => (u.user_type))
        console.log(userr[0].user_type);
        if (userr[0].user_type === "teacher") {
          navigate("/teacher-exams");
        } else {
          navigate("/student-exams");
        }
      })
      .catch(() => {
        console.log("catch ", message);
        {
          message && toast.error(message);
        }
      });

    // dispatch(login(userData))
    // axios.post('http://localhost:5000/api/users/login', {
    //   username: email,
    //   password: password,
    // }).then((respose) =>{
    //     if(respose.data.message){
    //       toast.error(respose.data.message)
    //     }else{
    //       console.log(respose.data)
    //       localStorage.setItem('user', JSON.stringify(respose.data))
    //       const userType = respose.data[0].user_type
    //       if(userType === 'student'){
    //         navigate('/student-exams')
    //       }else{
    //         navigate('/teacher-exams')
    //       }
    //     }
    // })
  };

  return (
    <>
      <Container style={{ width: 400, height: 350, paddingTop: 100 }}>
        <Card className="p-3">
          <Card.Body className="text-center">
            <Card.Title>School MCQ Online Exam Application</Card.Title>
            <Card.Text className="pt-3 h2">Sign in</Card.Text>
          </Card.Body>

          <Form onSubmit={onSubmit} className="p-1">
            <Form.Group className="p-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                id="email"
                onChange={onChange}
                name="email"
                value={email}
                placeholder="Enter Your Email Address"
              />
            </Form.Group>
            <Form.Group className="p-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                id="password"
                onChange={onChange}
                name="password"
                value={password}
                type="password"
                placeholder="Enter Your Password"
              />
            </Form.Group>
            <Form.Group className="p-3">
              <Button type="submit">Sign in</Button>
            </Form.Group>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default Login;
