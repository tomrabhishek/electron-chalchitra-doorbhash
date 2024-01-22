const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),

  // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('electronApi', {
	main: {
    isOSX: () => process.platform === 'darwin',
		isWindows: () => process.platform === 'win32',
		openScreenSecurity: () => ipcRenderer.invoke('electronMain:openScreenSecurity'),
		getScreenAccess: () => ipcRenderer.invoke('electronMain:getScreenAccess'),
		getScreenSources: () => ipcRenderer.invoke('electronMain:screen:getSources'),
	}
});

contextBridge.exposeInMainWorld('api', {
  sendToMain: (channel, data) => {
    ipcRenderer.send(channel, data);
  },
});

window.addEventListener("DOMContentLoaded", () => {
//  const screen_share = document.querySelector("[jsname='hNGZQc']");
const screen_share = document.querySelector(".VfPpkd-LgbsSe");

//  const screenShare = document.qu
 const mute = document.querySelector("[jsname='Dg9Wp']");
 console.log(document.getElementById("webview"));
 console.log(screen_share);

//  const sendButtonClickEvent = async () => {
//   console.log('sending event from preload to main');
//   const result = await ipcRenderer.invoke('button-clicked');
//   console.log(result);
//  }
//  sendButtonClickEvent();

 screen_share.addEventListener("click", (event) => {
  console.log(event);
  ipcRenderer.send("share-screen");
  sendButtonClickEvent();
  console.log("clicked");
 });
});

ipcRenderer.on('SEND_SCREEN_SHARE_SOURCES', async (event, sources) => {
  const selectContainer = window.document.getElementById('screen-share-select');
  shareSourceList = sources;
  sources.forEach(obj => {
    const optionElement = document.createElement('option');
    optionElement.innerText = `${obj.name}`;
    selectContainer.appendChild(optionElement);
  });
})
