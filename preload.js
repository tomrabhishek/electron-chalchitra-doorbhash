const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld('versions', {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
//   ping: () => ipcRenderer.invoke('ping'),

//   // we can also expose variables, not just functions
// })


const windowApi = {
  source: (source) => ipcRenderer.send("get-source", source),
  // showPopup: () => ipcRenderer.sendSync("show-popup")
  showPopup: (callback) => ipcRenderer.on('show-popup', (_event, value) => callback(value)),
  sourceScreen: (value) => ipcRenderer.send('source-screen', value)
};
contextBridge.exposeInMainWorld('api', windowApi);

// contextBridge.exposeInMainWorld('electronApi', {
// 	main: {
//     // isOSX: () => process.platform === 'darwin',
// 		// isWindows: () => process.platform === 'win32',
// 		// openScreenSecurity: () => ipcRenderer.invoke('electronMain:openScreenSecurity'),
// 		// getScreenAccess: () => ipcRenderer.invoke('electronMain:getScreenAccess'),
// 		// getScreenSources: () => ipcRenderer.invoke('electronMain:screen:getSources'),
//     getScreenSource: (callback) => ipcRenderer.on('screen-sources', (_event, value) => callback(value))
// 	}
// });

// setInterval(() => {
//   const screen_share = document.querySelector(".VfPpkd-LgbsSe");
//   if(screen_share){
//     screen_share.setAttribute('onclick', 'function() {alert("buttonCLicked")}');
//   }
// },300);\

document.addEventListener("click", function (e) {
  var clickedElement = e.target;
  console.log("click",clickedElement);

  // Send an IPC message to the main process
  ipcRenderer.send("window-data","clickedElement");
});

document.addEventListener("DOMContentLoaded", () => {
const iframe = document.getElementById("webview");
console.log(iframe);
iframe.addEventListener('load', function() {
    console.log(document.querySelectorAll("[jsname='YPqjbf']"));
    const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

    // const share_button = iframeDocument.querySelector("[jsname='hNGZQc']");
    // console.log(share_button);
    

    console.log(iframeDocument.getElementsByClassName("ye1V6b"));
    iframeDocument.addEventListener('mouseup', function (e) {
      console.log(e);
        var clickedElement = e.target;
   
        // clickedElement.addEventListener('click', function(){

        //   console.log('clicked share....')
        // });
        console.log("click",clickedElement);
      ipcRenderer.send("window-data", "clickedElement");
    });
    console.log("DOM content loaded inside iframe");
});
console.log("dom content loaded 1")

//  var e = setInterval(() => {
//   console.log("RUNNING: ", " screen share");
//   const t = document.querySelectorAll("[jsname='hNGZQc']");
//   t[0].click(),
//   clearInterval(e));
// }, 300);

//  const sendButtonClickEvent = async () => {
//   console.log('sending event from preload to main');
//   const result = await ipcRenderer.invoke('button-clicked');
//   console.log(result);
//  }
//  sendButtonClickEvent();

//  screen_share.addEventListener("click", (event) => {
//   console.log(event);
//   ipcRenderer.send("share-screen");
//   sendButtonClickEvent();
//   console.log("clicked");
//  }, true);
  ipcRenderer.send("window-data", "data");
});

// ipcRenderer.on('SEND_SCREEN_SHARE_SOURCES', async (event, sources) => {
//   const selectContainer = window.document.getElementById('screen-share-select');
//   shareSourceList = sources;
//   sources.forEach(obj => {
//     const optionElement = document.createElement('option');
//     optionElement.innerText = `${obj.name}`;
//     selectContainer.appendChild(optionElement);
//   });
// })
