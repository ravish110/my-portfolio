import { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaCode, FaSun, FaMoon, FaDownload } from 'react-icons/fa';
import resume from '../assets/resume.pdf';

const NavBar = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <Navbar expand="lg" variant={theme} fixed="top" className="glass-nav py-3">
            <Container>
                <Navbar.Brand href="#home" className="d-flex align-items-center animate__animated animate__fadeInLeft">
                    <FaCode size={24} className="me-2 text-info" />
                    <span className="fw-bold fs-5">Ravish Abbas</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Toggle navigation" className="border-0 shadow-none" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto animate__animated animate__fadeInRight align-items-center">
                        <Nav.Link href="#home" className="mx-2">Home</Nav.Link>
                        <Nav.Link href="#skills" className="mx-2">Skills</Nav.Link>
                        <Nav.Link href="#experience" className="mx-2">Experience</Nav.Link>
                        <Nav.Link href="#notifications" className="mx-2">Notifications</Nav.Link>
                        <Nav.Link href="#contact" className="mx-2">Contact</Nav.Link>
                        <Button
                            as="a"
                            href={resume}
                            download="Ravish_Abbas_Resume.pdf"
                            variant="outline-info"
                            size="sm"
                            className="mx-2 d-flex align-items-center gap-2"
                        >
                            <FaDownload size={14} /> Resume
                        </Button>
                        <Button
                            variant="link"
                            onClick={toggleTheme}
                            className="ms-2 p-0 border-0"
                            aria-label={theme === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
