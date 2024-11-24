import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDgVeIuI9zA6sdpb2Pf2aUD5BzaLxmgADc",
    authDomain: "foodfever-f5933.firebaseapp.com",
    projectId: "foodfever-f5933",
    storageBucket: "foodfever-f5933.firebasestorage.app",
    messagingSenderId: "41461614430",
    appId: "1:41461614430:web:926fb0bf89ff7b5f7471cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);