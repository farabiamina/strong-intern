import React, {useEffect, useRef, useState} from 'react';
import {Spin} from "antd";
import Carousel from "../../components/Carousel/Carousel";
import {
    useGetMovieCreditsQuery,
    useGetMovieDetailsQuery,
    useGetMovieVideosQuery, useGetSimilarMoviesQuery
} from "../../redux/movieDetail/movieApiSlice";
import {useNavigate, useParams} from "react-router-dom";
import "../../components/Carousel/Carousel.css";
import "./MoviePage.css";
import {PlayCircleTwoTone} from "@ant-design/icons";

const MoviePage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {data: movieData, isLoading, isSuccess} = useGetMovieDetailsQuery(id);
    const [movie, setMovie] = useState([]);
    const {data: movieCreditsData, isSuccess: isCreditsSuccess} = useGetMovieCreditsQuery(id);
    const [credits, setCredits] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const {data: videosData, isSuccess: isVideosSuccess} = useGetMovieVideosQuery(id);
    const [video, setVideo] = useState();
    const {data: similarMoviesData, isSuccess: isSimilarSuccess} = useGetSimilarMoviesQuery(id);
    const [similarMovies, setSimilarMovies] = useState([]);

    useEffect(() => {
        if (isSuccess) {
            setMovie([movieData]);
        }
    }, [movieData, isSuccess])

    useEffect(() => {
        if (isCreditsSuccess) {
            setCredits(movieCreditsData.cast.slice(0,10));
        }
    }, [movieCreditsData, isCreditsSuccess])

    useEffect(() => {
        if (isVideosSuccess) {
            const data = videosData.results;
            setVideo(data[0]);
        }
    }, [videosData, isVideosSuccess])

    useEffect(() => {
        if (isSimilarSuccess) {
            setSimilarMovies(similarMoviesData.results);
        }
    }, [similarMoviesData, isSimilarSuccess])

    const handleMore = () => {
        const movieDetails = document.querySelectorAll('section.movie-details .hidden');
        for (let d of movieDetails) {
            if (!showMore) {
                d.style.display = 'block';
            }
            else {
                d.style.display = 'none';
            }
        }
        setShowMore(!showMore);
    }

    const handleWatch = (id) => {
        navigate(`/movies/${id}`);
        window.scrollTo(0,0);
    }

    const handleVideo = (vId) => {
        navigate(`/movies/video/${vId}`);
    }

    return (
        <main id="main">
            <section>
                <Spin spinning={isLoading}>
                    <Carousel movies={movie} autoplay={false} />
                </Spin>
            </section>
            <section className="movie-details">
                <div className="container">
                    <div className="left">
                        <h3>Trailer</h3>
                        <div className="trailer">
                            <img className="iframe" src={`https://img.youtube.com/vi/${video?.key}/hqdefault.jpg`} alt="Video Preview" />
                            <PlayCircleTwoTone onClick={()=>handleVideo(video?.key)} className="play-button" twoToneColor={"#5436A9"} />
                        </div>
                    </div>
                    <div className="right">
                        <h3>Cast crew and info</h3>
                        <div className="cast">
                            {
                                credits?.map((cast, index) => {
                                    return (
                                        <div key={cast.id} className={index > 4 ? "cast-item hidden" : "cast-item"}>
                                            {cast?.profile_path !== null ?
                                                <img src={`https://image.tmdb.org/t/p/w780/${cast?.profile_path}`} alt=""/> :
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png" alt=""/>
                                            }
                                            <p className="name">{cast.name}</p>
                                            <p className="char">{cast.character}</p>
                                        </div>
                                    )})
                            }
                        </div>
                    </div>
                </div>
                <button onClick={handleMore}>{!showMore ? "Show more" : "Show less"}</button>
                <div className="similar">
                    <h3>More like this</h3>
                    <div className="similar-list">
                        {
                            similarMovies.map(movie => (
                                <div onClick={()=>handleWatch(movie.id)} className="movie-item">
                                    <img src={`https://image.tmdb.org/t/p/w780/${movie?.poster_path}`} alt=""/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>
        </main>
    );
};

export default MoviePage;