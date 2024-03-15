import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import YouTube, { Options } from 'react-youtube';
import { Button } from '../../components/Button/Button';
import './Video.css';

const opts: Options = {
    height: '315',
    width: '560',
    playerVars: {
        autoplay: 0,
    },
};

type VideoProps = {
    content: {
        step1Header: string;
        step1Title: string;
        step1Tip1: string;
        step1VideoID: string;
        step1ProceedButton: string;
    };
    videoState: {
        hasWatchedVideo: boolean;
    };
    onEnd?: () => void;
    onStateChange?: (event: unknown) => void; 
}
export function Video(props: VideoProps) {
    const {
        content,
        videoState,
        onEnd = () => { },
        onStateChange = (event) => { },
    } = props;
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
                <div className="step">
                    {content.step1Header}: {content.step1Title}
                </div>
                <div className="title1">
                    <div>{content.step1Tip1}</div>
                    {/* <div>{content.step1Tip2}</div> */}
                </div>
            </div>
            <div
                className={`videoContainer ${watchingVideo ? 'largeVideo' : 'smallVideo'}`}
            >
                <div className="videoWrapper">
                    <YouTube
                        className="video"
                        videoId={content.step1VideoID}
                        opts={opts}
                        onPlay={onPlay}
                        onEnd={onVideoEnd}
                        onStateChange={onStateChange} />
                </div>
            </div>
            {hasWatchedVideo && (
                <div className="buttonContainer">
                    <Button
                        label={content.step1ProceedButton}
                        onClick={goToStep2} />
                </div>
            )}
        </div>
    );
}
