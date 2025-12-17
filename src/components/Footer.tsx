import { Container } from 'react-bootstrap';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="py-4 glass-nav mt-auto">
            <Container className="text-center">
                <div className="mb-3">
                    <a href="#" className="text-white mx-3 hover-text-info"><FaGithub size={24} /></a>
                    <a href="#" className="text-white mx-3 hover-text-info"><FaLinkedin size={24} /></a>
                    <a href="#" className="text-white mx-3 hover-text-info"><FaTwitter size={24} /></a>
                </div>
                <p className="mb-0 text-white-50 small">
                    &copy; {new Date().getFullYear()} Ravish Abbas. All Rights Reserved.
                </p>
            </Container>
        </footer>
    );
};

export default Footer;
