import React, {useEffect, useState} from 'react';
import "./WelcomePage.css";
import {useGetSessionIdQuery} from "../../redux/API/apiSlice";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setCredentials} from "../../redux/sessionSlice";

const WelcomePage = () => {
    const [name, setName] = useState("");
    const [sessionId, setSessionId] = useState();
    const {data: sessionIDData, isSuccess} = useGetSessionIdQuery();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    useEffect(() => {
        if (isSuccess) {
            setSessionId(sessionIDData?.guest_session_id);
        }
    }, [sessionIDData, isSuccess])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === "") {
            setError(true);
            return;
        }
        try {
            dispatch(
                setCredentials({
                    username: name,
                    sessionId: sessionId,
                })
            );
            navigate("/main");
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <main id="welcome">
            <div className="logo-container">
                <h1 className="logo">Dramatic</h1>
            </div>
            <section>
                <form onSubmit={handleSubmit}>
                    <p>Welcome! Please enter your name.</p>
                    <div className="input-container">
                        <input type="text" value={name}
                               onChange={(e) => {
                                   setName(e.target.value);
                                   if (e.target.value !== "" && error) {
                                       setError(false);
                                   }
                               }}
                        />
                        <p className="error">{
                            error &&
                            "You can't continue without name"
                        }</p>
                    </div>
                    <button type="submit"><span>Go</span></button>
                </form>
            </section>
        </main>
    );
};

export default WelcomePage;