//Javascript for Authentication & Authorization
document.addEventListener('DOMContentLoaded', () => {
    const auth = firebase.auth();

    // Redirect to login page if not authenticated
    auth.onAuthStateChanged((user) => {
      if (!user) {
        window.location.href = './login.html'; // Replace with your actual login page URL
      }
    });
  });





  // Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Reference to the patient details in Firebase
const patientId = "somePatientId"; // Replace with the actual patient ID
const patientRef = firebase.database().ref('patients/' + patientId);

// Fetch patient details from Firebase
patientRef.once('value').then((snapshot) => {
  const data = snapshot.val();
  if (data) {
      document.getElementById('fullName').textContent = data.fullName || '__________';
      document.getElementById('contactNo').textContent = data.contactNo || '__________';
      document.getElementById('email').textContent = data.email || '__________';
      document.getElementById('gender').textContent = data.gender || '__________';
  }
}).catch((error) => {
  console.error("Error fetching patient details: ", error);
});


// JavaScript for navigation Features to navigate to Our features section
document.querySelectorAll('a[href^="#features"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
      });
  });
});


//Javascript for Chatbot button
document.querySelector('.chatbot-container').addEventListener('click', function() {
  // Your code to open the chatbot or trigger an action
  alert('Chatbot clicked!');
});
