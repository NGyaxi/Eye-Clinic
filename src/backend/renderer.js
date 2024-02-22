
document.addEventListener('DOMContentLoaded', function () {

    const loginForm = document.getElementById('loginForm');
  
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent form submission
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Call your login function passing username and password
      loginUser(username, password);
    });
  
    // Function to send login information to the Electron backend
    function loginUser(username, password) {
      // Send the login information to the main process for further processing
      if (window.electron && window.electron.ipcRenderer) {
        window.electron.ipcRenderer.send('login', { username, password });
      } 
    }
  
    // Listen for the login response from the main process
    if (window.electron && window.electron.ipcRenderer) {
      window.electron.ipcRenderer.on('loginResponse', (event, response) => {
        if (response.success) {
            // Login was successful
            if (response.role === 'admin') {
                // Redirect to the admin dashboard
                window.location.href = 'dashboard.html';
            } else {
                // Redirect to the regular user dashboard
                window.location.href = 'user_dashboard.html';
            }
        } else {
            // Login failed, display the error message
            alert(response.error);
        }
    });
    
    }
    
  });

 