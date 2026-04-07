import React from "react";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Logo / Title */}
                <h2 className="footer-logo">🎬 MovieFlix</h2>

                {/* Links */}
                <div className="footer-links">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                    <a href="/favourites">Favourites</a>
                    <a href="/watched">Watched</a>
                </div>

                {/* Social Icons */}
                <div className="footer-socials">
                    <span>📘</span>
                    <span>📸</span>
                    <span>🐦</span>
                    <span>▶️</span>
                </div>

                {/* Bottom Text */}
                <p className="footer-text">
                    © {new Date().getFullYear()} MovieFlix. All rights reserved.
                </p>

            </div>
        </footer>
    );
}