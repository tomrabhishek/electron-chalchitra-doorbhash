// Electron
const { app, Menu, ipcMain } = require("electron");
// const util = require("electron-util");
const { desktopCapturer, BrowserWindow, BrowserView } = require('electron');
// const socket = require('socket.io-client')('http://localhost:3000');
// const IS_OSX = process.platform === 'darwin';
// const fs = require('fs-extra');
// const appName = app.getName();

// const path = require('path');
// // Get app directory
// // on OSX it's /Users/Yourname/Library/Application Support/AppName
// const getAppPath = path.join(app.getPath('appData'), appName);

// fs.unlink(getAppPath, () => {
//   // callback
//   // alert("App data cleared");
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
  // try {
  //   require('electron-reloader')(module);
  // } catch {}
  // Option 1: Uses Webtag and load a custom html file with external content

  // mainWindow.webContents.session.webRequest.onHeadersReceived(
  //   { urls: ['*://*/*'] },
  //   (details, callback) => {
  //     const responseHeaders = Object.assign({}, details.responseHeaders);
  //     if (responseHeaders['X-Frame-Options'] || responseHeaders['x-frame-options']) {
  //       delete responseHeaders['X-Frame-Options'];
  //       delete responseHeaders['x-frame-options'];
  //     }

  //     callback({ cancel: false, responseHeaders });
  //   }
  // );

  let screenId;
  mainWindow.loadFile("index.html");
  // mainWindow.loadURL("https://meet.google.com/gvj-fpda-jam");

  mainWindow.webContents.on("did-finish-load", async function() {
    // const sources = await desktopCapturer.getSources({ types: ["window", "screen"] });
    // console.log(sources);
    mainWindow.webContents.session.setPermissionRequestHandler((webContents, permission, callback) => {
        // if (permission === 'media') {
          // Handle media permission request
          console.log(permission,"uguygbj")
          callback(true); // You might want to customize this based on your requirements
        // } else {
        //   callback(false);
        // }
      });
    mainWindow.webContents.session.setDisplayMediaRequestHandler((request, callback) => {
      const waitForValue = (valueCallback) => {
        ipcMain.on('source-screen', (_event, value) => {
          console.log(value, 'Received value from source-screen event');
          valueCallback(value);
        });
      };

        desktopCapturer.getSources({ types: ['window','screen'] }).then((sources) => {
          sources.map(source => {
                source.thumbnailURL = source.thumbnail.toDataURL();
                return source;
           });
            // console.log(request,sources[0])
            // console.log(sources);
            console.log('requested sources....')
        //   mainWindow.webContents.send("screen-share",sources[0]);
          mainWindow.webContents.send("show-popup", sources);
          // console.log(selectedSource, "girsahgbqreugbuq");
          waitForValue((value)=> {
            console.log(value);
            const selectedScreen = sources.find(source => source.id === value)
            callback({video:selectedScreen,enableLocalEcho:false})
          });
          
        }).catch((error) => {
          console.error('Error in getting sources:', error);
          callback({ video: null });
        });

      });
});
  mainWindow.webContents.openDevTools();

  // ipcMain.on('source-screen', (_event, value) => {
  //   console.log(value, 'Received value from source-screen event');
  //   screenId = value;
  // });


function getSourceFromRender() {
  ipcMain.on('get-source', (events, arg)=> {
    console.log('from-rendereerr',arg);
  })
}
getSourceFromRender();



  // ipcMain.on('show-popup', (events) => { 
  //   events.returnValue = 'show-popup-invoked from main'
  // });


  // createOverlayDrawingWindow();



//   // annotations
//   var robot = require("robotjs");
// robot.setMouseDelay(2);

// var twoPI = Math.PI * 2.0;
// var screenSize = robot.getScreenSize();
// var height = (screenSize.height / 2) - 10;
// var width = screenSize.width;

// for (var x = 0; x < width; x++)
// {
// 	y = height * Math.sin((twoPI * x) / width) + height;
// 	robot.moveMouse(x, y);
// }
// // Type "Hello World".
// robot.typeString("Hello World");

// // Press enter.
// robot.keyTap("enter");
// var mouse = robot.getMousePos();

// // Get pixel color in hex format.
// var hex = robot.getPixelColor(mouse.x, mouse.y);
// console.log("#" + hex + " at x:" + mouse.x + " y:" + mouse.y);



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

  // ipcMain.handle('button-clicked', (event) => {
  //   // console.log(event);
  //   console.log('Recieved event from preload');
  //   return 'Event from main'
  //   // Handle the data as needed
  // });

  // Menu (for standard keyboard shortcuts)
  const menu = require("./src/menu");
  const template = menu.createTemplate(app.name);
  const builtMenu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(builtMenu);

  // Print function (if enabled)
});



// socket.on('drawing', (data) => {
//   // Update the position of the fixed window when socket data is received
//   updateFixedWindowPosition(data);
// });

// Function to update the position of fixedWindow
// function updateFixedWindowPosition(data) {
//   if (fixedWindow) {
//       fixedWindow.setPosition(data.x, data.y);
//   }
// }


// Quit when all windows are closed.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// ipcMain.handle('electronMain:openScreenSecurity', () => util.openSystemPreferences('security', 'Privacy_ScreenCapture'));
// ipcMain.handle('electronMain:getScreenAccess', () => IS_OSX || systemPreferences.getMediaAccessStatus('screen') === 'granted');
// ipcMain.handle('electronMain:screen:getSources', () => {
//     return desktopCapturer.getSources({types: ['window', 'screen']}).then(async sources => {
//         return sources.map(source => {
//             source.thumbnailURL = source.thumbnail.toDataURL();
//             return source;
//         });
//     });
// });

