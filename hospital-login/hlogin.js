// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, 
    onAuthStateChanged
 } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
 import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc, getDoc,
    query, where
  } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js'
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlLLPvziy_omkGwlaxsbtS8Kb29637KmM",
    authDomain: "swasthik-sih.firebaseapp.com",
    projectId: "swasthik-sih",
    storageBucket: "swasthik-sih.appspot.com",
    messagingSenderId: "1046285450890",
    appId: "1:1046285450890:web:3c90cf995920b9eb0a3773",
    measurementId: "G-P2G3SYJF6B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// Get the form and inputs
const form = document.getElementById('hloginForm');
const emailInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('loginError');

// Handle form submission
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    const docRef = doc(db, 'Doctors', "Auth_Doctors");
    const docSnap = await getDoc(docRef);
    try {
        await signInWithEmailAndPassword(auth, email, password);
        if (docSnap.exists()) {
            if (docSnap.data().email.includes(email)) {
                window.location.replace('../');
              } else {
                alert("You Donot have permission to login into the hospital")
              }
        }
    } catch (error) {
        loginError.textContent = `Error: ${error.message}`;
    }

});

