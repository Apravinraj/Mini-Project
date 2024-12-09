// EmailJS keys
const emailjs_user_id = "pDyLC2yaQD3chb6Uf";  // Public Key (User ID)
const emailjs_service_id = "service_4g5lz2h";  // Service ID
const emailjs_template_id = "template_8obki7c";  // Template ID

// Firebase configuration (already added in the project)
const firebaseConfig = {
    apiKey: "AIzaSyAruOmTC_0HUxr13a_qUbeFYMW_9xcqQnM",
    authDomain: "blood-donation-f4142.firebaseapp.com",
    databaseURL: "https://blood-donation-f4142-default-rtdb.firebaseio.com",
    projectId: "blood-donation-f4142",
    storageBucket: "blood-donation-f4142.firebasestorage.app",
    messagingSenderId: "1039080322274",
    appId: "1:1039080322274:web:1c44c403d74d2566781abb"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to send email via EmailJS
function sendEmail(requestData) {
    const templateParams = {
        name: requestData.name,
        requestType: requestData.requestType,
        details: requestData.details,
        contact: requestData.contact,
        email: requestData.email,
        hospitalName: requestData.hospitalName,
        hospitalAddress: requestData.hospitalAddress,
        requiredDate: requestData.requiredDate
    };

    // Send email using EmailJS
    emailjs.send(emailjs_service_id, emailjs_template_id, templateParams, emailjs_user_id)
        .then(function(response) {
            console.log('Email sent successfully:', response);
        }, function(error) {
            console.error('Error sending email:', error);
        });
}

// Function to get the registered donors and compare blood types with requests
async function checkAndSendEmailsForRequest(requestData) {
    // Get the collection of registered users from Firestore
    const usersCollectionRef = collection(db, "register");
    const usersSnapshot = await getDocs(usersCollectionRef);
    
    usersSnapshot.forEach((doc) => {
        const user = doc.data();

        // Check if the blood group of the user matches the requested blood group
        if (user.bloodGroup === requestData.bloodGroup) {
            // If it matches, send an email to the registered user
            const emailData = {
                name: user.name,
                requestType: requestData.requestType,
                details: requestData.details,
                contact: requestData.contact,
                email: user.email,
                hospitalName: requestData.hospitalName,
                hospitalAddress: requestData.hospitalAddress,
                requiredDate: requestData.requiredDate
            };
            
            sendEmail(emailData); // Send email to the matching donor
        }
    });
}

// Function to handle blood request form submission
document.getElementById('requestForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const requestData = {
        name: event.target.name.value,
        requestType: event.target.requestType.value,
        details: event.target.details.value,
        contact: event.target.contact.value,
        email: event.target.email.value,
        bloodGroup: event.target.bloodGroup.value, // Blood group in request form
        hospitalName: event.target.hospitalName.value,
        hospitalAddress: event.target.hospitalAddress.value,
        requiredDate: event.target.date.value
    };

    // Store the blood request data in Firestore (optional)
    await addDoc(collection(db, "request"), requestData);

    // Check registered donors and send emails if their blood type matches
    await checkAndSendEmailsForRequest(requestData);

    // Reset the form after submission
    document.getElementById('requestForm').reset();
    document.querySelector('.cool-alert').style.display = 'block';  // Display success message
});


