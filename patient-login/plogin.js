// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

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

// Get the form and inputs
const form = document.getElementById('ploginForm');
const emailInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('loginError');

// Handle form submission
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        window.location.replace('../patient-dashboard/pdash.html'); // Redirect to patient dashboard
    } catch (error) {
        loginError.textContent = `Error: ${error.message}`;
    }
});

//Toggle responsive menu for navigation tab
document.getElementById('navbar-toggle').addEventListener('click', function() {
    var navbarRight = document.querySelector('.navbar-right');
    navbarRight.classList.toggle('active');
    this.classList.toggle('active');
});


//Javascript for Authentication & Authorization
document.addEventListener('DOMContentLoaded', () => {
    const auth = firebase.auth();

    // Function to handle sign-in
    function signIn(email, password) {
      auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Successfully signed in
          const user = userCredential.user;
          console.log('User signed in:', user);

          // Redirect to patient dashboard after sign-in
          window.location.href = './patient-dashboard.html'; // Replace with your actual dashboard URL
        })
        .catch((error) => {
          console.error('Error signing in:', error.message);
          // Handle errors (e.g., show error message to user)
        });
    }

    // Handle sign-in button click
    document.getElementById('loginButton').addEventListener('click', () => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      signIn(email, password);
    });
  });