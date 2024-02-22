const connection = require('../db/db');

function addPat(event, userData) {
    const { fulname, age, patients_type, dob, phone, occupation, patients_id,
        organ, gender, email, r_add, p_add, date, time } = userData;

    // Query to check if the user already exists
    const query = `SELECT * FROM patients WHERE phone = ?`;
    connection.query(query, [phone], (error, results, fields) => {
        if (error) {
            console.error('Error checking existing patient:', error);
            event.reply('addPatResponse', { success: false, error: 'Error checking existing patient' });
            return;
        }

        if (results && results.length > 0) {
            // User with the provided phone number already exists
            console.error('Patients already exists');
            event.reply('addPatResponse', { success: false });
        } else {
            // Insert the user into the database
            const insertQuery = 'INSERT INTO patients (fulname, age, patients_type, date_birth, phone, occupation, patients_id, organization, gender, email, res_address, postal_add, date_added, time) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            connection.query(insertQuery, [fulname, age, patients_type, dob, phone, occupation, patients_id, organ,
                gender, email, r_add, p_add, date, time], (err, result) => {
                    if (err) {
                        console.error('Error adding user to database:', err);
                        event.reply('addPatResponse', { success: false, error: 'Error adding user to database' });
                        return;
                    }
                    console.log('Patients added successfully');
                    event.reply('addPatResponse', { success: true });
                });
        }
    });
}

module.exports = addPat;
