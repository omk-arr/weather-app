// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const weatherRoute = require('./routes/weather');

app.use(cors());
app.use(express.json());

app.use('/api/weather', weatherRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
