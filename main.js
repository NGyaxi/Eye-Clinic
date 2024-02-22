const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const bcrypt = require('bcrypt');
const url = require('url');
const loginHandler = require('./src/backend/loginHandler');
const patientsList = require('./src/backend/patientsList');
const lastID = require('./src/backend/getPatId');
const addPat = require('./src/backend/patientsQuery');
// const fetchData = require('./fetchData');


// Handle login requests using the loginHandler module
ipcMain.on('login', loginHandler);
ipcMain.on('getPatientsList', patientsList);
ipcMain.on('lastID', lastID);
ipcMain.on('addPat', addPat);
// ipcMain.on('fetchData', fetchData);

function createWindow() {
    // Create a new BrowserWindow instance
    mainWindow = new BrowserWindow({
      width: 1200,
      height: 720,
      // Configure web preferences
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'), // Use preload script
        nodeIntegration: false, // It's recommended to set this to false for improved security
        contextIsolation: true, // Enable context isolation
      },
    });
  
    // Load the index.html file into the main window
    mainWindow.loadFile('src/index.html');
  
    // Event handler for when the main window is closed
    mainWindow.on('closed', function () {
      // Dereference the mainWindow variable
      mainWindow = null;
    });
  }
  
  // Event handler for when the Electron app is ready
  app.on('ready', function () {
    // Create the main window
    createWindow();
  
  });
  
  // Event handler for when all windows are closed
  app.on('window-all-closed', function () {
    // Quit the app when all windows are closed, except on macOS
    if (process.platform !== 'darwin') app.quit();
  });
  
  // Event handler for when the app is activated
  app.on('activate', function () {
    // Re-create the main window if it's null (e.g., after closing on macOS)
    if (mainWindow === null) createWindow();
  });