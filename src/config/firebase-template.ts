import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// COPY YOUR ACTUAL Firebase configuration here
// Get it from: https://console.firebase.google.com/project/finance-tracker-b2070/settings/general
const firebaseConfig = {
  apiKey: "PASTE_YOUR_REAL_API_KEY_HERE",
  authDomain: "finance-tracker-b2070.firebaseapp.com",
  projectId: "finance-tracker-b2070", 
  storageBucket: "finance-tracker-b2070.appspot.com",
  messagingSenderId: "PASTE_YOUR_REAL_SENDER_ID_HERE",
  appId: "PASTE_YOUR_REAL_APP_ID_HERE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default app;

// INSTRUCTIONS:
// 1. Copy your REAL values from Firebase Console
// 2. Replace the placeholders above
// 3. Save this file as firebase.ts (replace the existing one)
