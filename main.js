// Electron
const { app, Menu, ipcMain } = require("electron");
const { desktopCapturer, BrowserWindow, BrowserView } = require('electron');
const fs = require('fs-extra');
const appName = app.getName();

// const path = require('path');
// // Get app directory
// // on OSX it's /Users/Yourname/Library/Application Support/AppName
// const getAppPath = path.join(app.getPath('appData'), appName);

// fs.unlink(getAppPath, () => {
//   // callback
//   alert("App data cleared");
//   // You should relaunch the app after clearing the app settings.
//   app.relaunch();
//   // app.exit();
// });

app.whenReady().then(() => {
  // Main window
  // In the preload script.
  console.log("1");
  ipcMain.handle('ping', () => 'pong');
  const window = require("./src/window");
  mainWindow = window.createBrowserWindow(app);
  try {
    require('electron-reloader')(module);
  } catch {}
  // Option 1: Uses Webtag and load a custom html file with external content
  // mainWindow.loadFile("index.html");
  mainWindow.loadURL("https://meet.google.com/gvj-fpda-jam")

  mainWindow.webContents.openDevTools();


  // ipcMain.on('execute-in-webview', (event, code) => {
  //   console.log(event);
  //   mainWindow.webContents.send('execute-in-webview', code);
  // });
  //mainWindow.loadURL(`file://${__dirname}/index.html`);

  // console.log(mainWindow);
  // Option 2: Load directly an URL if you don't need interface customization
  //mainWindow.loadURL("https://github.com");

  // Option 3: Uses BrowserView to load an URL
  //const view = require("./src/view");
  //view.createBrowserView(mainWindow);

  // Display Dev Tools
  //mainWindow.openDevTools();


  // Access the webview's webContents
  const webContents = mainWindow.webContents;
  // console.log(webContents);

  // // Execute JavaScript inside the webview
  // webContents.executeJavaScript(`
  //   try {
  //     const webview = document.querySelector('webview');
  //     if (webview) {
  //       // Attach an event listener to wait for the 'dom-ready' event
  //       webview.addEventListener('dom-ready', () => {
  //         // Accessing the DOM inside the webview
  //         const title = webview;
  //         console.log('Title inside webview:', title);
  //       });
  //     }
  //   } catch(e) {
  //     console.log("error",e)
  //   }
  // `);


  // Menu (for standard keyboard shortcuts)
  const menu = require("./src/menu");
  const template = menu.createTemplate(app.name);
  const builtMenu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(builtMenu);

  // Print function (if enabled)
  require("./src/print");
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
