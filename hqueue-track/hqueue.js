import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
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

document.addEventListener('DOMContentLoaded', () => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const email = user.email;

      const docRef1 = doc(db, 'Doctors', "Auth_Doctors");
      const docSnap = await getDoc(docRef1);
      if (docSnap.exists()) {
        if (docSnap.data().email.includes(email)) {
            mainjs(email);
          } else {
            alert("You Donot have permission to login into the hospital")
            window.location.href = "../hospital-login/hlogin.html";
          }
    }
    } else {
      // User is signed out
      alert("Please log in, you are been redirected to the login page");
      window.location.href = "../hospital-login/hlogin.html";
    }
  });
});

async function mainjs(email) {
  const QueueID = await getQueueID(email);
  window.QueueID = QueueID;
  let data = await getQueDetails(QueueID);
  displayCPatientData(data);
  
}

function displayCPatientData(data) {
    document.getElementById("patientName").textContent = data.cPDname;
    document.getElementById("patientContact").textContent = data.cPDmobileNumber;
    document.getElementById("patientEmail").textContent = data.cPDemail;
    document.getElementById("patientGender").textContent = data.cPDgender;
    document.getElementById("queueCount").textContent = data.queLength - data.CPI +1;
}

document.getElementById("nextPatientButton").addEventListener("click", async function() {
    
    const d = await getQueDetails(window.QueueID);
    if ((d.CPI - d.queLength -1) == 0) {
        
        document.getElementById("noQueue").innerHTML = "No Patients Are Available in Queue";
        displayCPatientData({
            CPI : 1,
            queLength : 0,
            cPDname: "--",
            cPDemail: "--",
            cPDmobileNumber: "--",
            cPDgender: "--",
        })
        return
    }else{
        const queRef1 = doc(db, "Queues", window.QueueID);
        await updateDoc(queRef1, {
        currentPatientIndex: increment(1)
        });
        window.location.reload();
    }
    
});
async function getQueDetails(QueueID) {
    const queDoc = await getDoc(doc(db, 'Queues', QueueID));
    const queData = queDoc.data();
    const CPI = queData.currentPatientIndex;
    const queArray = queData.Patients;
    if ((CPI - queArray.length - 1) == 0) {
        document.getElementById("noQueue").innerHTML = "No Patients Are Available in Queue";
        return
    }
    const CurrentPatientID = queArray[CPI-1];

    const CurrentPatientDoc = await getDoc(doc(db, 'Patients', CurrentPatientID));
    const CurrentPatientData = CurrentPatientDoc.data();

    const f = CurrentPatientData.firstName ?? '';
    const m = CurrentPatientData.mName ?? '';
    const l = CurrentPatientData.lName ?? '';
    const pEmail = CurrentPatientData.email;
    const mobileNumber = CurrentPatientData.mobileNumber;
    const gender = CurrentPatientData.gender;
    let queLength = queArray.length;
    
    return {
        CPI : CPI,
        queLength : queLength,
        cPDname: f + m + l,
        cPDemail: pEmail,
        cPDmobileNumber: mobileNumber,
        cPDgender: gender,
    }
}

async function getQueueID(email) {
    const q = query(docRef, where("email", "==", email));
    const qSnap = await getDocs(q);
    if (qSnap.empty){
        console.log("User not found");
    }else{
        const data = qSnap.docs[0].data()
        return data.Specialization;
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









