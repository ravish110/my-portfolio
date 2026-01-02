import webpush from 'web-push';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// VAPID keys should ideally be in environment variables
// For this portfolio, we'll hardcode them from the generated keys
// PUBLIC_KEY and PRIVATE_KEY from vapid.json
const publicKey = 'BJZtTZmdQiRVGQVjKjFpdAZKUdCUJzzEoF3_YbnHqg4b18-b7I6usJds7OMQdXW_z8Y57FBfNNP-00-4v4aMMzk';
const privateKey = 'TPyf1UwJ4vLXzZMgjs2lnMXT6TCu4VSBY1Pndrb5ejY';

webpush.setVapidDetails(
    'mailto:your-email@example.com',
    publicKey,
    privateKey
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { subscription, title, body } = req.body;

    if (!subscription || !title || !body) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const notificationPayload = JSON.stringify({
        title,
        body,
        icon: '/pwa-192x192.png',
        badge: '/pwa-192x192.png'
    });

    try {
        console.log(`Push payload received from scheduler. Sending to push service...`);
        await webpush.sendNotification(subscription, notificationPayload);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ error: 'Failed to send notification' });
    }
}
