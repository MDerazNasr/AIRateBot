require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize OpenAI client
const openaiConfig = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(openaiConfig);

// Health Check
app.get('/', (req, res) => {
  res.send("AI Reviews API is running.");
});

// Endpoint to handle complaint submissions
app.post('/complaint', async (req, res) => {
  const { name, email, complaint } = req.body;
  if (!name || !email || !complaint) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Insert the complaint into the Supabase "complaints" table
  const { data, error } = await supabase
    .from('complaints')
    .insert([{ name, email, complaint }]);
  
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  
  res.json({ message: 'Complaint submitted successfully', data });
});

// Endpoint to generate an AI review comment based on selected keywords
app.post('/generate-review', async (req, res) => {
  const { keywords } = req.body;
  if (!keywords || !Array.isArray(keywords)) {
    return res.status(400).json({ error: 'Keywords are required and should be an array' });
  }
  
  const prompt = `Generate a review comment based on the following keywords: ${keywords.join(', ')}.`;
  
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 60,
      temperature: 0.7,
    });
    
    const generatedComment = response.data.choices[0].text.trim();
    res.json({ comment: generatedComment });
  } catch (error) {
    res.status(500).json({ error: 'Error generating comment', details: error.message });
  }
});

// Optional endpoint: Redirect to Google Reviews
app.get('/redirect-google', (req, res) => {
  const googleReviewUrl = "https://www.google.com/search?q=your+business+name+google+reviews";
  res.redirect(googleReviewUrl);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
