import React from 'react';

import './Video.css';

const Video = ({ video }) => {
  return (
    <div className='videoContainer'>
      <iframe className='video' width="560" height="315" src={ video } title='Project New Citizen Video' frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>
  );
};

export default Video;
