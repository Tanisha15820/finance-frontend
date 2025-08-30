# How to Get Your Correct Firebase Web App Configuration

The error indicates that the API key in the frontend Firebase config is not valid. You need to get the correct web app configuration from your Firebase project.

## 🔍 Get Your Real Firebase Web App Config

### Step 1: Go to Firebase Console
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **finance-tracker-b2070**

### Step 2: Add Web App (if not already done)
1. Click the **gear icon** ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll to "Your apps" section
4. If you see a web app already, click on it. If not:
   - Click "Add app" → Web app icon `</>`
   - Enter app nickname: `Finance Tracker Frontend`
   - **Don't check** "Set up Firebase Hosting"
   - Click "Register app"

### Step 3: Copy the Configuration
You'll see a configuration object like this:

```javascript
// Copy this EXACT configuration
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "finance-tracker-b2070.firebaseapp.com",
  projectId: "finance-tracker-b2070",
  storageBucket: "finance-tracker-b2070.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};
```

**Copy YOUR ACTUAL values - don't use the example above!**

## 🔧 Update Frontend Configuration

Replace the configuration in `src/config/firebase.ts` with your actual values.

## 🎯 Quick Fix

I'll create a script to help you update the config easily.
