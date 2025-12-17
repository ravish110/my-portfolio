import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
    return (
        <section id="contact" className="py-5 mb-5">
            <Container>
                <h2 className="section-title animate__animated animate__fadeInUp">Get In Touch</h2>
                <Row className="justify-content-center">
                    <Col md={5} className="mb-4 mb-md-0 animate__animated animate__fadeInLeft">
                        <div className="glass-card h-100">
                            <h3 className="h4 fw-bold text-info mb-4">Contact Info</h3>

                            <div className="d-flex align-items-center mb-4">
                                <div className="bg-info bg-opacity-25 p-3 rounded-circle me-3">
                                    <FaEnvelope className="text-info" size={24} />
                                </div>
                                <div>
                                    <h5 className="mb-0">Email</h5>
                                    <a href="mailto:ravish.abbas94@gmail.com" className="opacity-75 text-decoration-none" style={{ color: 'inherit' }}>ravish.abbas94@gmail.com</a>
                                </div>
                            </div>

                            <div className="d-flex align-items-center mb-4">
                                <div className="bg-info bg-opacity-25 p-3 rounded-circle me-3">
                                    <FaPhone className="text-info" size={24} />
                                </div>
                                <div>
                                    <h5 className="mb-0">Phone</h5>
                                    <a href="tel:+919029666805" className="opacity-75 text-decoration-none" style={{ color: 'inherit' }}>+91 9029666805</a>
                                </div>
                            </div>

                            <div className="d-flex align-items-center">
                                <div className="bg-info bg-opacity-25 p-3 rounded-circle me-3">
                                    <FaMapMarkerAlt className="text-info" size={24} />
                                </div>
                                <div>
                                    <h5 className="mb-0">Location</h5>
                                    <p className="mb-0 opacity-75">Navi mumbai, Maharashtra, India</p>
                                </div>
                            </div>

                        </div>
                    </Col>

                    <Col md={7} className="animate__animated animate__fadeInRight">
                        <div className="glass-card">
                            <h3 className="h4 fw-bold mb-4">Send a Message</h3>
                            <Form action="https://formsubmit.co/ravish.neosoft@gmail.com" method="POST">
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Control type="text" name="name" placeholder="Your Name" aria-label="Name" className="bg-transparent border-secondary" style={{ backdropFilter: 'blur(5px)', color: 'var(--text-primary)' }} required />
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Control type="email" name="email" placeholder="Your Email" aria-label="Email" className="bg-transparent border-secondary" style={{ backdropFilter: 'blur(5px)', color: 'var(--text-primary)' }} required />
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" name="subject" placeholder="Subject" aria-label="Subject" className="bg-transparent border-secondary" style={{ backdropFilter: 'blur(5px)', color: 'var(--text-primary)' }} required />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Control as="textarea" name="message" rows={4} placeholder="Message" aria-label="Message" className="bg-transparent border-secondary" style={{ backdropFilter: 'blur(5px)', color: 'var(--text-primary)' }} required />
                                </Form.Group>
                                <input type="hidden" name="_captcha" value="false" />
                                <input type="hidden" name="_template" value="table" />
                                <Button variant="info" type="submit" className="w-100 fw-bold text-white py-2 shadow-sm">
                                    Send Message
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Contact;
