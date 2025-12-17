import { Container, Row, Col, Badge } from 'react-bootstrap';
import { FaCode, FaTools, FaLaptopCode, FaRocket } from 'react-icons/fa';

const skillCategories = [
    {
        title: "Frontend Core",
        icon: <FaCode className="text-info mb-3" size={30} />,
        skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "Responsive Web Design"]
    },
    {
        title: "Frameworks & Libraries",
        icon: <FaLaptopCode className="text-info mb-3" size={30} />,
        skills: ["React", "Angular", "jQuery", "Bootstrap", "Tailwind CSS", "Ant Design"]
    },
    {
        title: "State Management",
        icon: <FaRocket className="text-info mb-3" size={30} />,
        skills: ["Redux", "Redux Toolkit (RTK)"]
    },
    {
        title: "Tools & Integration",
        icon: <FaTools className="text-info mb-3" size={30} />,
        skills: ["Git", "Firebase", "Google Analytics (GA)", "Google Tag Manager", "Deployment", "SEO", "GenAI"]
    }
];

const Skills = () => {
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
                                {category.icon}
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
