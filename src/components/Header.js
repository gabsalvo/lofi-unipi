import './Header.css';
import React, { useState } from 'react';
import LoginModal from './LoginModal';
import UserProfileModal from './UserProfileModal';
import shapeSquare from '../assets/shape_square.png';
import {auth} from "../firebase";

const Header = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  const handleAvatarClick = () => {
    if (auth.currentUser) {
      setProfileOpen(true);
    } else {
      setLoginOpen(true);
    }
  };
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">LOFI-UNIPI</h1>
      </div>
      <div className="header-right" onClick={handleAvatarClick} >
        <img src={shapeSquare} alt="Avatar" className="header-avatar" />
      </div>
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} />
      <UserProfileModal isOpen={isProfileOpen} onClose={() => setProfileOpen(false)} />
    </header>
  );
};

export default Header;
