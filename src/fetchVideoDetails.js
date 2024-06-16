import axios from 'axios';

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY; // Replace with your YouTube Data API key

const fetchVideoDetails = async (videoId) => {
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${API_KEY}`;
  try {
    const response = await axios.get(url);
    console.log('API Response:', response.data); // Debugging line
    const { items } = response.data;
    if (items.length > 0) {
      const { snippet } = items[0];
      const { title } = snippet;
      return title;
    } else {
      throw new Error('No video details found');
    }
  } catch (error) {
    console.error('Error fetching video details:', error);
    throw error;
  }
};

export default fetchVideoDetails;
