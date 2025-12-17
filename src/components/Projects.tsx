import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { FaExternalLinkAlt } from 'react-icons/fa';

const projects = [
    {
        title: "Turtlemint",
        desc: "Insurance-based product pages using HTML5, CSS3, LESS and jQuery.",
        tags: ["HTML5", "CSS3", "jQuery", "LESS"],
        link: "#"
    },
    {
        title: "Mintpro",
        desc: "Agent/partner platform for selling insurance and mutual funds.",
        tags: ["AngularJS", "Bootstrap", "Responsive"],
        link: "#"
    },
    {
        title: "Electronics Bazaar",
        desc: "Online store for refurbished electronics based on PSD designs.",
        tags: ["HTML", "CSS", "Bootstrap", "PSD to HTML"],
        link: "#"
    },
    {
        title: "Bank One Mauritius",
        desc: "Website for River Village Resort with slider gallery and optimizations.",
        tags: ["Bootstrap", "Optimization", "Pixel Perfect"],
        link: "#"
    },
    {
        title: "Turtlemintmoney",
        desc: "Online mutual fund investment platform interacting with designers and backend.",
        tags: ["React.js", "Redux", "D3.js", "Typescript"],
        link: "#"
    },
    {
        title: "River Village Resort",
        desc: "Full responsive website development with heavy image optimization.",
        tags: ["Bootstrap", "Responsive", "Gallery"],
        link: "#"
    }
];

const Projects = () => {
    return (
        <section id="projects" className="py-5">
            <Container>
                <h2 className="section-title animate__animated animate__fadeInUp">My Projects</h2>
                <Row>
                    {projects.map((project, index) => (
                        <Col md={6} lg={4} key={index} className="mb-4">
                            <div
                                className="glass-card h-100 d-flex flex-column animate__animated animate__zoomIn"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="mb-3">
                                    <h3 className="h5 fw-bold">{project.title}</h3>
                                    <div className="mb-2">
                                        {project.tags.map(tag => (
                                            <Badge bg="info" className="me-1 mb-1 text-dark" key={tag}>{tag}</Badge>
                                        ))}
                                    </div>
                                </div>
                                <p className="opacity-75 flex-grow-1">{project.desc}</p>
                                <div className="mt-3">
                                    <Button variant="outline-info" size="sm" className="w-100 d-flex align-items-center justify-content-center gap-2">
                                        Visit Project <FaExternalLinkAlt size={12} />
                                    </Button>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default Projects;
