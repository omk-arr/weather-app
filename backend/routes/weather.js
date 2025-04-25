// backend/routes/weather.js
const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

const API_KEY = process.env.VISUAL_CROSSING_API_KEY;

router.get('/', async (req, res) => {
  const { loc, unit } = req.query;
  const unitGroup = unit === '°F' ? 'us' : 'metric';

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}?key=${API_KEY}&unitGroup=${unitGroup}`;

  try {
    const apiRes = await fetch(url);
    const data = await apiRes.json();
    res.json(data);
  } catch (err) {
    console.error('Error fetching weather:', err);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

module.exports = router;
