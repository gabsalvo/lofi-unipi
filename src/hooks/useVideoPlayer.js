import { useState, useRef, useEffect } from 'react';
import { initialUrl, videoUrls as initialVideoUrls } from '../playlistConfig';
import fetchVideoDetails from '../fetchVideoDetails';

const useVideoPlayer = () => {
  const playerRef = useRef(null);
  const [playing, setPlaying] = useState(false); // Start paused
  const [muted, setMuted] = useState(false); // Start unmuted
  const [volume, setVolume] = useState(0.8); // Default volume
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [currentTitle, setCurrentTitle] = useState('');
  const [played, setPlayed] = useState(0); // Track the played time
  const [duration, setDuration] = useState(0); // Track the duration
  const [videoUrls, setVideoUrls] = useState(initialVideoUrls);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const updatedVideoUrls = await Promise.all(initialVideoUrls.map(async (video) => {
          const videoId = video.url.split('v=')[1];
          const title = await fetchVideoDetails(videoId);
          return { ...video, title };
        }));
        setVideoUrls(updatedVideoUrls);
      } catch (error) {
        console.error('Error fetching video titles:', error);
      }
    };

    fetchTitles();
  }, []);

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const videoId = currentUrl.split('v=')[1];
        const existingVideo = videoUrls.find(video => video.url === currentUrl);
        if (existingVideo && existingVideo.title) {
          setCurrentTitle(existingVideo.title);
        } else {
          const title = await fetchVideoDetails(videoId);
          setCurrentTitle(title);
        }
      } catch (error) {
        console.error('Error fetching video title:', error);
      }
    };
    fetchTitle();
  }, [currentUrl, videoUrls]);

  const togglePlayPause = () => {
    setPlaying(!playing);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  const handleVolumeChange = (e) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleProgress = (state) => {
    setPlayed(state.played);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleSeekChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setPlayed(newValue);
    playerRef.current.seekTo(newValue);
  };

  const shuffleVideo = () => {
    const randomIndex = Math.floor(Math.random() * videoUrls.length);
    setCurrentUrl(videoUrls[randomIndex].url);
  };

  const handleVideoSelect = (url) => {
    setCurrentUrl(url);
    setPlaying(true); // Automatically play the selected video
  };

  const handleVideoEnd = () => {
    const currentIndex = videoUrls.findIndex(video => video.url === currentUrl);
    const nextIndex = (currentIndex + 1) % videoUrls.length;
    setCurrentUrl(videoUrls[nextIndex].url);
    setPlaying(true); // Automatically play the next video
  };

  const addVideo = (url) => {
    const newVideo = { url, title: '' }; // title will be fetched later
    setVideoUrls([...videoUrls, newVideo]);
    setCurrentUrl(url);
    setPlaying(true);
  };

  return {
    playerRef,
    playing,
    muted,
    volume,
    currentUrl,
    currentTitle,
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
    addVideo // Return addVideo
  };
};

export default useVideoPlayer;
