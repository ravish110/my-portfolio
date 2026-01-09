import { Container, Row, Col, Button } from 'react-bootstrap';
import profilePic from '../assets/ravish.jpg';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Hero = () => {
    return (
        <section id="home" className="d-flex align-items-center" style={{ minHeight: '100vh', paddingTop: '80px' }}>
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="text-center text-md-start animate__animated animate__fadeInLeft">
                        <h2 className="text-info text-uppercase mb-2" style={{ letterSpacing: '2px' }}>Hello, I'm</h2>
                        <h1 className="display-3 fw-bold mb-3">Ravish Abbas</h1>
                        <h3 className="h2 mb-4">Sr. Frontend Developer</h3>
                        <p className="lead opacity-75 mb-5" style={{ maxWidth: '500px' }}>
                            Specializing in creating visually appealing, responsive, and high-performance websites with over 9+ years of experience.
                        </p>
                        <div className="d-flex gap-3 justify-content-center justify-content-md-start">
                            <Button href="#contact" variant="info" size="lg" className="px-4 py-2 rounded-pill fw-bold text-white shadow-lg">
                                Hire Me
                            </Button>
                            <Button href="#experience" variant="outline-info" size="lg" className="px-4 py-2 rounded-pill fw-bold">
                                My Work
                            </Button>
                        </div>
                    </Col>
                    <Col md={6} className="text-center mt-5 mt-md-0 animate__animated animate__zoomIn">
                        <div className="glass-card d-inline-block p-4 mx-auto" style={{ maxWidth: '400px' }}>
                            <img
                                src={profilePic}
                                alt="Ravish Abbas"
                                className="img-fluid rounded-circle mb-3 border border-4 border-info"
                                style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                            />
                            <div className="mt-3">
                                <h4 className="fw-bold mb-3">Ravish Abbas</h4>
                                <div className="d-flex flex-column gap-2 small opacity-75">
                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                        <FaEnvelope className="text-info" />
                                        <span>ravish.abbas94@gmail.com</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                        <FaPhone className="text-info" />
                                        <span>+91 9029666805</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                        <FaMapMarkerAlt className="text-info" />
                                        <span>Navi Mumbai, India</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Hero;
