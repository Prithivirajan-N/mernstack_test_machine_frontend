import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function Header() {
  
  const userName = localStorage.getItem('userName'); // Get the logged-in username
  const navigate = useNavigate();
  //logout function
  const logoutUser = ()=>{
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    navigate('login');
  }
 

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">BLR-DealsDray</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="employes">EmployeList</Nav.Link>
            </Nav>
            <Nav>
              
              <Nav.Link eventKey={2} href="#">
                {/* Display the logged-in username */}
                {userName ? `Welcome, ${userName}` : 'Login'}
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={logoutUser}><i class="fa-solid fa-right-from-bracket"></i></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
