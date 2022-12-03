const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onShowTranslate: (callback) => ipcRenderer.on('show-translate', callback)
});
