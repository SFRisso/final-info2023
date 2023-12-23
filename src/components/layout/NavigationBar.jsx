import { Link } from 'react-router-dom';
import { Cart } from "react-bootstrap-icons";
import { Navbar, Nav, Container, Button, NavDropdown, NavItem, Badge } from 'react-bootstrap'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function AdminPanel({isAdmin}) {
  if (!isAdmin){
    return null;
  }

  return (
    <NavDropdown title="Panel de Administrador" id="collapsible-nav-dropdown" >
      <NavDropdown.Item as={Link} to="/products/add" >Agregar Producto</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/products/edit/" >Editar Productos</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item as={Link} to="/categories/add"> Agregar Categoría</NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/categories/edit/">Editar Categorías</NavDropdown.Item>
    </NavDropdown>       
  );
}

function LoggedIn({logged}) {
  const { handleLogout, user} = useContext(AuthContext)
  if (logged){
    return (
      <NavItem>
        <Navbar.Text>
            <b >
            <span className="text-primary">Usuario: </span> 
            <u className="text-uppercase">{user.name}</u>
            </b>
        </Navbar.Text>
      <Nav.Link 
      as={Link} 
      to="/products" 
      className="link-warning link-opacity-75 link-opacity-100-hover"
      onClick={handleLogout}
      >
        Cerrar Sesión
      </Nav.Link> 
      </NavItem>
    );
  }
  return ( 
    <>
    <Nav.Link as={Link} to="/login">Login</Nav.Link>
    <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>
    </>
   );
}


function NavigationBar() {
  const { user} = useContext(AuthContext)

  return (
    <Navbar bg="dark" data-bs-theme="dark"  expand="lg">
    <Container>
      <Navbar.Brand href="#home">Info 2023</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto" >
        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
        <Nav.Link as={Link} to="/categories">Categorías</Nav.Link>
        <Nav.Link as={Link} to="/products">Productos</Nav.Link>   
        <AdminPanel isAdmin={user.admin}/> 
      </Nav>
      <Nav>
        <LoggedIn logged={user.name}/>
        <NavItem>
          <Button as={Link} to="/cart-detail" variant="secondary" size="sm" className="p-auto">
            <Cart color="white" size={22} className="mb-1"/> 
            <Badge bg="dark" className="ms-1 mt-2">0</Badge>
          </Button>
        </NavItem>
      </Nav>
      </Navbar.Collapse>           
    </Container>
    </Navbar>
  );
}

export default NavigationBar;