import { Container, Row, Col, Badge } from 'react-bootstrap';
import { FaExternalLinkAlt } from 'react-icons/fa';

const experiences = [
    {
        company: "Neosoft Technologies Pvt Ltd",
        role: "Sr. Frontend Developer",
        period: "Feb 2017 - Present",
        desc: "Leading frontend development for various high-impact client projects, specializing in React.js, Angular, and modern architecture.",
        skills: ["React.js", "Angular", "Redux", "TypeScript", "Architecture"],
        projects: [
            {
                name: "Infosys Aster Global CMO AI Hub",
                period: "Oct 2023 - Present",
                desc: "Developed frontend architecture using React.js and integrated AI-ML chatbots.",
                skills: ["React.js", "AI-ML Integration", "Architecture"]
            },
            {
                name: "Thomas Cook Pvt Ltd",
                period: "May 2023 - Sep 2023",
                desc: "Led development of a hotel booking portal and custom pricing calendars using React.js and Redux Toolkit.",
                skills: ["React.js", "Redux Toolkit", "Lead"]
            },
            {
                name: "Turtlemintmoney",
                period: "Jan 2021 - Aug 2023",
                desc: "Built mutual fund investment platforms using React, TypeScript, and D3.js.",
                projectLink: "https://www.turtlemintmoney.com",
                skills: ["React.js", "Redux", "D3.js", "TypeScript"]
            },
            {
                name: "Turtlemint",
                period: "Jan 2019 - Dec 2020",
                desc: "Developed insurance products using AngularJS, Angular 14, and Material Design.",
                projectLink: "https://www.turtlemint.com",
                skills: ["AngularJS", "Angular 14", "Material Design"]
            },
            {
                name: "Mintpro",
                period: "Jan 2018 - Dec 2018",
                desc: "Developed web pages for agent/partner platform selling insurance and mutual funds.",
                projectLink: "https://www.turtlemintpro.com",
                skills: ["AngularJS", "Bootstrap", "Responsive"]
            }
        ]
    },
    {
        company: "Infomatic service pvt ltd",
        role: "Frontend Developer",
        period: "Jan 2024 - Dec 2024",
        desc: "Designing adaptive layouts and intuitive UI elements. Leveraging Angular's HttpClient for API integration.",
        skills: ["Angular", "UI/UX", "API Integration"]
    },
    {
        company: "Eltizam Saudi CMS",
        role: "Frontend Developer",
        period: "Sep 2023 - Jan 2024",
        desc: "Designed and developed web pages using .NET framework ensuring seamless user experiences.",
        skills: [".NET", "Web Development"]
    },
    {
        company: "Electronics Bazaar",
        role: "Frontend Developer",
        period: "Sep 2016 - Dec 2017",
        desc: "Developed an e-commerce store for refurbished electronics from PSD designs.",
        skills: ["HTML", "CSS", "Bootstrap", "PSD to HTML"],
        projectLink: "https://www.electronicsbazaar.com"
    },
    {
        company: "Bank One",
        role: "Frontend Developer",
        period: "Jun 2017 - Aug 2017",
        desc: "Developed a website for Bank One Mauritius with responsive design and optimizations.",
        skills: ["Bootstrap", "Optimization", "Pixel Perfect"],
        projectLink: "https://www.bankone.mu"
    },
    {
        company: "River Village Resort",
        role: "Frontend Developer",
        period: "Feb 2017 - May 2017",
        desc: "Developed a website for River Village Resort using Bootstrap and slider gallery.",
        skills: ["Bootstrap", "Responsive", "Gallery"],
        projectLink: "http://www.rivervillageresort.in"
    }
];

const Experience = () => {
    return (
        <section id="experience" className="py-5">
            <Container>
                <h2 className="section-title animate__animated animate__fadeInUp">Work Experience</h2>
                <Row className="justify-content-center">
                    <Col lg={10}>
                        {/* Main Neosoft Heading */}
                        <div className="mb-5 animate__animated animate__fadeInUp text-center text-md-start px-4">
                            <h3 className="h3 fw-bold text-info mb-1">Neosoft Technologies Pvt Ltd</h3>
                            <div className="d-flex flex-wrap gap-3 align-items-center justify-content-center justify-content-md-start">
                                <span className="badge bg-light text-dark rounded-pill px-3 py-2">Feb 2017 - Present</span>
                                <span className="h5 mb-0 text-secondary">Sr. Frontend Developer</span>
                            </div>
                        </div>

                        {experiences.map((exp, index) => {
                            // If it's Neosoft, map its projects into separate cards
                            if (exp.company === "Neosoft Technologies Pvt Ltd" && exp.projects) {
                                return exp.projects.map((proj, pIdx) => (
                                    <div
                                        key={`neo-${pIdx}`}
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
                                        <h4 className="h6 text-secondary mb-3">Frontend Developer {proj.name.includes("Lead") ? "(Lead)" : ""}</h4>
                                        <p className="mb-2 opacity-75">{proj.desc}</p>
                                        {(proj.skills || exp.skills) && (
                                            <div className="mb-0">
                                                {(proj.skills || exp.skills).map(skill => (
                                                    <Badge bg="secondary" className="me-1 mb-1" key={skill}>{skill}</Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ));
                            }

                            // Otherwise, render regular experience cards (avoiding duplicate Neosoft entry if projects handled above)
                            if (exp.company === "Neosoft Technologies Pvt Ltd") return null;

                            return (
                                <div
                                    key={index}
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
                            );
                        })}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Experience;
