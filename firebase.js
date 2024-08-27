"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.firebaseConfig = void 0;
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
exports.firebaseConfig = {
    apiKey: "AIzaSyCyW09s4zXCS0LUqCDDamzdDA_sOckX-Tk",
    authDomain: "ai-project-709dd.firebaseapp.com",
    projectId: "ai-project-709dd",
    storageBucket: "ai-project-709dd.appspot.com",
    messagingSenderId: "1024902750094",
    appId: "1:1024902750094:web:b06f5a76d468d3b20a8edf",
    measurementId: "G-XXWM4HL6VB"
};
var app = (0, app_1.initializeApp)(exports.firebaseConfig);
exports.db = (0, firestore_1.getFirestore)(app);
