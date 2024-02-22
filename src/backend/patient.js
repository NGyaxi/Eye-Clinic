document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch patient list from the main process
    function fetchPatientsList() {
        if (window.electron && window.electron.ipcRenderer) {
            window.electron.ipcRenderer.send('getPatientsList');
        }
    }

    // Function to display patient list in the table
    function displayPatientsList(patients) {
        const patientTableBody = document.getElementById('patient-list-body');
        patientTableBody.innerHTML = ''; // Clear previous data

        patients.forEach((patient, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${patient.patients_id}</td>
                <td>${patient.fulname}</td>
                <td>${patient.phone}</td>
                <td>${patient.patients_type}</td>
                <td>${patient.date_added}</td>
                <td>
                    <button class="btn btn-warning" onclick="editPatient(${patient.id})">View</button>
                </td>
            `;
            patientTableBody.appendChild(row);
        });
    }

    // Call the function to fetch patient list when the page loads
    fetchPatientsList();

    // Event listener for receiving patient list from the main process
    if (window.electron && window.electron.ipcRenderer) {
        window.electron.ipcRenderer.on('patients-list', (event, patients) => {
            displayPatientsList(patients);
        });
    }

    // Event listener for handling errors while fetching patient list
    if (window.electron && window.electron.ipcRenderer) {
        window.electron.ipcRenderer.on('patients-list-error', (event, errorMessage) => {
            console.error('Error fetching patient list:', errorMessage);
            alert('Error fetching patient list: ' + errorMessage);
        });
    }

    // Example function for edit action (to be implemented)
    function editPatient(id) {
        console.log('Editing patient with ID:', id);
    }
});





document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch the last patient ID from the main process
    function fetchLastPatientId() {
        if (window.electron && window.electron.ipcRenderer) {
            window.electron.ipcRenderer.send('lastID');
        }
    }

    // Fetch the last patient ID when the page loads
    fetchLastPatientId();

    // Listen for the last patient ID response from the main process
    if (window.electron && window.electron.ipcRenderer) {
        window.electron.ipcRenderer.on('last-patient-id', (event, lastPatientId) => {
            // Set the value of the input field with the last patient ID
            const lastPatientIdInput = document.getElementById('last-patient-id');
            if (lastPatientIdInput) {
                lastPatientIdInput.value = parseInt(lastPatientId, 10) + 1;
            }
        });
    }
});
