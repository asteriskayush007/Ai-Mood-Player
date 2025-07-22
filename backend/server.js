require('dotenv').config();
const app = require('./src/app');
const cors = require('cors');
const connectDB = require('./src/db/db');

app.use(cors());

app.get('/', (req, res) => {
  res.send({
    activeStatus: true,
    error: false,
  });
});

// ✅ Add try-catch to catch DB errors and log properly
(async () => {
  try {
    await connectDB(); // connect to MongoDB
    app.listen(3000, () => {
      console.log("🚀 Server is running on port 3000");
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
  }
})();
