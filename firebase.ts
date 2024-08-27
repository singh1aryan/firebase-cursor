import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyCyW09s4zXCS0LUqCDDamzdDA_sOckX-Tk",
    authDomain: "ai-project-709dd.firebaseapp.com",
    projectId: "ai-project-709dd",
    storageBucket: "ai-project-709dd.appspot.com",
    messagingSenderId: "1024902750094",
    appId: "1:1024902750094:web:b06f5a76d468d3b20a8edf",
    measurementId: "G-XXWM4HL6VB"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);