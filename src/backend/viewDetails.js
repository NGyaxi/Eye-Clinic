document.addEventListener('DOMContentLoaded', function () {
    // Get the patient ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const patientId = urlParams.get('id');
    console.log(patientId);
    
    // Function to fetch patient details from the main process
    function fetchPatientDetails(patientId) {
        if (window.electron && window.electron.ipcRenderer) {
            window.electron.ipcRenderer.send('getPatientDetails', patientId);
        }
    }

    // Function to display patient details on the page
    function displayPatientDetails(patient) {
        const patientDetailsDiv = document.getElementById('patient-details');
        patientDetailsDiv.innerHTML = `
            <p><strong>Patient ID:</strong> ${patient.patients_id}</p>
            <p><strong>Name:</strong> ${patient.fulname}</p>
            <p><strong>Phone:</strong> ${patient.phone}</p>
            <p><strong>Type:</strong> ${patient.patients_type}</p>
            <p><strong>Date Added:</strong> ${patient.date_added}</p>
            <!-- Add more details as needed -->
        `;
    }

    // Call the function to fetch patient details when the page loads
    fetchPatientDetails(patientId);

    // Event listener for receiving patient details from the main process
    if (window.electron && window.electron.ipcRenderer) {
        window.electron.ipcRenderer.on('patient-details', (event, patient) => {
            displayPatientDetails(patient);
        });
    }
});
