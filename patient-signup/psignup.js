
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc, getDocs, setDoc,
    query, where
  } from 'https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js'

const firebaseConfig = {
    apiKey: "AIzaSyBlLLPvziy_omkGwlaxsbtS8Kb29637KmM",
    authDomain: "swasthik-sih.firebaseapp.com",
    projectId: "swasthik-sih",
    storageBucket: "swasthik-sih.appspot.com",
    messagingSenderId: "1046285450890",
    appId: "1:1046285450890:web:3c90cf995920b9eb0a3773",
    measurementId: "G-P2G3SYJF6B"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
// init services
const db = getFirestore(app)

// collection ref
const colRef = collection(db, 'Patients')

document.getElementById('psignupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        document.getElementById('passwordMatchMessage').style.display = 'block';
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Sign-up successful!');
        // Redirect or perform additional actions on successful sign-up
        window.location.href = '../patient-dashboard/pdash.html'; // Redirect to patient dashboard
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});
// realtime collection data
// getDocs(colRef)
//   .then(snapshot => {
//     let Patients = []
//     snapshot.docs.forEach(doc => {
//       Patients.push({ ...doc.data(), id: doc.id })
//     })
//     console.log(Patients)
//   })

// adding docs
document.getElementById('psignupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission behavior
  
    const firstName = document.getElementById('firstName').value;
    const email = document.getElementById('email').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const middleName = document.getElementById('middleName').value;
    const lastName = document.getElementById('lastName').value;
    
    try {
        addDoc(colRef, {
            firstName: firstName,
            mName : middleName,
            lName : lastName,
            email: email,
            mobileNumber : mobileNumber,
            gender: gender
        });
        console.log("Document written with ID: ");
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  });