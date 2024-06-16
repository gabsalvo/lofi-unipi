import React, { forwardRef } from 'react';
import ReactPlayer from 'react-player';
import './VideoBackground.css';

const VideoBackground = forwardRef(({ videoUrl, playing, muted, volume, onProgress, onDuration, onEnded }, ref) => (
  <div className="audio-wrapper">
    <ReactPlayer
      ref={ref}
      url={videoUrl}
      playing={playing}
      muted={muted}
      volume={volume}
      controls={false}
      width="0"
      height="0"
      onProgress={onProgress}
      onDuration={onDuration}
      onEnded={onEnded}  // Handle the video end event
      config={{
        youtube: {
          playerVars: {
            autoplay: 1,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            iv_load_policy: 3,
            fs: 0,
            disablekb: 1,
            playsinline: 1,
          },
        },
      }}
    />
  </div>
));

export default VideoBackground;
