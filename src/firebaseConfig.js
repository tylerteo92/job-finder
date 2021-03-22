// src/firebaseConfig.js
import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9i2czGgLMOLXW4maW60Py40BPoZKTTi0",
  authDomain: "jd-api-1da62.firebaseapp.com",
  databaseURL: "https://jd-api-1da62-default-rtdb.firebaseio.com",
  projectId: "jd-api-1da62",
  storageBucket: "jd-api-1da62.appspot.com",
  messagingSenderId: "972676063105",
  appId: "1:972676063105:web:5c29706d0ec220411a1280",
  measurementId: "G-89J71W5JKN"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);