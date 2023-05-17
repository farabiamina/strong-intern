import React, {useEffect, useState} from 'react';
import {
    useGetNowPlayingMoviesQuery,
    useGetPopularMoviesQuery,
    useGetTopRatedMoviesQuery, useGetUpcomingMoviesQuery
} from "../../redux/movies/moviesApiSlice";
import "./MainPage.css";
import Carousel from "../../components/Carousel/Carousel";
import {Spin} from "antd";
import "../../components/Carousel/Carousel.css";
import MovieList from "../../components/MovieList/MovieList";

const MainPage = () => {
    const {data: nowPlayingMoviesData, isSuccess, isLoading} = useGetNowPlayingMoviesQuery(1);
    const {data: popularMoviesData, isSuccess: isPopularSuccess} = useGetPopularMoviesQuery(1);
    const {data: topMoviesData, isSuccess: isTopSuccess} = useGetTopRatedMoviesQuery(1);
    const {data: upcomingMoviesData, isSuccess: isUpSuccess} = useGetUpcomingMoviesQuery(1);

    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([]);
    const [upcomingMovies, setUpcomingMovies] = useState([]);

    useEffect(() => {
        if (isSuccess) {
            setNowPlayingMovies(nowPlayingMoviesData.results);
        }
    }, [nowPlayingMoviesData, isSuccess])

    useEffect(() => {
        if (isPopularSuccess) {
            setPopularMovies(popularMoviesData.results);
        }
    }, [popularMoviesData, isPopularSuccess])

    useEffect(() => {
        if (isTopSuccess) {
            setTopMovies(topMoviesData.results);
        }
    }, [topMoviesData, isTopSuccess])

    useEffect(() => {
        if (isUpSuccess) {
            setUpcomingMovies(upcomingMoviesData.results);
        }
    }, [upcomingMoviesData, isUpSuccess])

    return (
        <main id="main">
            <section>
                <Spin spinning={isLoading}>
                    <Carousel movies={nowPlayingMovies}/>
                </Spin>
            </section>
            <section>
                <Spin spinning={isLoading}>
                    <MovieList name="Popular" background={true} movies={popularMovies}/>
                    <MovieList name="Top rated" background={false} movies={topMovies}/>
                    <MovieList name="Upcoming" background={false} movies={upcomingMovies}/>
                </Spin>
            </section>
        </main>
    );
};

export default MainPage;