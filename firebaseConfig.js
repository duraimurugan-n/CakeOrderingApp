// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBnl4mMJrmY1IXUXil540SyqOWz55xYT3U",
    authDomain: "cakeorderingapp-bc08e.firebaseapp.com",
    projectId: "cakeorderingapp-bc08e",
    storageBucket: "cakeorderingapp-bc08e.appspot.com",
    messagingSenderId: "418049902594",
    appId: "1:418049902594:android:5f300d60f9d61968293f1b"
};

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});

export { db, auth };