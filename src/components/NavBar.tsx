import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaCode } from 'react-icons/fa';

const NavBar = () => {
    return (
        <Navbar expand="lg" variant="dark" fixed="top" className="glass-nav py-3">
            <Container>
                <Navbar.Brand href="#home" className="d-flex align-items-center animate__animated animate__fadeInLeft">
                    <FaCode size={24} className="me-2 text-info" />
                    <span className="fw-bold fs-5">Ravish Abbas</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Toggle navigation" className="border-0 shadow-none" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto animate__animated animate__fadeInRight">
                        <Nav.Link href="#home" className="mx-2">Home</Nav.Link>
                        <Nav.Link href="#skills" className="mx-2">Skills</Nav.Link>
                        <Nav.Link href="#experience" className="mx-2">Experience</Nav.Link>
                        <Nav.Link href="#projects" className="mx-2">Projects</Nav.Link>
                        <Nav.Link href="#contact" className="mx-2">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
