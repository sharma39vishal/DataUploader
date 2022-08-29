import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyCy0sG6TskW2eG9qNrkGjxvi-yi1kF_9tY",
  authDomain: "vishal-6ccf0.firebaseapp.com",
  projectId: "vishal-6ccf0",
  storageBucket: "vishal-6ccf0.appspot.com",
  messagingSenderId: "287609768876",
  appId: "1:287609768876:web:840f6571fdfad1df860809",
  measurementId: "G-YWTPFS9RRV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage=getStorage(app)