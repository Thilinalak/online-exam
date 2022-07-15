import {Link}  from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {FaSignOutAlt,IoChevronBackCircle } from 'react-icons/fa'
import {Navbar,Container, Nav, NavDropdown} from 'react-bootstrap'

export const Header = () => {
  return (
    <Navbar bg="primary" variant="dark">
    <Container>
    <Navbar.Brand href="#home"><ArrowBackIcon/> Back</Navbar.Brand>
    <Nav className="justify-content-end">
    <NavDropdown title="SignOut" id="collasible-nav-dropdown">
        <NavDropdown.Item href="/"><FaSignOutAlt/> SignOut</NavDropdown.Item>
        
      </NavDropdown>
    </Nav>
    </Container>
  </Navbar>

    )
}
