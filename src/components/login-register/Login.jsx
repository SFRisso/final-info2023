import { useState, useContext } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function Login() {
  const [name, setName] = useState('');
  const [admin, setAdmin] = useState(false);
  const {handleLogin} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || '/';

  return (
      <> 
        <p className="fs-1 text-center">Login</p>
        <Form
            onSubmit={() =>{
            handleLogin(name, admin);
            navigate(from, {replace: true})
          } }>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <FloatingLabel
                controlId="floatingInput"
                label="Nombre"
                className="mb-3"
              >
              <Form.Control type="text" placeholder="Nombre" value={name} 
                onChange={(e)=> setName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Admin" value={admin} 
            onChange={(e)=> setAdmin(e.target.checked)
            } 
            />
          </Form.Group>
          <Button variant="dark" type="submit" >
            Login
          </Button>
        </Form>
      </>
      );
}

export default Login;