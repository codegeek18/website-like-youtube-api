// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw1M66iFXJ-e92smQPJAMYKPq7PlsY7LE",
  authDomain: "yt-otp-login.firebaseapp.com",
  projectId: "yt-otp-login",
  storageBucket: "yt-otp-login.appspot.com",
  messagingSenderId: "965165967819",
  appId: "1:965165967819:web:d013c7c4ae1b5500386e4e",
  measurementId: "G-YCD102694T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);