const express = require('express');
const multer = require('multer');
const uploadFile = require('../service/storage.service');
const router = express.Router();
const songModel = require("../models/song.model");

const upload = multer({ storage: multer.memoryStorage() });

// POST: Upload a song
router.post('/songs', upload.single("audio"), async (req, res) => {
    try {
        console.log("🎵 Incoming song:", req.body);
        console.log("📦 File:", req.file);

        if (!req.file || !req.body.title || !req.body.artist || !req.body.mood) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const fileData = await uploadFile(req.file);

        const song = await songModel.create({
            title: req.body.title,
            artist: req.body.artist,
            audio: fileData.url,
            mood: req.body.mood
        });

        res.status(201).json({
            message: '✅ Song created successfully',
            song: song
        });

    } catch (err) {
        console.error("❌ Error in POST /songs:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

// GET: Get songs by mood
router.get('/songs', async (req, res) => {
    try {
        const { mood } = req.query;

        if (!mood) {
            return res.status(400).json({ message: "❗ Mood query parameter is required" });
        }

        console.log("🔍 Fetching songs for mood:", mood);

        const songs = await songModel.find({
            mood: { $regex: new RegExp(mood, 'i') }  // Case insensitive
        });

        res.status(200).json({
            message: "✅ Songs fetched successfully",
            songs
        });

    } catch (err) {
        console.error("❌ Error in GET /songs:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

module.exports = router;
