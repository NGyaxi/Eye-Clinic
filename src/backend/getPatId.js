const connection = require('../db/db');

// Function to get the ID of the last patient from the database
function lastID(event) {
    const query = 'SELECT patients_id FROM patients ORDER BY id DESC LIMIT 1';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching last patient ID:', error);
            event.reply('last-patient-id-error', error);
        } else {
            if (results.length > 0) {
                const lastPatientId = results[0].patients_id;
                console.log(lastPatientId);
                event.reply('last-patient-id', lastPatientId);
            } else {
                console.error('No patients found');
                event.reply('last-patient-id-error', 'No patients found');
            }
        }
    });
}


module.exports =  lastID;
