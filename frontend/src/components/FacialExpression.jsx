import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import "./facialExpression.css"
import axios from 'axios';

export default function FacialExpression({ setSongs }) {
    const videoRef = useRef();
    const [mood, setMood] = useState('');
    const [loading, setLoading] = useState(false);

    const loadModels = async () => {
        const MODEL_URL = '/models';
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };

    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((err) => console.error("Error accessing webcam: ", err));
    };

    async function detectMood() {
        setLoading(true);
        const detections = await faceapi
            .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
            .withFaceExpressions();

        let mostProbable = 0;
        let _expression = '';

        if (!detections || detections.length === 0) {
            setMood("No face detected");
            setLoading(false);
            return;
        }

        for (const expression of Object.keys(detections[0].expressions)) {
            if (detections[0].expressions[expression] > mostProbable) {
                mostProbable = detections[0].expressions[expression];
                _expression = expression;
            }
        }

        setMood(_expression.charAt(0).toUpperCase() + _expression.slice(1));

        try {
            const response = await axios.get(`http://localhost:3000/songs?mood=${_expression}`);
            setSongs(response.data.songs);
        } catch (err) {
            console.error("Error fetching songs: ", err);
        }

        setLoading(false);
    }

    useEffect(() => {
        loadModels().then(startVideo);
    }, []);

    return (
        <div className='mood-element'>
            <div className='video-container'>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className='user-video-feed'
                />
                <button onClick={detectMood} disabled={loading}>
                    {loading ? 'Detecting...' : 'Detect Mood'}
                </button>
                {mood && <div className="mood-output">Detected Mood: <strong>{mood}</strong></div>}
            </div>
        </div>
    );
}
