import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Container className="py-5">
          <Experience />
          <Projects />
          <Contact />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
