export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  const { mode, recentActivities, stressLevel } = req.body;

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ error: 'GROQ_API_KEY is not configured in Vercel environment variables.' });
  }

  const prompt = `
    You are an AI assistant for university students. 
    The student is currently in "${mode}" mode (Focus or Balance).
    Their self-reported stress level is: ${stressLevel}/10.
    Recent activities: ${recentActivities.join(', ')}.
    
    Based on this, return a JSON object ONLY with the following structure:
    {
      "focusScore": (integer between 0 and 100),
      "balanceScore": (integer between 0 and 100),
      "recommendation": (A short 2-sentence piece of personalized advice)
    }
  `;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192', // Fast, free Groq model
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch from Groq');
    }

    const result = JSON.parse(data.choices[0].message.content);
    return res.status(200).json(result);

  } catch (error) {
    console.error('AI Meter Error:', error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
