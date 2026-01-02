import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const NotificationSection: React.FC = () => {
    const [scheduledTime, setScheduledTime] = useState<string>('');
    const [scheduledDate, setScheduledDate] = useState<string>('');
    const [reminderText, setReminderText] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    useEffect(() => {
        if ('Notification' in window) {
            if (Notification.permission === 'default') {
                Notification.requestPermission();
            }
        }
    }, []);

    const scheduleNotification = () => {
        if (!scheduledDate || !scheduledTime || !reminderText.trim()) {
            alert('Please select date, time and enter reminder text');
            return;
        }

        const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
        const now = new Date();

        if (scheduledDateTime <= now) {
            alert('Please select a future date and time');
            return;
        }

        const delay = scheduledDateTime.getTime() - now.getTime();

        const getOrdinalSuffix = (day: number) => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        const formatDateTime = (date: Date) => {
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'short' });
            const year = date.getFullYear();
            const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            return `${day}${getOrdinalSuffix(day)} ${month} ${year}, ${time}`;
        };

        setStatus(`Notification scheduled for ${formatDateTime(scheduledDateTime)}`);

        setTimeout(() => {
            showNotification(reminderText);
        }, delay);
    };

    const showNotification = (text: string) => {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Portfolio Reminder', {
                body: text,
                icon: '/pwa-192x192.png'
            });
        } else if ('Notification' in window && Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    showNotification(text);
                }
            });
        } else {
            alert(`Reminder: ${text}`);
        }
    };

    return (
        <section id="notifications" className="py-5">
            <Container>
                <Row className="justify-content-center">
                    <Col md={6}>
                        <Card className="shadow-lg border-0 rounded-4">
                            <Card.Body className="p-4">
                                <h2 className="text-center mb-4 fw-bold">Push Notifications</h2>
                                <p className="text-muted text-center mb-4">
                                    Set a reminder for yourself. Select a date and time to receive a notification.
                                </p>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Reminder Text</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="What should I remind you about?"
                                            value={reminderText}
                                            onChange={(e) => setReminderText(e.target.value)}
                                            className="form-control-lg"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Select Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={scheduledDate}
                                            onChange={(e) => setScheduledDate(e.target.value)}
                                            className="form-control-lg"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Form.Label>Select Time</Form.Label>
                                        <Form.Control
                                            type="time"
                                            value={scheduledTime}
                                            onChange={(e) => setScheduledTime(e.target.value)}
                                            className="form-control-lg"
                                        />
                                    </Form.Group>
                                    <div className="d-grid">
                                        <Button
                                            variant="dark"
                                            size="lg"
                                            onClick={scheduleNotification}
                                            className="rounded-pill"
                                        >
                                            Schedule Notification
                                        </Button>
                                    </div>
                                </Form>
                                {status && (
                                    <div className="mt-4 alert alert-info text-center border-0 rounded-3">
                                        {status}
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default NotificationSection;
