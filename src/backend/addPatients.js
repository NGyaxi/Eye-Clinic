
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('addPatients');
    if (!form) {
        console.error('Form element not found');
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var date = document.getElementById('date').value;
        var patients_id = document.getElementById('last-patient-id').value.trim();
        var time = document.getElementById('time').value.trim();
        var occupation = document.getElementById('occupation').value.trim();
        var organ = document.getElementById('organ').value.trim();
        var r_add = document.getElementById('res').value.trim();
        var p_add = document.getElementById('p_add').value.trim();
        var fulname = document.getElementById('fulname').value.trim();
        var fulnameError = document.getElementById('fulnameError');
        if (fulname === '') {
            fulnameError.textContent = 'fulname is required';
            event.preventDefault(); // Prevent form submission
        } else {
            fulnameError.textContent = ''; // Clear error message
        }
        
        var email = document.getElementById('email').value.trim();
        var emailError = document.getElementById('emailError');
        if (email === '') {
            emailError.textContent = 'email is required';
            event.preventDefault(); // Prevent form submission
        } else {
            emailError.textContent = ''; // Clear error message
        }

        // Validate password
        var phone = document.getElementById('phone').value.trim();
        var phoneError = document.getElementById('phoneError');
        if (phone === '') {
            phoneError.textContent = 'Phone is required';
            event.preventDefault(); // Prevent form submission
        } else {
            phoneError.textContent = ''; // Clear error message
        }

        // Validate date of birth
        var dob = document.getElementById('dob').value.trim();
        var dobError = document.getElementById('dobError');
        if (dob === '') {
            dobError.textContent = 'Date of Birth is required';
            event.preventDefault(); // Prevent form submission
        } else {
            dobError.textContent = ''; // Clear error message
        }

        // Validate date of birth
        var age = document.getElementById('age').value.trim();
        var ageError = document.getElementById('ageError');
        if (age === '') {
            ageError.textContent = 'Age is required';
            event.preventDefault(); // Prevent form submission
        } else {
            ageError.textContent = ''; // Clear error message
        }


        var gender = document.getElementById('gender').value.trim();
        var genderError = document.getElementById('genderError');
        if (gender === '') {
            genderError.textContent = 'Age is required';
            event.preventDefault(); // Prevent form submission
        } else {
            genderError.textContent = ''; // Clear error message
        }


        // Validate role selection
        var patients_type = document.getElementById('patients_type').value;
        var patients_typeError = document.getElementById('patients_typeError');
        if (patients_type === '') {
            patients_typeError.textContent = 'Select Patients type';
            event.preventDefault(); // Prevent form submission
        } else {
            patients_typeError.textContent = ''; // Clear error message
        }


        if (fulnameError.textContent || emailError.textContent || phoneError.textContent || dobError.textContent
             || ageError.textContent || genderError.textContent || patients_typeError.textContent) {
            return;
        }

        if (window.electron && window.electron.ipcRenderer) {
            window.electron.ipcRenderer.send('addPat', { fulname: fulname, email: email, phone: phone, dob: dob, 
                age: age, gender : gender, patients_type : patients_type, date : date, p_add : p_add, organ:organ,
                r_add : r_add, occupation: occupation, patients_id:patients_id, time:time  });

            window.electron.ipcRenderer.on('addPatResponse', (event, response) => {
                if (response.success) {
                    // Reset the form
                    form.reset();
                    // Show SweetAlert for success with a button
                    Swal.fire({
                        icon: 'success',
                        title: 'User added successfully',
                        showConfirmButton: true,
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        // Redirect to another page
                        window.location.href = 'users_dashboard.html'; // Change 'dashboard.html' to your desired URL
                    });
                } 
                 else {
                    // Show SweetAlert for error
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: response.error
                    });
                }
            });
        } else {
            console.error('ipcRenderer is not available.');
        }
    });
});

