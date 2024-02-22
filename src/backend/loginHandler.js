const bcrypt = require('bcrypt');
const connection = require('../db/db');

function handleLogin(event, { username, password }) {
  const query = `SELECT * FROM userstable WHERE username = '${username}'`;
  connection.query(query, (error, results, fields) => {
    if (error) {
      event.reply('loginResponse', { success: false, error: 'Database error' });
    } else if (results.length > 0) {
      // User with the provided username exists
      const user = results[0]; // Assuming username is unique
      const hashedPassword = user.password; // Retrieve hashed password from database
      
      // Compare the provided password with the hashed password stored in the database
      bcrypt.compare(password, hashedPassword, (err, result) => {
        if (result) {
          // Passwords match, login successful
          const role = user.role; // Assuming 'role' is a field in the database
          if (role === 'Admin') {
            event.reply('loginResponse', { success: true, role: 'admin' });
          } else {
            event.reply('loginResponse', { success: true, role: 'user' });
          }
            
          // Set session variables
          event.sender.session.loggedIn = true;
          event.sender.session.username = username;

        } else {
          // Passwords don't match, login failed
          event.reply('loginResponse', { success: false, error: 'Invalid password' });
        }
      });
    } else {
      // User with the provided username does not exist
      event.reply('loginResponse', { success: false, error: 'Invalid username' });
    }
  });
}

module.exports = handleLogin;
