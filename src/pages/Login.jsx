import { Button, Form, Container, Card } from "react-bootstrap";

const Login = () => {
  return (
    <>
      <Container style={{width:400, height:350, paddingTop:50}}>
        <Card className="p-3">
          <Card.Body className="text-center">
            <Card.Title>School MCQ Online Exam Application</Card.Title>
            <Card.Text className="pt-3 h2" >Sign in</Card.Text>
          </Card.Body>

          <Form className="p-1">
            <Form.Group className="p-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email" id="email" name="email"
                placeholder="Enter Your Email Address"
              />
            </Form.Group>
            <Form.Group className="p-3">
              <Form.Label>Password</Form.Label>
              <Form.Control id="password"  name="password" type="password" placeholder="Enter Your Password" />
            </Form.Group>
            <Form.Group  className="p-3">
              <Button type="submit">Sign in</Button>
            </Form.Group>
          </Form>
        </Card>
      </Container>

    </>
  );
};

export default Login;
