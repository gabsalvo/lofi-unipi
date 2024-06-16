// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore,  collection, addDoc, query, where, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVtti6u-snRvl6rXcoLCjy5CM1yAru1b8",
  authDomain: "lofimusicunipi.firebaseapp.com",
  projectId: "lofimusicunipi",
  storageBucket: "lofimusicunipi.appspot.com",
  messagingSenderId: "609346641332",
  appId: "1:609346641332:web:65fe5cef3e5e52887c26e1",
  measurementId: "G-7LMB5WHMN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
const db = getFirestore(app);

export { app, analytics, auth, db, signInWithPopup, GoogleAuthProvider, collection, addDoc, query, where, getDocs  };
