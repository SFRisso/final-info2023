import { useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Form, Button, FloatingLabel, Alert, Col } from 'react-bootstrap';
import { AuthContext } from '../../context/AuthContext';

const loginMutation = async ({ email, password }) => {
  const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

function LoginFail() {
  return <Alert variant="danger">Datos Incorrectos.</Alert>;
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fail, setFail] = useState(false);
  const { handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || '/';

  const mutation = useMutation({
    mutationFn: loginMutation,
    onSuccess: (data) => {
      console.log('Login exitoso', data);
    },
    onError: (data) => {
      setFail(true);
      console.log('Algo salio mal', data);
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    mutation.mutate({
      email: email,
      password: password,
    });
    //handleLogin(email);
    //navigate(from, {replace: true});
  }

  return (
    <Col>
      <p className="fs-1 text-center">Login</p>
      {fail && <LoginFail />}
      <Form onSubmit={handleSubmit}>
        <Form.Group required className="mb-3" controlId="formBasicEmail">
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FloatingLabel>
        </Form.Group>
        <Button variant="dark" type="submit">
          Login
        </Button>
      </Form>
    </Col>
  );
}

export default Login;
