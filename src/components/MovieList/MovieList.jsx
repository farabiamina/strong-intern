import React from 'react';
import "./MovieList.css";
import MovieItem from "../MovieItem/MovieItem";

const MovieList = ({movies, background, name}) => {
    return (
        <div id="movie-list">
            <div className={background ? "main back" : "main"}>
                <h3>{name}</h3>
                <div className="scroll">
                    {
                        movies.map((movie) => (
                            <MovieItem key={movie.id} movie={movie}/>
                        ))
                    }
                </div>
            </div>

        </div>
    );
};

export default MovieList;