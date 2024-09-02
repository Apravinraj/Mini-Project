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
var registerFormDB = firebase.database().ref("RegisterForm");

// Event listener for form submission
document.getElementById("volunteerForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var name = getElementVal("name");
    var age = getElementVal("age");
    var address = getElementVal("address");
    var bloodGroup = getElementVal("bloodGroup");
    var contact = getElementVal("contact");

    saveDetails(name, age, address, bloodGroup, contact);

    // Show the alert message
    document.querySelector(".cool-alert").style.display = "block";

    // Hide the alert message after 3 seconds
    setTimeout(() => {
        document.querySelector(".cool-alert").style.display = "none";
    }, 3000);

    // Reset the form after submission
    document.getElementById("volunteerForm").reset();
}

const saveDetails = (name, age, address, bloodGroup, contact) => {
    var newRegisterForm = registerFormDB.push();

    newRegisterForm.set({
        name: name,
        age: age,
        address: address,
        bloodGroup: bloodGroup,
        contact: contact
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};
