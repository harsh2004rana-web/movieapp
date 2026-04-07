import React from "react";
import "./About.css";

export default function About() {
    return (
        <div className="about">
            <div className="about-container">
                <h1>About MovieFlix 🎬</h1>

                <p>
                    MovieFlix is a Netflix-style movie app where you can search movies,
                    watch trailers, and manage your personal lists.
                </p>

                <h2>✨ Features</h2>
                <ul>
                    <li>🔍 Search movies</li>
                    <li>🎬 Watch trailers</li>
                    <li>❤️ Add to favourites</li>
                    <li>📺 Mark as watched</li>
                </ul>

                <h2>⚙️ Tech Stack</h2>
                <ul>
                    <li>React.js</li>
                    <li>TMDB API</li>
                    <li>React Router</li>
                </ul>
            </div>
        </div>
    );
}