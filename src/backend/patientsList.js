// patientsList.js
const connection = require('../db/db'); // Assuming you have a database connection file

function getPatientsList(event) {
    const query = 'SELECT * FROM patients ORDER BY fulname DESC';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching patients list:', error);
            event.reply('patients-list-error', 'Error fetching patients list');
        } else {
            event.reply('patients-list', results);
        }
    });
}

module.exports = getPatientsList;

