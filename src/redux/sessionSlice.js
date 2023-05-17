import {createSlice} from "@reduxjs/toolkit";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies();

// initialize session id and username from cookie
let sessionId = cookies.get("session_id")
    ? cookies.get("session_id")
    : null;
let username =
    cookies.get("username") && cookies.get("username") !== null
        ? cookies.get("username")
        : null;

const initialState = {
    username,
    sessionId,
    genres: [],
    tvGenres: [],
};

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        logout: (state) => {
            cookies.remove("session_id");
            cookies.remove("username");
            state.user = null;
            state.sessionId = null;
        },
        setCredentials: (state, action) => {
            const { username, sessionId } = action.payload;
            state.username = username;
            state.sessionId = sessionId;
            cookies.set("session_id", state.sessionId, { path: "/" });
            cookies.set("username", state.username, { path: "/" });
        },
        setGenres: (state, action) => {
            state.genres = action.payload;
        },
        setTvGenres: (state, action) => {
            state.tvGenres = action.payload;
        }
    },
});

export default sessionSlice.reducer;
export const { logout, setCredentials, setGenres, setTvGenres } =
    sessionSlice.actions;

export const selectUsername = (state) => state.auth.username;
export const selectSessionId = (state) => state.auth.sessionId;
export const selectGenres = (state) => state.auth.genres;
export const selectTvGenres = (state) => state.auth.tvGenres;
