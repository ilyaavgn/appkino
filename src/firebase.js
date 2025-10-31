import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Firebase configuration for your project.
// Replace with your own configuration if different.
const firebaseConfig = {
  apiKey: 'AIzaSyBhNDeMbmiES1XS_UwnCMwt0s1ahAjlrjU',
  authDomain: 'appkinohata.firebaseapp.com',
  projectId: 'appkinohata',
  storageBucket: 'appkinohata.firebasestorage.app',
  messagingSenderId: '315066697427',
  appId: '1:315066697427:web:ed27d6dfe3e259ac827626',
  measurementId: 'G-ZD3RB63K2X',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;
