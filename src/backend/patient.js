document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch patient list and the last patient ID from the main process
    function fetchData() {
        if (window.electron && window.electron.ipcRenderer) {
            window.electron.ipcRenderer.send('getPatientsList');
            window.electron.ipcRenderer.send('lastID');
        }
    }

    // Display patient list in the table
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
                    <button class="btn btn-warning" onclick="viewMoreDetails(${patient.patients_id})">View</button>
                </td>
            `;
            patientTableBody.appendChild(row);
        });
    }

    // Call the function to fetch patient list and last patient ID when the page loads
    fetchData();

    // Event listener for receiving patient list and last patient ID from the main process
    if (window.electron && window.electron.ipcRenderer) {
        window.electron.ipcRenderer.on('patients-list', (event, patients) => {
            displayPatientsList(patients);
        });

        window.electron.ipcRenderer.on('last-patient-id', (event, lastPatientId) => {
            // Set the value of the input field with the last patient ID
            const lastPatientIdInput = document.getElementById('last-patient-id');
            if (lastPatientIdInput) {
                // Ensure lastPatientId is a valid number before parsing
                const parsedLastPatientId = parseInt(lastPatientId, 10);
                if (!isNaN(parsedLastPatientId)) {
                    lastPatientIdInput.value = parsedLastPatientId + 1;
                }
            }
        });

        window.electron.ipcRenderer.on('patients-list-error', (event, errorMessage) => {
            console.error('Error fetching patient list:', errorMessage);
            alert('Error fetching patient list: ' + errorMessage);
        });
    }
});

// Function to navigate to moredetails.html with patient's ID as a parameter
function viewMoreDetails(patientId) {
    // Construct the URL with patient's ID as a parameter
    const moreDetailsURL = `patientsDetails.html?id=${patientId}`;
    // Redirect to moredetails.html
    window.location.href = moreDetailsURL;
}
