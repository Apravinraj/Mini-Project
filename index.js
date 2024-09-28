const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure Nodemailer using your Gmail credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pravinraj2k5@gmail.com', // Your email
        pass: 'pravin@13' // Your app password
    }
});

exports.sendMatchNotification = functions.firestore
    .document('Requests/{requestId}')
    .onCreate((snap, context) => {
        const requestData = snap.data();
        const requestedBloodGroup = requestData.bloodGroup;

        return admin.firestore().collection('Volunteers')
            .where('bloodGroup', '==', requestedBloodGroup)
            .get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching volunteers found.');
                    return null;
                }

                const promises = [];
                snapshot.forEach(doc => {
                    const volunteerEmail = doc.data().email;
                    const mailOptions = {
                        from: 'your-email@gmail.com',
                        to: volunteerEmail,
                        subject: 'Blood Request Match!',
                        text: `A blood request matching your blood group has been received. Requester Name: ${requestData.name}, Blood Group: ${requestData.bloodGroup}. Please visit your dashboard for more details.`
                    };
                    promises.push(transporter.sendMail(mailOptions));
                });

                return Promise.all(promises);
            })
            .catch(error => {
                console.error('Error sending email:', error);
            });
    });
