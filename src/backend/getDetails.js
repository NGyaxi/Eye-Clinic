const connection = require('../db/db');

// Function to get details of a specific patient based on their ID
function getPatientDetails(event, patientId) {
    const query = 'SELECT * FROM patients WHERE patients_id = ?';
    connection.query(query, [patientId], (error, results) => {
        if (error) {
            console.error('Error fetching patient details:', error);
            event.reply('patient-details-error', 'Error fetching patient details');
        } else {
            if (results.length > 0) {
                const patientDetails = results[0];
                event.reply('patient-details', patientDetails);
            } else {
                console.error('Patient not found');
                event.reply('patient-details-error', 'Patient not found');
            }
        }
    });
}

module.exports = getPatientDetails;

