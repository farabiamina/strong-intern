import React from 'react';
import "./VideoPage.css";
import {useParams} from "react-router-dom";

const VideoPage = () => {
    const {vId} = useParams();
    return (
        <section id="video">
            <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${vId}`}
                title="Video Preview"
                allowFullScreen
            ></iframe>
        </section>
    );
};

export default VideoPage;