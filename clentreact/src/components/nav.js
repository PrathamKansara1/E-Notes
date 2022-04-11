import React from 'react'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { FaPen, FaPlus, FaSignInAlt, FaSignOutAlt, FaUserPlus } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'
import '../styles/nav.css'

const NavComp = () => {

  const history = useHistory();
  const token = localStorage.getItem('Token')
  const logout = () => {
    localStorage.removeItem("Token")
    history.push("/login")
  }

  return (
    <Navbar bg="dark" variant='dark' expand="lg">
      <Container>
        <Navbar.Brand to="/Notes" className='Logo'><FaPen className='icon' />NoTeS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Notes">Notes</Nav.Link>
            <Nav.Link as={Link} to="/PlayWithNotes">PlayWithNotes</Nav.Link>
            <Nav.Link as={Link} to="/History">History</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/Login"><FaSignInAlt className='mx-2' />Login</Nav.Link>
            <Nav.Link as={Link} to="/Signup"><FaUserPlus className='mx-2' />Signup</Nav.Link>
            <Nav.Link onClick={logout}><FaSignOutAlt className='mx-2' />Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  )
}

export default NavComp;