// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// IMPORTANT: REPLACE WITH YOUR ACTUAL FIREBASE CONFIGURATION
const firebaseConfig = {
  apiKey: "AIzaSyAKbgVxAdz3jSw1D4c9GxA35AyDy0eq5FA",
  authDomain: "sheandsoul-78aac.firebaseapp.com",
  projectId: "sheandsoul-78aac",
  storageBucket: "sheandsoul-78aac.firebasestorage.app",
  messagingSenderId: "476522947687",
  appId: "1:476522947687:web:acd5d2eacaf07f026360c2",
  measurementId: "G-1VJWNZ20JJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth }; 