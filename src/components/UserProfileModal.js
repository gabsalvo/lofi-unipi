// src/components/UserProfileModal.js
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './UserProfileModal.css';
import { signOut } from 'firebase/auth';

const UserProfileModal = ({ isOpen, onClose }) => {
  const [userVideos, setUserVideos] = useState([]);

  useEffect(() => {
    const fetchUserVideos = async () => {
      if (auth.currentUser) {
        const q = query(collection(db, "videos"), where("userId", "==", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        setUserVideos(querySnapshot.docs.map(doc => doc.data()));
      }
    };
    fetchUserVideos();
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      onClose(); // Close the modal after logging out
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlayUser">
      <div className="modal-content">
        <h2>Your Videos</h2>
        <ul>
          {userVideos.map((video, index) => (
            <li key={index}>{video.title}</li>
          ))}
        </ul>
        <div className="modal-buttons">
          <button onClick={onClose}>Close</button>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
