import { Container, Row, Col, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { FaCode, FaTools, FaLaptopCode, FaRocket } from 'react-icons/fa';

const categoryIcons: { [key: string]: any } = {
    "Frameworks & Libraries": <FaLaptopCode className="text-info mb-3" size={30} />,
    "Styling & UI": <FaCode className="text-info mb-3" size={30} />,
    "Data Visualization": <FaRocket className="text-info mb-3" size={30} />,
    "Tools & Others": <FaTools className="text-info mb-3" size={30} />
};

const Skills = () => {
    const skillCategories = useSelector((state: RootState) => state.portfolio.skills);

    return (
        <section id="skills" className="py-5">
            <Container>
                <h2 className="section-title animate__animated animate__fadeInUp">Technical Skills</h2>
                <Row className="justify-content-center">
                    {skillCategories.map((category, index) => (
                        <Col md={6} lg={3} key={index} className="mb-4">
                            <div
                                className="glass-card h-100 text-center animate__animated animate__fadeInUp"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {categoryIcons[category.title] || <FaCode className="text-info mb-3" size={30} />}
                                <h3 className="h5 fw-bold mb-3">{category.title}</h3>
                                <div className="d-flex flex-wrap justify-content-center gap-2">
                                    {category.skills.map(skill => (
                                        <Badge bg="info" className="text-dark bg-opacity-75" key={skill}>
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default Skills;
