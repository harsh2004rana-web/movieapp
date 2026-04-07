import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import "./Search.css";

import Row from "./components/Row";
import Footer from "./components/Footer";
import requests from "./Requests";

const API_KEY = "bf104ede938ffce9643cfc6e25cf3df3";

export default function Search({ setFavourites, setWatched }) {
    const [banners, setBanners] = useState([]);
    const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
    const [videoKey, setVideoKey] = useState(null);

    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        fetchBanners();
    }, []);

    // Auto-slide every 10 seconds
    useEffect(() => {
        if (banners.length === 0) return;
        const interval = setInterval(() => {
            setCurrentBannerIndex((prev) => (prev + 1) % banners.length);
        }, 10000);
        return () => clearInterval(interval);
    }, [banners]);

    const fetchBanners = async () => {
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
            );
            const data = await res.json();

            if (data.results && data.results.length > 0) {
                setBanners(data.results.slice(0, 5));
            }
        } catch (err) {
            console.error("Error fetching banners:", err);
        }
    };

    const searchMovies = async () => {
        if (!query.trim()) return;
        try {
            setIsSearching(true);
            const res = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
            );
            const data = await res.json();
            setSearchResults(data.results || []);
        } catch (err) {
            console.error(err);
        }
    };

    const playTrailer = async (id) => {
        try {
            const res = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
            );
            const data = await res.json();
            const trailer = data.results?.find(
                (v) => v.type === "Trailer" && v.site === "YouTube"
            );
            if (trailer) setVideoKey(trailer.key);
            else alert("No trailer found");
        } catch (err) {
            console.error(err);
        }
    };

    const currentBanner = banners[currentBannerIndex];

    // Build clean image URL (handles leading / in backdrop_path)
    const getBackdropUrl = (backdropPath) => {
        if (!backdropPath) return "";
        const path = backdropPath.startsWith("/") ? backdropPath : `/${backdropPath}`;
        return `https://image.tmdb.org/t/p/original${path}`;
    };

    return (
        <div className="home">
            {/* Search Bar */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search movies..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && searchMovies()}
                />
                <button onClick={searchMovies}>Search</button>
            </div>

            {isSearching ? (
                <div className="row">
                    <h2>Search Results</h2>
                    <div className="row-posters">
                        {searchResults.length > 0 ? (
                            searchResults.map((movie) => (
                                <img
                                    key={movie.id}
                                    className="poster"
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path || ""}`}
                                    alt={movie.title}
                                    onClick={() => playTrailer(movie.id)}
                                />
                            ))
                        ) : (
                            <p>No movies found</p>
                        )}
                    </div>
                    <button onClick={() => setIsSearching(false)}>⬅ Back</button>
                </div>
            ) : (
                <>
                    {/* FIXED BANNER SLIDER */}
                    {currentBanner && currentBanner.backdrop_path && (
                        <div
                            className="banner"
                            style={{
                                backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.85)), url('${getBackdropUrl(currentBanner.backdrop_path)}')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center center",
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            <div className="banner-content">
                                <span className="trending-tag">TRENDING NOW</span>
                                <h1>{currentBanner.title}</h1>
                                <p className="banner-overview">
                                    {currentBanner.overview
                                        ? currentBanner.overview.slice(0, 160) + "..."
                                        : "No overview available."}
                                </p>
                                <button
                                    className="banner-play-btn"
                                    onClick={() => playTrailer(currentBanner.id)}
                                >
                                    ▶ Play Trailer
                                </button>
                            </div>

                            {/* Dots */}
                            <div className="banner-dots">
                                {banners.map((_, idx) => (
                                    <span
                                        key={idx}
                                        className={`dot ${idx === currentBannerIndex ? "active" : ""}`}
                                        onClick={() => setCurrentBannerIndex(idx)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Movie Rows */}
                    <Row title="Trending 🔥" fetchUrl={requests.trending} playTrailer={playTrailer} />
                    <Row title="Top Rated ⭐" fetchUrl={requests.topRated} playTrailer={playTrailer} />
                    <Row title="Action 💥" fetchUrl={requests.action} playTrailer={playTrailer} />
                    <Row title="Comedy 😂" fetchUrl={requests.comedy} playTrailer={playTrailer} />
                    <Row title="Horror 👻" fetchUrl={requests.horror} playTrailer={playTrailer} />
                    <Row title="Romance ❤️" fetchUrl={requests.romance} playTrailer={playTrailer} />
                </>
            )}

            {/* Trailer Modal */}
            {videoKey && (
                <div className="popup">
                    <button onClick={() => setVideoKey(null)}>❌</button>
                    <YouTube
                        videoId={videoKey}
                        opts={{ width: "100%", height: "500", playerVars: { autoplay: 1 } }}
                    />
                </div>
            )}

            <Footer />
        </div>
    );
}