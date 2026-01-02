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

    const { subscription, title, body, delay } = req.body;

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
        // If a delay is provided, we use a simple setTimeout in the serverless function
        // Note: Vercel functions have a timeout (usually 10-60s), so long delays (minutes) 
        // won't work this way. But for short demos it's fine.
        // Real-world would use a database + cron or a proper queue.

        if (delay && delay > 0) {
            // Vercel Hobby tier has a 10-60s limit. We cap wait time at 25s for reliability.
            const waitTime = Math.min(delay, 25000);
            console.log(`Scheduling notification (capped at 25s): ${waitTime}ms`);

            await new Promise(resolve => setTimeout(resolve, waitTime));
        }

        await webpush.sendNotification(subscription, notificationPayload);
        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ error: 'Failed to send notification' });
    }
}
