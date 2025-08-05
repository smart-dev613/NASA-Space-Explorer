const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// NASA API base URL and API key
const NASA_API_BASE = 'https://api.nasa.gov';
const NASA_API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

// Routes

// Get Astronomy Picture of the Day
app.get('/api/apod', async (req, res) => {
  try {
    const { date, count } = req.query;
    let url = `${NASA_API_BASE}/planetary/apod?api_key=${NASA_API_KEY}`;
    
    if (date) {
      url += `&date=${date}`;
    }
    if (count) {
      url += `&count=${count}`;
    }
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching APOD:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch Astronomy Picture of the Day',
      details: error.response?.data || error.message 
    });
  }
});

// Get Mars Rover Photos
app.get('/api/mars-photos', async (req, res) => {
  try {
    const { rover = 'curiosity', sol = '1000', camera, page = 1 } = req.query;
    let url = `${NASA_API_BASE}/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=${page}&api_key=${NASA_API_KEY}`;
    
    if (camera) {
      url += `&camera=${camera}`;
    }
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Mars photos:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch Mars rover photos',
      details: error.response?.data || error.message 
    });
  }
});

// Get Near Earth Objects
app.get('/api/neo', async (req, res) => {
  try {
    const { start_date, end_date } = req.query;
    let url = `${NASA_API_BASE}/neo/rest/v1/feed?api_key=${NASA_API_KEY}`;
    
    if (start_date) {
      url += `&start_date=${start_date}`;
    }
    if (end_date) {
      url += `&end_date=${end_date}`;
    }
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching NEO data:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch Near Earth Objects data',
      details: error.response?.data || error.message 
    });
  }
});

// Get EPIC Earth Images
app.get('/api/epic', async (req, res) => {
  try {
    const { date } = req.query;
    let url = `${NASA_API_BASE}/EPIC/api/natural`;
    
    if (date) {
      url += `/date/${date}`;
    }
    
    url += `?api_key=${NASA_API_KEY}`;
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching EPIC data:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch EPIC Earth images',
      details: error.response?.data || error.message 
    });
  }
});

// Get NASA Image and Video Library search
app.get('/api/search', async (req, res) => {
  try {
    const { q, media_type = 'image', page = 1 } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query (q) is required' });
    }
    
    const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(q)}&media_type=${media_type}&page=${page}`;
    
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error searching NASA library:', error.message);
    res.status(500).json({ 
      error: 'Failed to search NASA Image and Video Library',
      details: error.response?.data || error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'NASA API Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Using NASA API key: ${NASA_API_KEY === 'DEMO_KEY' ? 'DEMO_KEY (limited)' : 'Custom API key'}`);
});

module.exports = app;

