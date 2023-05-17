import React, {useEffect, useState} from 'react';
import {CaretRightOutlined, PlusOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {selectGenres} from "../../redux/sessionSlice";
import {Carousel as AntCarousel, Modal, Slider} from "antd";
import "./Carousel.css";
import {useRateMovieMutation} from "../../redux/movieDetail/movieApiSlice";

const Carousel = ({movies, autoplay}) => {
    const genres = useSelector(selectGenres);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(10);
    const [rateMovie] = useRateMovieMutation();
    const [selectedMovieId, setSelectedMovieId] = useState();

    function getGenreNameById(id) {
        const genre = genres.find((genre) => genre.id === id);
        return genre?.name;
    }

    if (!movies) {
        return null; // or render a loading indicator
    }

    const handleRating = () => {
        // rateMovie({id: })
    }

    return (
        <AntCarousel
            autoplay={autoplay}
            autoplaySpeed={10000}
            dots={false}
            id="carousel"
            pauseOnHover={false}
            pauseOnFocus={false}
            pauseOnDotsHover={false}
            effect="fade"
        >
            {
                movies?.map((movie) => (
                    <div key={movie?.id} className="carousel-item">
                        <img className="back" src={`https://image.tmdb.org/t/p/w780/${movie?.poster_path}`} alt=""/>
                        <div className="info">
                            <h2>{movie?.title}</h2>
                            <p>{movie?.overview}</p>
                            <h3>Genres</h3>
                            <div className="genres">
                                {
                                    movie?.genre_ids?.map((gId, index) => {
                                        const gname = getGenreNameById(gId);
                                        const isLast = index === movie.genre_ids.length - 1;

                                        return (
                                            <React.Fragment key={gId}>
                                                <span>{gname}</span>
                                                {!isLast && <span>, </span>}
                                            </React.Fragment>
                                        );
                                    })
                                }
                                {
                                    movie?.genres?.map((g, index) => {
                                        const isLast = index === movie.genres.length - 1;
                                        return (
                                            <React.Fragment key={g.id}>
                                                <span>{g.name}</span>
                                                {!isLast && <span>, </span>}
                                            </React.Fragment>
                                        );
                                    })
                                }
                            </div>
                            <div className="buttons">
                                <button>Watch <CaretRightOutlined /></button>
                                <button onClick={() => setIsModalOpen(true)}>Rate <PlusOutlined /></button>
                            </div>
                            <div className="details">
                                <img src="https://cdn-icons-png.flaticon.com/512/5977/5977585.png" alt=""/>
                                <span className="rating">{movie?.vote_average}</span>
                                <span className="border">U/A</span>
                                <span className="border">4K</span>
                                <span className="year">{movie?.release_date.substring(0, 4)}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
            <Modal title="Rate movie" open={isModalOpen} onOk={handleRating} onCancel={() => setIsModalOpen(false)}>
                <Slider
                    min={0.5}
                    max={10}
                    onChange={(value) => setRating(value)}
                    step={0.5}
                    value={rating}
                />
            </Modal>
        </AntCarousel>
    );
};

export default Carousel;