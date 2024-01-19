const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),
  // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('api', {
  sendToMain: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
});


window.addEventListener("DOMContentLoaded", () => {
 const screen_share = document.querySelector("[jsname='hNGZQc']");
 console.log(screen_share);
 screen_share.addEventListener("click", () => {
  console.log("clicked");
 });;
});

