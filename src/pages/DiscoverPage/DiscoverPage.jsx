import React, {useEffect} from 'react';
import {useState} from "react";
import MovieItem from "../../components/MovieItem/MovieItem";
import {useSelector} from "react-redux";
import {selectGenres, selectTvGenres} from "../../redux/sessionSlice";
import {useGetDiscoverQuery} from "../../redux/discover/discoverApiSlice";
import "./DiscoverPage.css";
import {Pagination, Select} from "antd";

const DiscoverPage = ({type}) => {
    const [movies, setMovies] = useState([]);
    const movieGenres = useSelector(selectGenres);
    const tvGenres = useSelector(selectTvGenres);
    const [filters, setFilters] = useState({
        sort_by: 'popularity.desc',
        release_year: '',
        with_genres: [],
        query: '',
        page: 1,
    });
    const { Option } = Select;
    const {data: moviesData, isSuccess}
        = useGetDiscoverQuery({ type, sort_by: filters.sort_by, release_year: filters.release_year, with_genres: filters.with_genres, page: filters.page });

    useEffect(() => {
        console.log(moviesData?.results);
        if (isSuccess){
            setMovies(moviesData.results);
            if (filters.page === 1) setTotalPages(moviesData?.total_results);
        }
    }, [moviesData, isSuccess])

    const [totalPages, setTotalPages] = useState(0);
    const years = Array.from({ length: new Date().getFullYear() - 1900 + 1 }, (_, i) => ({
        id: i,
        name: new Date().getFullYear() - i,
    }));

    const handleSortChange = (value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            sort_by: value,
        }));
    };

    const handleYearChange = (value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            release_year: value,
        }));
    };

    const handleGenreSelect = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                with_genres: [...prevFilters.with_genres, value],
            }));
        } else {
            setFilters((prevFilters) => ({
                ...prevFilters,
                with_genres: prevFilters.with_genres.filter((genre) => genre !== value),
            }));
        }
    };

    const handlePageChange = (page) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            page,
        }));
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Reset page to 1 when filters change
    //     setFilters((prevFilters) => ({
    //         ...prevFilters,
    //         page: 1,
    //     }));
    // };


    return (
        <section id="discover">
            <div className="filters">
                <label>
                    <Select name="sort_by" value={filters.sort_by} onChange={handleSortChange}>
                        <Option value="popularity.desc">Popularity Descending</Option>
                        <Option value="popularity.asc">Popularity Ascending</Option>
                        <Option value="vote_average.desc">Rating Descending</Option>
                        <Option value="vote_average.asc">Rating Ascending</Option>
                        <Option value="release_date.desc">Release Date Descending</Option>
                        <Option value="release_date.asc">Release Date Ascending</Option>
                        <Option value="revenue.desc">Revenue Descending</Option>
                        <Option value="revenue.asc">Revenue Ascending</Option>
                    </Select>
                </label>
                <label>
                    <Select name="release_year" value={filters.release_year} onChange={handleYearChange}>
                        <Option value="">Any Year</Option>
                        {years.map((year) => (
                            <Option key={year.id} value={year.name}>
                                {year.name}
                            </Option>
                        ))}
                    </Select>
                </label>
                <div>
                    <Pagination
                        className="ant-pagination"
                        showQuickJumper
                        defaultCurrent={2} total={500}
                        onChange={(p) => handlePageChange(p)} />
                </div>
            </div>
            <div className="main">
                <div className="movies-container">
                    {
                        movies.map((movie) => (
                            <MovieItem key={movie.id} movie={movie}/>
                        ))
                    }
                </div>
                <aside>
                    {
                        type === "movie" &&
                        <label>
                            {movieGenres.map((genre) => (
                                <div className="checkbox-container" key={genre.id}>
                                    <input
                                        id={genre.name}
                                        type="checkbox"
                                        name="with_genres"
                                        value={genre.id}
                                        checked={filters.with_genres.includes(String(genre.id))}
                                        onChange={handleGenreSelect}
                                        className="checkbox-input"
                                    />
                                    <label className="checkbox-label" htmlFor={genre.name}>{genre.name}</label>
                                </div>
                            ))}
                        </label>
                    }
                    {
                        type === "tv" &&
                        <label>
                            {tvGenres.map((genre) => (
                                <div className="checkbox-container" key={genre.id}>
                                    <input
                                        id={genre.name}
                                        type="checkbox"
                                        name="with_genres"
                                        value={genre.id}
                                        checked={filters.with_genres.includes(String(genre.id))}
                                        onChange={handleGenreSelect}
                                        className="checkbox-input"
                                    />
                                    <label className="checkbox-label" htmlFor={genre.name}>{genre.name}</label>
                                </div>
                            ))}
                        </label>
                    }
                </aside>
            </div>
        </section>
    );
};

export default DiscoverPage;