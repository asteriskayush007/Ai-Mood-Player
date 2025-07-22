require('dotenv').config();
const express = require('express');
const songRoutes = require('./routes/song.routes');
const cors = require('cors');

const app = express();

// ✅ Yeh change kar — trailing slash mat de 'origin' me
const allowedOrigins = ['https://starlit-liger-c736f1.netlify.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

// ✅ Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use('/', songRoutes);

// ✅ Error handler for CORS/debugging
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({ error: err.message });
});

module.exports = app;
