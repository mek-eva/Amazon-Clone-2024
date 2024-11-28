
import firebase from "firebase/compat/app";
import {getAuth} from 'firebase/auth';
import "firebase/compat/firestore";
import "firebase/compat/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUXIbQTqc568L0DNtMZfDDGmg8OKmxH74",
  authDomain: "clone-3d490.firebaseapp.com",
  projectId: "clone-3d490",
  storageBucket: "clone-3d490.firebasestorage.app",
  messagingSenderId: "519332364105",
  appId: "1:519332364105:web:d25571a17fba0122ace498",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = app.firestore();
