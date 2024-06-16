import React from 'react';
import './Playlist.css';

const Playlist = ({ videoUrls, onVideoSelect, currentUrl }) => {
  return (
    <div className="playlist">
      {videoUrls.map((video, index) => (
        <div
          key={index}
          className={`playlist-item ${video.url === currentUrl ? 'playing' : ''}`}
          onClick={() => onVideoSelect(video.url)}
        >
          {video.title}
        </div>
      ))}
    </div>
  );
};

export default Playlist;
