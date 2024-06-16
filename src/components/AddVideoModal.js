// src/components/AddVideoModal.js
import React, { useState } from 'react';
import './AddVideoModal.css';

const AddVideoModal = ({ isOpen, onClose, onAdd }) => {
  const [url, setUrl] = useState('');
  const [playlistName, setPlaylistName] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (url.trim() && playlistName.trim()) {
      onAdd(playlistName, url);
      setUrl(''); // Clear the input field after adding
      setPlaylistName(''); // Clear the playlist name field after adding
      setError(''); // Clear the error message
    } else {
      setError('Please fill in both input fields.');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Playlist</h2>
        <input
          type="text"
          placeholder="Enter Playlist Name"
          value={playlistName}
          onChange={(e) => setPlaylistName(e.target.value)}
          className="input-playlist-name"
        />
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="input-url"
        />
        {error && <p className="error-message">{error}</p>}
        <div className="modal-buttons">
          <button onClick={handleAdd} className="add-button">Add</button>
          <button onClick={onClose} className="close-button">Close</button>
        </div>
      </div>
    </div>
  );
};

export default AddVideoModal;
