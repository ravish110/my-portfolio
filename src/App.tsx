import { Container } from 'react-bootstrap';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import NotificationSection from './components/NotificationSection';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Container className="py-5">
          <Skills />
          <Experience />
          <NotificationSection />
          <Contact />
        </Container>
      </main>
      <Footer />
    </>
  )
}

export default App
