// db.js
const mysql = require('mysql');

// Create MySQL connection
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'eye_clinic'
});

// Connect to MySQL
con.connect(function(err) {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

module.exports = con;
