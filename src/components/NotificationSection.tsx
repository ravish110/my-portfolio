import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const NotificationSection: React.FC = () => {
    const [scheduledTime, setScheduledTime] = useState<string>('');
    const [scheduledDate, setScheduledDate] = useState<string>('');
    const [reminderText, setReminderText] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    const [isStandalone, setIsStandalone] = useState<boolean>(false);
    const [debugInfo, setDebugInfo] = useState<string>('');

    useEffect(() => {
        // Check if the app is running in standalone mode (installed as PWA)
        const checkStandalone = () => {
            const isStandaloneMode = (window.navigator as any).standalone === true || window.matchMedia('(display-mode: standalone)').matches;
            setIsStandalone(isStandaloneMode);

            const info = [
                `Standalone: ${isStandaloneMode}`,
                `Notification Support: ${'Notification' in window}`,
                `Permission: ${'Notification' in window ? Notification.permission : 'N/A'}`,
                `ServiceWorker: ${'serviceWorker' in navigator}`
            ].join(' | ');
            setDebugInfo(info);
        };

        checkStandalone();

        // Listen for changes in standalone mode (though rare mid-session)
        const mql = window.matchMedia('(display-mode: standalone)');
        mql.addEventListener('change', checkStandalone);
        return () => mql.removeEventListener('change', checkStandalone);
    }, []);

    const scheduleNotification = async () => {
        if (!scheduledDate || !scheduledTime || !reminderText.trim()) {
            alert('Please select date, time and enter reminder text');
            return;
        }

        // On iOS, we MUST request permission during a user gesture (like this click)
        if ('Notification' in window && Notification.permission !== 'granted') {
            try {
                const permission = await Notification.requestPermission();
                if (permission !== 'granted') {
                    alert('Notification permission is required for reminders to work.');
                    return;
                }
            } catch (err) {
                console.error('Error requesting permission:', err);
            }
        }

        const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
        if (isIOS && !isStandalone) {
            alert('Notice: On iPhone, system notifications only appear when using the app from your HOME SCREEN.');
            // We continue, but it might only show as an alert later
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

        // Diagnostic alert to verify timing
        console.log(`Scheduling notification in ${delay}ms`);
        if (isIOS) {
            alert(`Debug: Waiting ${Math.round(delay / 1000)} seconds... Keep app open or recently backgrounded.`);
        }

        setTimeout(() => {
            console.log('Timeout fired, calling showNotification');
            showNotification(reminderText);
        }, delay);
    };

    const showNotification = async (text: string) => {
        console.log('Attempting to show notification:', text);

        if (!('Notification' in window)) {
            alert(`Reminder: ${text}`);
            return;
        }

        if (Notification.permission === 'granted') {
            let notificationShown = false;

            // Try Service Worker first (best for background/tray)
            if ('serviceWorker' in navigator) {
                try {
                    // Timeout the service worker ready check
                    const registration = await Promise.any([
                        navigator.serviceWorker.ready,
                        new Promise((_, reject) => setTimeout(() => reject('SW timeout'), 2000))
                    ]) as ServiceWorkerRegistration;

                    await registration.showNotification('Portfolio Reminder', {
                        body: text,
                        icon: '/pwa-192x192.png',
                        badge: '/pwa-192x192.png',
                        vibrate: [200, 100, 200]
                    } as any);
                    notificationShown = true;
                    console.log('Notification shown via SW');
                } catch (err) {
                    console.error('Service worker notification failed:', err);
                }
            }

            // Fallback to legacy Notification if SW failed or not available
            if (!notificationShown) {
                try {
                    new Notification('Portfolio Reminder', {
                        body: text,
                        icon: '/pwa-192x192.png'
                    });
                    notificationShown = true;
                    console.log('Notification shown via legacy API');
                } catch (err) {
                    console.error('Legacy notification failed:', err);
                }
            }

            // Absolute fallback: Alert
            if (!notificationShown) {
                alert(`Reminder: ${text}`);
            }
        } else if (Notification.permission !== 'denied') {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                showNotification(text);
            } else {
                alert(`Reminder: ${text}`);
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
