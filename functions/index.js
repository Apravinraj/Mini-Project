const axios = require("axios");

const API_URL = "https://us-central1-blood-donation-23556.cloudfunctions.net/ext-mailsender-send-email-processDocumentCreated";
const API_TOKEN = "mlsn.895b46e46a771a822e6f90231780338122e84da06a7b33fa3513b8190d77d40a";

const sendEmail = async () => {
  try {
    const response = await axios.post(
      API_URL,
      {
        to: "recipient@example.com",  // Recipient's email address
        template: {
          name: "Blood Donation Request",  // Replace with your actual template name
          data: {
            placeholder1: "Urgent blood donation required!",  // Replace with actual template data
            placeholder2: "Patient: John Doe, Hospital: ABC Hospital",  // Example data
          },
        },
      },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,  // API token for authentication
        },
      }
    );
    console.log("Email sent:", response.data);
  } catch (error) {
    console.error("Error sending email:", error.response?.data || error.message);
  }
};

sendEmail();
