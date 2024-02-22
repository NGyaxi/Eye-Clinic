// preload.js

const { contextBridge, ipcRenderer } = require('electron');

// Expose ipcRenderer to the window object in a secure way
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel, data) => {
      ipcRenderer.send(channel, data);
    },
    on: (channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => func(event, ...args));
    },
  },
});
