import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth,
  onAuthStateChanged, signOut
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import {
  getFirestore, collection, onSnapshot, getDoc, updateDoc,
  addDoc, deleteDoc, doc, getDocs,serverTimestamp, increment, arrayUnion, arrayRemove,
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
const auth = getAuth(app);

const colRef = collection(db, 'Patients');
const docRef = collection(db, 'Doctors');
const queRef = collection(db, 'Queues');
const appRef = collection(db, 'Appointments');
let PatientID = "currently not assigned";
const userdetails = []
let inQueueFlag = false;
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
          checkFlag();
        });
      checkForDoc(email);
    } else {
      // User is signed out
      alert("Please log in, you are been redirected to the login page");
      window.location.href = "../patient-login/plogin.html";
    }
  });

  
});

const checkForDoc = async (email) => {
  const docRef1 = doc(db, 'Doctors', "Auth_Doctors");
  const docSnap = await getDoc(docRef1);
  if (docSnap.exists()) {
    if (docSnap.data().email.includes(email)) {
        alert("You are A Doctor, Please login as a Patient or go to hospital login")
        window.location.href = "../hospital-login/hlogin.html";
      }
  }
};

async function checkFlag() {
  const q = query(appRef, where("PatientID", "==", PatientID));
  const q2Snapshot = await getDocs(q);
  console.log(q2Snapshot.empty) 
  if (q2Snapshot.empty){
    inQueueFlag = false;
    
    console.log(q2Snapshot.docs)
  }else{
    inQueueFlag = true;
    document.getElementById("drop-down-for-department").innerHTML = "Already enrolled in Queue"
    get_queueID(PatientID)
      .then ((QueueID) =>{
        queDetails(QueueID);
      });
  }
}

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
  
  // Loop through the results and get the document IDs
  querySnapshot.forEach((doc) => {
    userdetails.push({ ...doc.data(), id: doc.id })
    PatientID =  doc.id;
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

//admit to queue

// Add to the queue button
const addQueueButton = document.getElementById('addQueueButton')
addQueueButton.addEventListener('click', addAppointment);

async function addAppointment(){
    console.log("hey", userdetails[0].id)
    const PatientID = userdetails[0].id;
    const department = document.getElementById("department").value;
    const q = query(docRef, where("Specialization", "==", department));
    const querySnapshot = await getDocs(q);
    let DoctorID = querySnapshot.docs[0].id;
    const QueueID = department;
    const Appointmentdetails = {
        PatientID: PatientID,
        DoctorID: DoctorID,
        QueueID: QueueID,
        status: "scheduled",
        AppointmentDate: serverTimestamp() ,
      }
    //check if already existed
    if (!inQueueFlag) {
      try {
        addDoc(appRef, Appointmentdetails).then( (x) => {
          console.log("Document written with ID: ", x);
        });
        const queRef1 = doc(db, "Queues", QueueID);
        await updateDoc(queRef1, {
          Patients: arrayUnion(PatientID),
          currentPatientIndex: increment(1)
        });
        inQueueFlag = true;
        location.reload();
        document.getElementById("drop-down-for-department").innerHTML = "Please Wait..."
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    } else {
      console.log("user in already in queue cant addAppointment()");
    }
    
  } 
//block_admit
async function get_queueID(PatientID) {
  const q = query(appRef, where("PatientID", "==", PatientID));
  const qSnap = await getDocs(q);
  const QueueID = qSnap.docs[0].data().QueueID;
  return QueueID
}

async function queDetails(QueueID) {
  const queDoc = await getDoc(doc(db, 'Queues', QueueID));
  const queData = queDoc.data();
  const CPI = queData.currentPatientIndex;
  const queArray = queData.Patients;
  let queArrayLength = queArray.length;
  let queArrayindex = queArray.indexOf(PatientID); 
  
  document.getElementById("queue-card-content").innerHTML = " "
  
}

function displayQueueDetails() {

}