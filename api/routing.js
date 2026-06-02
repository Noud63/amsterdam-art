

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userLat, userLng, venueLat, venueLng, venueName } = req.body;

  // API key is now in server environment variable (not exposed)
  const apiKey = process.env.GRAPHHOPPER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  // Call GraphHopper from backend (in production, the api key is hidden)
  const url = `https://graphhopper.com/api/1/route?point=${userLat},${userLng}&point=${venueLat},${venueLng}&vehicle=foot&locale=en&points_encoded=false&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    
    return res.status(200).json({...data, venueName });
  } catch (error) {
    return res.status(500).json({ error: 'Routing failed' });
  }
}