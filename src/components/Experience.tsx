import { Container, Row, Col, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { FaExternalLinkAlt } from 'react-icons/fa';

const Experience = () => {
    const experiences = useSelector((state: RootState) => state.portfolio.experience);

    return (
        <section id="experience" className="py-5">
            <Container>
                <h2 className="section-title animate__animated animate__fadeInUp">Work Experience</h2>
                <Row className="justify-content-center">
                    <Col lg={10}>
                        {experiences.map((exp, index) => {
                            // Render the company header for Neosoft (handled specially in original layout)
                            const isNeosoft = exp.company === "Neosoft Technologies Pvt Ltd";

                            return (
                                <div key={index}>
                                    {isNeosoft && (
                                        <div className="mb-5 animate__animated animate__fadeInUp text-center text-md-start px-4">
                                            <h3 className="h3 fw-bold text-info mb-1">{exp.company}</h3>
                                            <div className="d-flex flex-wrap gap-3 align-items-center justify-content-center justify-content-md-start">
                                                <span className="badge bg-light text-dark rounded-pill px-3 py-2">{exp.period}</span>
                                                <span className="h5 mb-0 text-secondary">{exp.role}</span>
                                            </div>
                                        </div>
                                    )}

                                    {exp.projects ? (
                                        exp.projects.map((proj, pIdx) => (
                                            <div
                                                key={`proj-${pIdx}`}
                                                className="glass-card mb-4 position-relative animate__animated animate__fadeInUp"
                                                style={{ animationDelay: `${pIdx * 0.1}s` }}
                                            >
                                                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-2">
                                                    <h3 className="h4 fw-bold text-info mb-0 d-flex align-items-center gap-2">
                                                        {proj.name}
                                                        {proj.projectLink && (
                                                            <a href={proj.projectLink} target="_blank" rel="noopener noreferrer" className="text-info opacity-75 hover-opacity-100">
                                                                <FaExternalLinkAlt size={16} />
                                                            </a>
                                                        )}
                                                    </h3>
                                                    <span className="badge bg-light text-dark rounded-pill px-3 py-2 mt-2 mt-md-0">{proj.period}</span>
                                                </div>
                                                <h4 className="h6 text-secondary mb-3">Frontend Developer {proj.name?.includes("Lead") ? "(Lead)" : ""}</h4>
                                                <p className="mb-2 opacity-75">{proj.desc}</p>
                                                {(proj.skills || exp.skills) && (
                                                    <div className="mb-0">
                                                        {(proj.skills || exp.skills)?.map(skill => (
                                                            <Badge bg="secondary" className="me-1 mb-1" key={skill}>{skill}</Badge>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        !isNeosoft && (
                                            <div
                                                className="glass-card mb-4 position-relative animate__animated animate__fadeInUp"
                                                style={{ animationDelay: `${index * 0.1}s` }}
                                            >
                                                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-2">
                                                    <h3 className="h4 fw-bold text-info mb-0 d-flex align-items-center gap-2">
                                                        {exp.company}
                                                        {exp.projectLink && (
                                                            <a href={exp.projectLink} target="_blank" rel="noopener noreferrer" className="text-info opacity-75 hover-opacity-100">
                                                                <FaExternalLinkAlt size={16} />
                                                            </a>
                                                        )}
                                                    </h3>
                                                    <span className="badge bg-light text-dark rounded-pill px-3 py-2 mt-2 mt-md-0">{exp.period}</span>
                                                </div>
                                                <h4 className="h6 text-secondary mb-3">{exp.role}</h4>
                                                <p className="mb-2 opacity-75">{exp.desc}</p>
                                                {exp.skills && (
                                                    <div className="mb-0">
                                                        {exp.skills.map(skill => (
                                                            <Badge bg="secondary" className="me-1 mb-1" key={skill}>{skill}</Badge>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            );
                        })}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Experience;
