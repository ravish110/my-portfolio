import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import NotificationSection from './components/NotificationSection';
import Footer from './components/Footer';
import UploadCv from './components/UploadCv';
import { usePdfSync } from './hooks/usePdfSync';

const HomePage = () => (
  <main>
    <Hero />
    <Container className="py-5">
      <Skills />
      <Experience />
      <NotificationSection />
      <Contact />
    </Container>
  </main>
);

function App() {
  usePdfSync();

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/uploadCv" element={<UploadCv />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
