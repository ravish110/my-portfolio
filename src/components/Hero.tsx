import { Container, Row, Col, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import profilePic from '../assets/ravish.jpg';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Hero = () => {
    const heroData = useSelector((state: RootState) => state.portfolio.hero);

    return (
        <section id="home" className="d-flex align-items-center" style={{ minHeight: '100vh', paddingTop: '80px' }}>
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="text-center text-md-start animate__animated animate__fadeInLeft">
                        <h2 className="text-info text-uppercase mb-2" style={{ letterSpacing: '2px' }}>Hello, I'm</h2>
                        <h1 className="display-3 fw-bold mb-3">{heroData.name}</h1>
                        <h3 className="h2 mb-4">{heroData.role}</h3>
                        <p className="lead opacity-75 mb-5" style={{ maxWidth: '500px' }}>
                            {heroData.bio}
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
                                alt={heroData.name}
                                className="img-fluid rounded-circle mb-3 border border-4 border-info"
                                style={{ width: '250px', height: '250px', objectFit: 'cover' }}
                            />
                            <div className="mt-3">
                                <h4 className="fw-bold mb-3">{heroData.name}</h4>
                                <div className="d-flex flex-column gap-2 small opacity-75">
                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                        <FaEnvelope className="text-info" />
                                        <span>{heroData.email}</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                        <FaPhone className="text-info" />
                                        <span>{heroData.phone}</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center gap-2">
                                        <FaMapMarkerAlt className="text-info" />
                                        <span>{heroData.location}</span>
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
