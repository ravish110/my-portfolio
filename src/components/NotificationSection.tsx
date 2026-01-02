import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const NotificationSection: React.FC = () => {
    const [scheduledTime, setScheduledTime] = useState<string>('');
    const [scheduledDate, setScheduledDate] = useState<string>('');
    const [reminderText, setReminderText] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    const [isStandalone, setIsStandalone] = useState<boolean>(false);
    const [debugInfo, setDebugInfo] = useState<string>('');

    const VAPID_PUBLIC_KEY = 'BJZtTZmdQiRVGQVjKjFpdAZKUdCUJzzEoF3_YbnHqg4b18-b7I6usJds7OMQdXW_z8Y57FBfNNP-00-4v4aMMzk';

    const urlBase64ToUint8Array = (base64String: string) => {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };

    useEffect(() => {
        const checkStandalone = () => {
            const isStandaloneMode = (window.navigator as any).standalone === true || window.matchMedia('(display-mode: standalone)').matches;
            setIsStandalone(isStandaloneMode);

            const info = [
                `Standalone: ${isStandaloneMode}`,
                `Push Supported: ${'PushManager' in window}`,
                `Permission: ${'Notification' in window ? Notification.permission : 'N/A'}`,
                `SW: ${'serviceWorker' in navigator}`
            ].join(' | ');
            setDebugInfo(info);
        };

        checkStandalone();
        const mql = window.matchMedia('(display-mode: standalone)');
        mql.addEventListener('change', checkStandalone);
        return () => mql.removeEventListener('change', checkStandalone);
    }, []);

    const subscribeUser = async () => {
        if (!('serviceWorker' in navigator)) return null;

        try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
            });
            return subscription;
        } catch (err) {
            console.error('Failed to subscribe user:', err);
            return null;
        }
    };

    const scheduleNotification = async () => {
        if (!scheduledDate || !scheduledTime || !reminderText.trim()) {
            alert('Please select date, time and enter reminder text');
            return;
        }

        if ('Notification' in window && Notification.permission !== 'granted') {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                alert('Notification permission required for reminders.');
                return;
            }
        }

        const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
        if (isIOS && !isStandalone) {
            alert('Notice: On iPhone, notifications ONLY work if you have Added to Home Screen.');
        }

        const scheduledDateTime = new Date(`${scheduledDate}T${scheduledTime}`);
        const now = new Date();

        if (scheduledDateTime <= now) {
            alert('Please select a future date and time');
            return;
        }

        const delay = scheduledDateTime.getTime() - now.getTime();
        setStatus('Scheduling background notification...');

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

        const subscription = await subscribeUser();
        if (!subscription) {
            console.log('Push subscription failed, falling back to local timer');
            setTimeout(() => showNotification(reminderText), delay);
            setStatus(`Scheduled locally for ${formatDateTime(scheduledDateTime)} (won't work if app closed)`);
            return;
        }

        try {
            const response = await fetch('/api/push', {
                method: 'POST',
                body: JSON.stringify({
                    subscription,
                    title: 'Portfolio Reminder',
                    body: reminderText,
                    delay: delay < 10000 ? delay : 0 // Vercel timeout limitation: only short delays work in serverless without a DB
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.status === 'queued_attempt') {
                    setStatus(`Caution: Background delivery (app closed) is only reliable for short delays in this demo.`);
                } else {
                    setStatus(`Scheduled successfully for ${formatDateTime(scheduledDateTime)}! You can close the app now.`);
                }
            } else {
                throw new Error('Server error');
            }
        } catch (err) {
            console.error('Error scheduling push:', err);
            setTimeout(() => showNotification(reminderText), delay);
            setStatus(`Scheduled locally (Server-side failed)`);
        }
    };

    const showNotification = async (text: string) => {
        if (!('Notification' in window)) {
            alert(`Reminder: ${text}`);
            return;
        }

        if (Notification.permission === 'granted') {
            if ('serviceWorker' in navigator) {
                const registration = await navigator.serviceWorker.ready;
                registration.showNotification('Portfolio Reminder', {
                    body: text,
                    icon: '/pwa-192x192.png'
                } as any);
            } else {
                new Notification('Portfolio Reminder', { body: text });
            }
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

                                <div className="mt-4 p-2 bg-light rounded text-center" style={{ fontSize: '0.7rem', color: '#666' }}>
                                    <strong>Debug Info:</strong> {debugInfo}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default NotificationSection;
