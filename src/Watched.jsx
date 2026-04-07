import React from "react";

export default function Watched({ movies = [] }) {
    return (
        <div className="row">
            <h2>🎬 Watched</h2>

            <div className="row-posters">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <img
                            key={movie.id}
                            className="poster"
                            src={
                                movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : "https://via.placeholder.com/300x450?text=No+Image"
                            }
                            alt={movie.title}
                        />
                    ))
                ) : (
                    <p style={{ color: "white" }}>No watched movies yet</p>
                )}
            </div>
        </div>
    );
}