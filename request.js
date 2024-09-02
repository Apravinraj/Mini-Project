// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAruOmTC_0HUxr13a_qUbeFYMW_9xcqQnM",
    authDomain: "blood-donation-f4142.firebaseapp.com",
    databaseURL: "https://blood-donation-f4142-default-rtdb.firebaseio.com",
    projectId: "blood-donation-f4142",
    storageBucket: "blood-donation-f4142.appspot.com",
    messagingSenderId: "1039080322274",
    appId: "1:1039080322274:web:1c44c403d74d2566781abb"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the database
var requestFormDB = firebase.database().ref("RequestForm");

// Event listener for form submission
document.getElementById("bloodRequestForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var name = getElementVal("patientName");
    var age = getElementVal("patientAge");
    var bloodGroup = getElementVal("bloodGroup");
    var hospitalName = getElementVal("hospitalName");
    var hospitalAddress = getElementVal("hospitalAddress");
    var contactNumber = getElementVal("contactNumber");
    var date = getElementVal("date");

    saveDetails(name, age, bloodGroup, hospitalName, hospitalAddress, contactNumber, date);

    // Show the cool alert message
    const alertBox = document.querySelector(".cool-alert");
    alertBox.style.display = "block";

    // Hide the alert message after 3 seconds
    setTimeout(() => {
        alertBox.style.display = "none";
    }, 3000);

    // Reset the form after submission
    document.getElementById("bloodRequestForm").reset();
}

const saveDetails = (name, age, bloodGroup, hospitalName, hospitalAddress, contactNumber, date) => {
    var newRequestForm = requestFormDB.push();

    newRequestForm.set({
        name: name,
        age: age,
        bloodGroup: bloodGroup,
        hospitalName: hospitalName,
        hospitalAddress: hospitalAddress,
        contact: contactNumber,
        date: date
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};
