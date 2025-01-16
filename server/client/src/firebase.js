// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e9877.firebaseapp.com",
  projectId: "mern-estate-e9877",
  storageBucket: "mern-estate-e9877.firebasestorage.app",
  messagingSenderId: "777388935606",
  appId: "1:777388935606:web:ee595bc55b872cb3e55917",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
