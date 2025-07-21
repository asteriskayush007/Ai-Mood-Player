require('dotenv').config();
const express = require('express');
const songRoutes = require('./routes/song.routes');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'https://starlit-liger-c736f1.netlify.app/'
}));
app.use(express.json());

app.use('/', songRoutes);

module.exports = app;
