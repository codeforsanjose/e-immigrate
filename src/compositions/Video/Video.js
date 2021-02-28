import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import YouTube from 'react-youtube';
import Button from '../../components/Button/Button';
import './Video.css';

const opts = {
    height: '315',
    width: '560',
    playerVars: {
        autoplay: 0,
    },
};

const Video = ({
    video,
    videoState,
    onEnd = () => {},
    onStateChange = (event) => {},
}) => {
    const { videoId } = video;
    const hasWatchedVideo = videoState.hasWatchedVideo;
    let history = useHistory();
    const goToStep2 = () => {
        history.push('/questionnaire');
    };
    const [watchingVideo, setWatchingVideo] = useState(false);
    const onPlay = () => {
        setWatchingVideo(true);
    };
    const onVideoEnd = () => {
        setWatchingVideo(false);
        onEnd();
    };

    return (
        <div className="video">
            <div className="titleText">
                <div className="step">Step 1: Video</div>
                <div className="title1">
                    <div>Watch the Project New Citizen orientation video.</div>
                    <div>It's only 15 minutes!</div>
                </div>
            </div>
            <div
                className={`videoContainer ${
                    watchingVideo ? 'largeVideo' : 'smallVideo'
                }`}
            >
                <div className="videoWrapper">
                    <YouTube
                        className="video"
                        videoId={videoId}
                        opts={opts}
                        onPlay={onPlay}
                        onEnd={onVideoEnd}
                        onStateChange={onStateChange}
                    />
                </div>
            </div>
            {hasWatchedVideo && (
                <div className="buttonContainer">
                    <Button label={'Go to Step 2'} onClick={goToStep2} />
                </div>
            )}
        </div>
    );
};

export default Video;
