// src/components/LoginModal.js
import React from 'react';
import { signInWithPopup, GoogleAuthProvider, auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import './LoginModal.css';

const LoginModal = ({ isOpen, onClose }) => {
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Crea o aggiorna il documento dell'utente
      await setDoc(doc(db, 'users', user.uid), {
        username: user.email,
        playlists: {}
      }, { merge: true });

      onClose();
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlayLogin">
      <div className="modal-content">
        <h2>Login or Register</h2>
        <button onClick={handleLogin}>Sign in with Google</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginModal;
