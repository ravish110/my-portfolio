import { Container, Row, Col } from 'react-bootstrap';

const experiences = [
    {
        company: "Neosoft Technologies Pvt Ltd",
        role: "Sr. Frontend Developer",
        period: "Feb 2017 - Present",
        desc: "Worked on client projects using HTML, CSS, JavaScript, AngularJS, Angular 14, ReactJS, Bootstrap, PrimeNG. Developed responsive UIs, integrated APIs, and collaborated with backend teams."
    },
    {
        company: "Infomatic service pvt ltd",
        role: "Frontend Developer",
        period: "Jan 2024 - Present",
        desc: "Designing adaptive layouts and intuitive UI elements. Leveraging Angular's HttpClient for API integration."
    },
    {
        company: "Eltizam Saudi CMS",
        role: "Frontend Developer",
        period: "Sep 2023 - Jan 2024",
        desc: "Designed and developed web pages using .NET framework ensuring seamless user experiences. Collaborated with backend team."
    },
    {
        company: "Turtlemintmoney",
        role: "Frontend Developer",
        period: "Jan 2021 - Aug 2023",
        desc: "UI implementation and JS interaction online mutual fund investment platform. Implemented features in Redux, built charts with d3.js."
    },
    {
        company: "Turtlemint",
        role: "Frontend Developer",
        period: "Jan 2019 - Dec 2020",
        desc: "Created web pages for insurance-based product using HTML5, CSS3 with LESS and jQuery. Worked on motor vertical using AngularJS."
    },
    {
        company: "Mintpro",
        role: "Frontend Developer",
        period: "Jan 2018 - Dec 2018",
        desc: "Developed web pages for agent/partner platform selling insurance and mutual funds. Ensured cross-device compatibility."
    },
    {
        company: "Electronics Bazaar",
        role: "Frontend Developer",
        period: "Sep 2017 - Dec 2017",
        desc: "Developed web pages for Electronics Bazaar based on PSD designs. Ensured cross-device compatibility."
    },
    {
        company: "Bank One",
        role: "Frontend Developer",
        period: "Jun 2017 - Aug 2017",
        desc: "Developed a website for River Village Resort using Bootstrap and slider gallery. Optimized heavy image files."
    },
    {
        company: "River Village Resort",
        role: "Frontend Developer",
        period: "Feb 2017 - May 2017",
        desc: "Developed a website for River Village Resort. Optimized heavy image files to reduce load time."
    }
];

const Experience = () => {
    return (
        <section id="experience" className="py-5">
            <Container>
                <h2 className="section-title animate__animated animate__fadeInUp">Work Experience</h2>
                <Row className="justify-content-center">
                    <Col lg={10}>
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className="glass-card mb-4 position-relative animate__animated animate__fadeInUp"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-2">
                                    <h3 className="h4 fw-bold text-info mb-0">{exp.company}</h3>
                                    <span className="badge bg-light text-dark rounded-pill px-3 py-2 mt-2 mt-md-0">{exp.period}</span>
                                </div>
                                {/* <h4 className="h6 text-secondary mb-3">{exp.role}</h4> */}
                                <p className="mb-0 opacity-75">{exp.desc}</p>
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Experience;
