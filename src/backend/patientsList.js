// patientsQueries.js
const connection = require('../db/db');

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

function getBirthdayList(event) {
    // Get the current date in MM-DD format
    const currentDate = new Date().toISOString().slice(5, 10).replace('-', '-');

    // Construct the SQL query to select patients whose dob matches the current date
    const query = `SELECT * FROM patients WHERE DATE_FORMAT(date_birth, '%m-%d') = '${currentDate}'`;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error fetching birthday list:', error);
            event.reply('birthday-list-error', 'Error fetching birthday list');
        } else {
            event.reply('birthday-list', results);
        }
    });
}


module.exports = { getPatientsList, getBirthdayList };
