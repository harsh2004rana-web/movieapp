import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
    const navigate = useNavigate();

    return (
        <div className="header">
            <h1 className="logo" onClick={() => navigate("/")}>
                🎬 MovieFlix
            </h1>

            <div className="nav-links">
                <button onClick={() => navigate("/")}>Home</button>
                <button onClick={() => navigate("/favourites")}>❤️ Favourites</button>
                <button onClick={() => navigate("/watched")}>🎬 Watched</button>
                <button onClick={() => navigate("/about")}>About</button>
            </div>
        </div>
    );
}