import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth,
  onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc, getDocs,
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
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colRef = collection(db, 'Patients');
const auth = getAuth(app);

//Javascript for Authentication & Authorization
document.addEventListener('DOMContentLoaded', () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const email = user.email;
      getDocumentIdByField(email)
        .then(userdetails => {
          displayPatientsDetails(userdetails);
        });
      
      //displayPatientsDetails(getDocumentIdByField(email));

    } else {
      // User is signed out
      alert("Please log in, you are been redirected to the login page");
      window.location.href = "../patient-login/plogin.html";
    }
  });
});

const logoutButton = document.getElementById('logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('user signed out')
    })
    .catch(err => {
      console.log(err.message)
    })
})

async function getDocumentIdByField(email) {
  // Create a query to search for documents where the email field matches
  const q = query(colRef, where("email", "==", email));

  // Execute the query
  const querySnapshot = await getDocs(q);
  const userdetails = []
  // Loop through the results and get the document IDs
  querySnapshot.forEach((doc) => {
    userdetails.push({ ...doc.data(), id: doc.id }) 
  });
  return userdetails[0];
}

function displayPatientsDetails(details){
  const m = details.mName ?? '';
  const l = details.lName ?? '';
  document.getElementById("fullName").innerHTML = details.firstName +" "+ m +" "+ l;
  document.getElementById("email").innerHTML = details.email
  document.getElementById("contactNo").innerHTML = details.mobileNumber
  document.getElementById("gender").innerHTML = details.gender
}

//Javascript for Chatbot button
document.querySelector('.chatbot-container').addEventListener('click', function() {
  // Your code to open the chatbot or trigger an action
  alert('Chatbot clicked!');
});