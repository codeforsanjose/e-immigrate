import React from 'react';
import YouTube from 'react-youtube';
import './Video.css';

const onEnd = () => console.log('video has ended');

const onStateChange = (event) => console.log(event.data);

const opts = {
  height: '315',
  width: '560',
  playerVars: {
    autoplay: 0,
  },
};

const Video = ({ video }) => {
  const { step, line1, videoId } = video;
  return (
    <div className='video'>
      <div className='titleText'>
        <div className='step'>{ step }</div>
        <div className='title1'>{ line1 }</div>
      </div>
      <div className='videoContainer'>
        <YouTube 
          className='video'
          videoId={ videoId } 
          opts={opts} 
          onEnd={onEnd}
          onStateChange={onStateChange}
        />
      </div>
    </div>
  );
};

export default Video;
