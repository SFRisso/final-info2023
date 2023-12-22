import { Link } from 'react-router-dom';
import { Cart } from "react-bootstrap-icons";
import { Navbar, Nav, Container, Button, NavDropdown, NavItem, Badge } from 'react-bootstrap'

function NavigationBar() {
    return (
        <Navbar bg="dark" data-bs-theme="dark" sticky="top" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Info 2023</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" >
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/categories">Categorías</Nav.Link>
            <Nav.Link as={Link} to="/products">Productos</Nav.Link>
            <NavDropdown title="Panel de Administrador" id="collapsible-nav-dropdown"  className="">
              <NavDropdown.Item as={Link} to="/products/add" >Agregar Producto</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/products/edit/" >Editar Productos</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/categories/add"> Agregar Categoría</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/categories/edit/">Editar Categorías</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="">
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          <Nav.Link as={Link} to="/register">Registrarse</Nav.Link>
          <NavItem>
          <Button as={Link} to="/cart-detail" variant="secondary" size="sm" className="p-auto">
            <Cart color="white" size={30}/> 
            <Badge bg="dark" className="m-1">0</Badge>
          </Button>
          </NavItem>
          </Nav>
          </Navbar.Collapse>           
        </Container>
      </Navbar>
      );
}

export default NavigationBar;