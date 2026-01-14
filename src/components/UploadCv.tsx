import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { FaCloudUploadAlt, FaLock, FaGithub, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const GITHUB_OWNER = 'ravish110';
const GITHUB_REPO = 'my-portfolio';
const RESUME_PATH = 'src/assets/resume.pdf';

const UploadCv = () => {
    const navigate = useNavigate();
    const [pin, setPin] = useState('');
    const [isAuthed, setIsAuthed] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<{ type: 'success' | 'danger' | 'info' | null, message: string }>({ type: null, message: '' });
    const [loading, setLoading] = useState(false);

    // Get token from env or local storage for testing
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    const handleAuth = (e: React.FormEvent) => {
        e.preventDefault();
        // Simplified auth for demonstration. In real app, check against env or backend.
        if (pin === (import.meta.env.VITE_UPLOAD_PIN || '1214')) {
            setIsAuthed(true);
            setStatus({ type: null, message: '' });
        } else {
            setStatus({ type: 'danger', message: 'Invalid PIN' });
        }
    };

    const handleFileUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !token) {
            setStatus({ type: 'danger', message: !token ? 'GitHub Token missing in environment.' : 'Please select a file.' });
            return;
        }

        setLoading(true);
        setStatus({ type: 'info', message: 'Uploading to GitHub...' });

        try {
            // 1. Get current file data to get SHA (required by GitHub API for updates)
            const getFileRes = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${RESUME_PATH}`, {
                headers: { Authorization: `token ${token}` }
            });
            const fileData = await getFileRes.json();
            const sha = fileData.sha;

            // 2. Convert file to base64
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async () => {
                const base64Content = (reader.result as string).split(',')[1];

                // 3. Update file on GitHub
                const updateRes = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${RESUME_PATH}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `token ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: 'Update resume.pdf via Portfolio Upload',
                        content: base64Content,
                        sha: sha
                    })
                });

                if (updateRes.ok) {
                    setStatus({ type: 'success', message: 'CV Updated Successfully! The live site will rebuild and sync shortly. Redirecting to home...' });
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                } else {
                    const error = await updateRes.json();
                    setStatus({ type: 'danger', message: `Upload failed: ${error.message}` });
                }
                setLoading(false);
            };
        } catch (error: any) {
            setStatus({ type: 'danger', message: `Error: ${error.message}` });
            setLoading(false);
        }
    };

    if (!isAuthed) {
        return (
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
                <Card className="glass-card p-4 text-center animate__animated animate__fadeIn" style={{ maxWidth: '400px' }}>
                    <FaLock size={50} className="text-info mb-4" />
                    <h2 className="fw-bold mb-4">Secure Access</h2>
                    <Form onSubmit={handleAuth}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="password"
                                placeholder="Enter Access PIN"
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                                className="text-center rounded-pill"
                            />
                        </Form.Group>
                        {status.type === 'danger' && <div className="text-danger small mb-3">{status.message}</div>}
                        <Button variant="info" type="submit" className="w-100 rounded-pill fw-bold text-white shadow-lg">
                            Unlock Upload
                        </Button>
                    </Form>
                </Card>
            </Container>
        );
    }

    return (
        <Container className="py-5 mt-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="glass-card p-5 animate__animated animate__zoomIn">
                        <div className="text-center mb-4">
                            <FaCloudUploadAlt size={60} className="text-info mb-3" />
                            <h2 className="fw-bold">Upload Latest CV</h2>
                            <p className="text-secondary">Directly sync your resume.pdf with the live website.</p>
                        </div>

                        {status.type && (
                            <Alert variant={status.type} className="animate__animated animate__fadeIn d-flex align-items-center gap-2">
                                {status.type === 'success' ? <FaCheckCircle /> : status.type === 'info' ? <FaGithub /> : <FaExclamationTriangle />}
                                {status.message}
                            </Alert>
                        )}

                        <Form onSubmit={handleFileUpload}>
                            <div className="upload-dropzone position-relative border border-2 border-dashed border-info rounded-4 p-5 text-center mb-4 transition-all">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                                    className="position-absolute opacity-0 cursor-pointer"
                                    style={{ width: '100%', left: 0, top: 0, height: '100%', zIndex: 1 }}
                                />
                                <FaCloudUploadAlt size={40} className="text-info opacity-50 mb-2" />
                                <p className="mb-0 fw-bold">{file ? file.name : "Click or Drag PDF here"}</p>
                                {file && <small className="text-info">{(file.size / 1024).toFixed(1)} KB</small>}
                            </div>

                            <Button
                                variant="info"
                                type="submit"
                                className="w-100 py-3 rounded-pill fw-bold text-white shadow-lg"
                                disabled={loading || !file}
                            >
                                {loading ? 'Processing Sync...' : 'Sync Live Site'}
                            </Button>

                            <p className="small text-center mt-3 text-secondary">
                                <FaGithub className="me-1" /> This will commit directly to your GitHub repo.
                            </p>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UploadCv;
