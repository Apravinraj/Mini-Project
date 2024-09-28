// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAruOmTC_0HUxr13a_qUbeFYMW_9xcqQnM",
    authDomain: "blood-donation-f4142.firebaseapp.com",
    projectId: "blood-donation-f4142",
    storageBucket: "blood-donation-f4142.appspot.com",
    messagingSenderId: "1039080322274",
    appId: "1:1039080322274:web:1c44c403d74d2566781abb",
    databaseURL: "https://blood-donation-f4142-default-rtdb.firebaseio.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Event listener for form submission
document.getElementById("volunteerForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var name = getElementVal("name");
    var age = getElementVal("age");
    var address = getElementVal("address");
    var bloodGroup = getElementVal("bloodGroup");
    var contact = getElementVal("contact");
    var email = getElementVal("email");

    saveDetails(name, age, address, bloodGroup, contact, email);

    // Show the alert message
    document.querySelector(".cool-alert").style.display = "block";

    // Hide the alert message after 3 seconds
    setTimeout(() => {
        document.querySelector(".cool-alert").style.display = "none";
    }, 3000);

    // Reset the form after submission
    document.getElementById("volunteerForm").reset();
}

const saveDetails = (name, age, address, bloodGroup, contact, email) => {
    const newVolunteer = {
        name: name,
        age: age,
        address: address,
        bloodGroup: bloodGroup,
        contact: contact,
        email: email,
        available: true // Add available field
    };

    db.collection("Volunteers").add(newVolunteer)
        .then((docRef) => {
            console.log("Volunteer added with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding volunteer: ", error);
        });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};
