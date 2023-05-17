import React from 'react';
import {EyeOutlined, HeartFilled} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import "../MovieList/MovieList.css";
import "./MovieItem.css";

const MovieItem = ({movie}) => {
    const navigate = useNavigate();

    const handleWatch = (id) => {
        navigate(`/movies/${id}`);
        window.scrollTo(0,0);
    }

    return (
        <div id="movie-item">
            <img className="poster" src={`https://image.tmdb.org/t/p/w780/${movie?.poster_path}`} alt=""/>
            <p className="title">{movie.title}</p>
            <p className="year">{movie.release_date?.substring(0, 4)}</p>
            <div className="details">
                <div className="flex">
                    <img src="https://cdn-icons-png.flaticon.com/512/5977/5977585.png" alt=""/>
                    <span className="rating">{movie?.vote_average}</span>
                </div>
                <div className="flex">
                    <EyeOutlined onClick={() => handleWatch(movie.id)} className="icon" />
                    <HeartFilled className="icon"/>
                </div>
            </div>
        </div>
    );
};

export default MovieItem;