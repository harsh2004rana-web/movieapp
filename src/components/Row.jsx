import React, { useEffect, useState, useRef } from "react";
import "./Row.css";

export default function Row({ title, fetchUrl, playTrailer }) {
    const [movies, setMovies] = useState([]);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchData = async () => {
            try {
                const res = await fetch(fetchUrl);
                const data = await res.json();

                const uniqueMovies = data.results
                    ?.filter((m) => m.poster_path)
                    .filter(
                        (movie, index, self) =>
                            index === self.findIndex((m) => m.id === movie.id)
                    );

                setMovies(uniqueMovies || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [fetchUrl]);

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row-posters">
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        className="poster"
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                        onClick={() => playTrailer(movie.id)}
                    />
                ))}
            </div>
        </div>
    );
}