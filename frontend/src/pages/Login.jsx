import { Button, Form, Container, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const userr = JSON.parse(localStorage.getItem("user"));
  useEffect(()=>{
    if(userr){
      userr.userType === 'student' ? navigate('/student-exams') : navigate('/teacher-exams')
    }else{
      navigate('/')
    }
  },[userr])

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

    if( !(email === '' || password === '') ){
      axios.post('http://localhost:5000/api/users/login', {
        username: email,
        password: password,
      }).then((respose) =>{
          if(!respose.data.message){
            console.log('userDD', respose.data)
            localStorage.setItem('user', JSON.stringify(respose.data))
            if(respose.data.userType === 'student'){
              navigate('/student-exams')
            }else{
              navigate('/teacher-exams')
            }
          }else{
            toast.error(respose.data.message)
          }
      })
    }else{
      toast.error('Both fields are Required !')
    }

    
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
