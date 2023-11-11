
export default async function handler(req, res) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APILINK}users?page=1&per_page=12`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
