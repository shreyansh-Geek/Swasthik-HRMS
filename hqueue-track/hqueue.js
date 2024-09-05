// Dummy data for patients (In real scenario, this will be fetched from Firebase)
const patientsQueue = [
    {
        name: "Shreyansh Pandit",
        contact: "+91 9876543210",
        email: "Shreyansh@example.com",
        gender: "Male",
        temperature: "98.6°F",
        bloodPressure: "120/80 mmHg",
        oxygen: "98%"
    },
    {
        name: "Devashish Kourav",
        contact: "+91 9876543211",
        email: "Devashish@example.com",
        gender: "Male",
        temperature: "99.1°F",
        bloodPressure: "115/75 mmHg",
        oxygen: "97%"
    },
    {
        name: "Bishwa Ranjan",
        contact: "+91 9876543212",
        email: "Bishwa@example.com",
        gender: "Male",
        temperature: "100.4°F",
        bloodPressure: "130/85 mmHg",
        oxygen: "95%"
    }
];

let currentPatientIndex = 0;

// Update total queue count (assuming this value would be fetched from the database)
const queueCountElement = document.getElementById("queueCount");
queueCountElement.textContent = patientsQueue.length;

document.getElementById("nextPatientButton").addEventListener("click", function() {
    if (currentPatientIndex < patientsQueue.length) {
        // Fetch next patient details
        const patient = patientsQueue[currentPatientIndex];

        // Update patient details on the page
        document.getElementById("patientName").textContent = patient.name;
        document.getElementById("patientContact").textContent = patient.contact;
        document.getElementById("patientEmail").textContent = patient.email;
        document.getElementById("patientGender").textContent = patient.gender;
        document.getElementById("patientTemperature").textContent = patient.temperature;
        document.getElementById("patientBloodPressure").textContent = patient.bloodPressure;
        document.getElementById("patientOxygen").textContent = patient.oxygen;

        // Move to the next patient in the queue
        currentPatientIndex++;
        // Update total queue count
        queueCountElement.textContent = patientsQueue.length - currentPatientIndex;
    } else {
        alert("No more patients in the queue.");
    }
});