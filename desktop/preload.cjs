const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('cheatcellNative', {
  platform: process.platform,
  quit: () => ipcRenderer.send('app:quit'),
  toggleFullscreen: () => ipcRenderer.invoke('app:fullscreen'),
  steam: {
    available: () => ipcRenderer.invoke('steam:available'),
    unlock: (id) => ipcRenderer.send('steam:achievement', id),
  },
});
