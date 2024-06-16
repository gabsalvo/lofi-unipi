import React, { useState } from 'react';
import VideoBackground from './components/VideoBackground';
import Shadow from './components/Shadow';
import Controls from './components/Controls';
import Playlist from './components/Playlist';
import AddVideoModal from './components/AddVideoModal';
import useVideoPlayer from './hooks/useVideoPlayer';
import Header from './components/Header';
import './App.css';

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {
    playerRef,
    playing,
    muted,
    volume,
    currentUrl,
    played,
    duration,
    togglePlayPause,
    toggleMute,
    handleVolumeChange,
    handleProgress,
    handleDuration,
    handleSeekChange,
    shuffleVideo,
    handleVideoSelect,
    handleVideoEnd,
    videoUrls,
    addVideo
  } = useVideoPlayer();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddVideo = (url) => {
    addVideo(url);
    closeModal();
  };

  return (
    <div className="App">
      <Header />
      <img src="/sfondo.jpg" alt="Lofi Background" className="background-image" />
      <Shadow />
      <VideoBackground
        videoUrl={currentUrl}
        playing={playing}
        muted={muted}
        volume={volume}
        ref={playerRef}
        onProgress={handleProgress}
        onDuration={handleDuration}
        onEnded={handleVideoEnd}  // Pass the onEnded handler
      />
      <Controls
        playing={playing}
        muted={muted}
        volume={volume}
        played={played}
        duration={duration}
        onPlayPause={togglePlayPause}
        onMute={toggleMute}
        onVolumeChange={handleVolumeChange}
        onSeekChange={handleSeekChange}
        onShuffle={() => shuffleVideo(videoUrls)}
      />
      <Playlist
        videoUrls={videoUrls}
        onVideoSelect={handleVideoSelect}
        currentUrl={currentUrl}
      />
      <button onClick={openModal} className="add-video-button">+</button>
      <AddVideoModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        onAdd={handleAddVideo}
      />
    </div>
  );
};

export default App;
