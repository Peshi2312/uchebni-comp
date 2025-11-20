require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Endpoint to generate hints
app.post('/api/hint', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key is not configured' });
    }

    // Call OpenAI to generate a hint
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a Socratic tutor. Your goal is to help students learn by asking guiding questions or pointing to concepts to explore, NOT by revealing the answer.

IMPORTANT RULES:
- NEVER give the direct answer
- NEVER state the correct option if multiple choices are involved
- Instead, guide the student by:
  1. Asking them to think about a related concept
  2. Pointing to a principle or definition they should recall
  3. Suggesting they break down the problem into smaller parts
  4. Encouraging them to eliminate obviously wrong answers

- Keep hints SHORT (1-2 sentences max)
- Be encouraging and supportive
- Use simple language that a student can understand
- The hint should help the student arrive at the answer themselves`,
        },
        {
          role: 'user',
          content: `Question: ${question}\n\nGenerate a guiding hint in Bulgarian that helps the student think through this problem WITHOUT revealing the answer.`,
        },
      ],
      max_tokens: 120,
      temperature: 0.7,
    });

    const hint = completion.choices[0].message.content.trim();

    res.json({ hint });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to generate hint. Please try again.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('✅ Make sure OPENAI_API_KEY is set in .env file');
});
app.get('/', (req, res) => {
  res.json({ 
    message: 'SoftQuiz API Server',
    endpoints: {
      health: '/health',
      hint: 'POST /api/hint'
    }
  });
});
