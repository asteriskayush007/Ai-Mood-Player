require('dotenv').config();

const app = require('./src/app'); // ✅ Express app
const connectDB = require('./src/db/db');

// ❌ Do not repeat `cors()` here if already in app.js

// ✅ Health check route — good!
app.get('/', (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});

// ✅ Connect to MongoDB
connectDB();

// ✅ Start the server on dynamic port for Vercel (IMPORTANT!)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
