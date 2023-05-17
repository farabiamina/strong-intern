import './App.css';
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import MainPage from "./pages/MainPage/MainPage";
import {useEffect} from "react";
import {useGetGenresQuery, useGetTvGenresQuery} from "./redux/genres/genresApiSlice";
import {useDispatch} from "react-redux";
import {setGenres, setTvGenres} from "./redux/sessionSlice";
import MoviePage from "./pages/MoviePage/MoviePage";
import VideoPage from "./pages/VideoPage/VideoPage";
import DiscoverPage from "./pages/DiscoverPage/DiscoverPage";

function App() {
    const dispatch = useDispatch();
    const {data: genresData, isSuccess: isGenresSuccess} = useGetGenresQuery();
    const {data: tvGenresData, isSuccess: isTvGenresSuccess} = useGetTvGenresQuery();

    useEffect(() => {
        if (isGenresSuccess) {
            dispatch(setGenres(genresData.genres))
        }
    }, [genresData, isGenresSuccess])

    useEffect(() => {
        if (isTvGenresSuccess) {
            dispatch(setTvGenres(tvGenresData.genres))
        }
    }, [tvGenresData, isTvGenresSuccess])

  return (
    <div className="App">
      <Routes>
          <Route
              exact
              path="/"
              element={
                  <PrivateRoute navigation={true} />
              }
          >
              <Route exact path="/main" element={<MainPage />} />
              <Route exact path="/movies/:id" element={<MoviePage />} />
              <Route exact path="/movies" element={<DiscoverPage type={"movie"} />} />
              <Route exact path="/tvShows" element={<DiscoverPage type={"tv"} />} />
          </Route>
          <Route
              exact
              path="/"
              element={
                  <PrivateRoute navigation={false} />
              }
          >
              <Route exact path="/movies/video/:vId" element={<VideoPage />} />
          </Route>
          <Route exact path="/welcome" element={<WelcomePage />} />
      </Routes>
    </div>
  );
}

export default App;
