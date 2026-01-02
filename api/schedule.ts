import { Client } from "@upstash/qstash";
import type { VercelRequest, VercelResponse } from '@vercel/node';

const client = new Client({
    token: "eyJVc2VySUQiOiI2OTYzYWM1Yi05N2VkLTRjMDMtODJlMS1iMTMzMTg1Yjk3MDkiLCJQYXNzd29yZCI6ImRmMTMxODkyYWVhMTQ3MzQ5NTZmMTEwNzk1ZmQ0MDJhIn0=",
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { subscription, title, body, delay } = req.body;

    if (!subscription || !title || !body) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // Determine the base URL for the push endpoint
        // On Vercel, VERCEL_PROJECT_PRODUCTION_URL or VERCEL_URL is preferred
        const host = req.headers.host;
        const protocol = host?.includes('localhost') ? 'http' : 'https';
        const callbackUrl = `${protocol}://${host}/api/push`;

        console.log(`Scheduling via QStash to: ${callbackUrl} with delay: ${delay}ms`);

        // Publish to QStash
        await client.publishJSON({
            url: callbackUrl,
            body: { subscription, title, body },
            delay: Math.floor(delay / 1000), // QStash delay is in seconds
        });

        res.status(200).json({ success: true, message: 'Scheduled via QStash' });
    } catch (error) {
        console.error('QStash scheduling error:', error);
        res.status(500).json({ error: 'Failed to schedule notification' });
    }
}
