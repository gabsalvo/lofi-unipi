import React from 'react';
import './Controls.css';

const Controls = ({
                    playing,
                    muted,
                    volume,
                    played,
                    duration,
                    onPlayPause,
                    onMute,
                    onVolumeChange,
                    onSeekChange,
                    onShuffle
                  }) => {
  const formatTime = (seconds) => {
    const date = new Date(0);
    date.setSeconds(seconds);
    return date.toISOString().substr(11, 8);
  };

  return (
    <div className="controls">
      <button onClick={onPlayPause}>
        {playing ? 'Pause' : 'Play'}
      </button>
      <button onClick={onMute}>
        {muted ? 'Unmute' : 'Mute'}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={onVolumeChange}
        aria-label="Volume"
      />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={played}
        onChange={onSeekChange}
        aria-label="Seek"
      />
      <div className="time">
        <span>{formatTime(played * duration)}</span> / <span>{formatTime(duration)}</span>
      </div>
      <button onClick={onShuffle}>
        Shuffle
      </button>
    </div>
  );
};

export default Controls;
