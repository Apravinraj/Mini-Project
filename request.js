// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAruOmTC_0HUxr13a_qUbeFYMW_9xcqQnM",
    authDomain: "blood-donation-f4142.firebaseapp.com",
    projectId: "blood-donation-f4142",
    storageBucket: "blood-donation-f4142.appspot.com",
    messagingSenderId: "1039080322274",
    appId: "1:1039080322274:web:1c44c403d74d2566781abb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Event listener for form submission
document.getElementById("bloodRequestForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var formData = {
        patientName: getElementVal("patientName"),
        patientAge: getElementVal("patientAge"),
        bloodGroup: getElementVal("bloodGroup"),
        hospitalName: getElementVal("hospitalName"),
        hospitalAddress: getElementVal("hospitalAddress"),
        contactNumber: getElementVal("contactNumber"),
        date: getElementVal("date")
    };

    saveBloodRequest(formData);

    // Show the alert message
    document.querySelector(".cool-alert").style.display = "block";

    // Hide the alert message after 3 seconds
    setTimeout(() => {
        document.querySelector(".cool-alert").style.display = "none";
    }, 3000);

    // Reset the form after submission
    document.getElementById("bloodRequestForm").reset();
}

const saveBloodRequest = (formData) => {
    db.collection("BloodRequests").add(formData)
        .then((docRef) => {
            console.log("Blood request added with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding blood request: ", error);
        });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};
