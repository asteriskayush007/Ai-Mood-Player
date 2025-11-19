import { useState } from 'react';
import FacialExpression from "./components/FacialExpression.jsx";
import MoodSongs from "./components/MoodSongs";
import './App.css';

function App() {
const [Songs, setSongs] = useState([]);

return ( <div className="app">
{/* Hero Section */} <section className="hero"> <h1>AI Mood Music Player 🎧</h1> <p>
Get song recommendations based on your facial expressions using real-time AI. </p> </section>


  {/* Webcam + Song Section */}
  <div className="content-grid">
    <FacialExpression setSongs={setSongs} />
    <MoodSongs Songs={Songs} />
  </div>
</div>


);
}

export default App;
