require("dotenv").config();
const mongoose = require("mongoose");
const ImageKit = require("imagekit");
const songModel = require("./src/models/song.model");

// 🔹 MongoDB connect
async function connectDB() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("✅ MongoDB connected for sync");
}

// 🔹 ImageKit init (same keys jo tum use kar rahe ho)
const imagekit = new ImageKit({
  publicKey: process.env.ImageKit_PublicKey,
  privateKey: process.env.ImageKit_PrivateKey,
  urlEndpoint: process.env.ImageKit_UrlEndpoint,
});

async function syncSongsFromImageKit() {
  try {
    await connectDB();

    // 🔹 ImageKit se files lao
    const files = await imagekit.listFiles({
      path: "Ai_Face_audio",
      limit: 100, // agar zyada ho to badha sakte ho
    });

    console.log(`🎵 Found ${files.length} files in ImageKit`);

    for (let file of files) {
      // 🔴 Duplicate check (same audio URL already DB me na ho)
      const exists = await songModel.findOne({ audio: file.url });
      if (exists) {
        console.log("⏭️ Skipping existing:", file.name);
        continue;
      }

      await songModel.create({
        title: "Unknown Song",
        artist: "Unknown Artist",
        audio: file.url,
        mood: "neutral", // default mood
      });

      console.log("✅ Added:", file.name);
    }

    console.log("🎉 ImageKit → MongoDB sync complete");
    process.exit(0);

  } catch (err) {
    console.error("❌ Sync failed:", err);
    process.exit(1);
  }
}

syncSongsFromImageKit();
