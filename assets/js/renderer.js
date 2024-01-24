// const information = document.getElementById('info')
// information.innerText = `  preload sending versions.chrome() (v${versions.chrome()})`;

// const { ipcRenderer, contextBridge } = require("electron");

// const func = async () => {
//   const response = await window.versions.ping()
//   console.log(response) // prints out 'pong'
// }

// func()

const openSettingsBtn = document.querySelector('#system-preferences');
const screenPicker = document.querySelector('#electron-screen-picker');


// event controll


// setInterval(() => {

// console.log(document);
// const iframe = document.getElementById("webview");
// console.log(iframe);
// iframe.addEventListener('load', function() {
//     console.log(document.querySelectorAll("[jsname='YPqjbf']"));
//     const iframeDocument = gmeetIframe.contentDocument || gmeetIframe.contentWindow.document;
//     console.log(iframeDocument.getElementsByClassName("ye1V6b"));
//     iframeDocument.addEventListener('mouseup', function (e) {
//         var clickedElement = e.target;
//         console.log("click",clickedElement);
//       ipcRenderer.send("window-data", "clickedElement");
//     });

//     console.log("DOM content loaded inside iframe");
// });
// let iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
// // console.log(iframeDocument);
// let bodyElement = iframeDocument.body;
// // console.log(bodyElement);
// const screen_share = document.querySelector("[jsname='hNGZQc']");
// // console.log(screen_share);
// }, 3000);

// const displayMediaOptions = {
// 	video: {
// 		displaySurface: "window",
// 	},
// 	audio: false,
// };

window.api.source(0);
// console.log(window.api.showPopup());
// console.log(window.api.showPopup())


window.api.showPopup((sources) => {
	let source;
	screenPickerShow(sources, async (id) => {
		console.log(id);
		try {
			source = sources.find(source => source.id == id);
			sendSource(source);
			if (!source) {
				return 'none';
			}
		}
		catch (err) {
			console.log(err.innerText)
		}
	}, {});
	
})

function sendSource(source) {
  window.api.sourceScreen(source.id); 
  console.log('sent to source');
}

// Set event listeners for the start, stop and openSettings buttons
// openSettingsBtn.addEventListener("click", openPreferences, false);

// async function startCapture() {
// 	try {
// 		video.srcObject = await navigator.mediaDevices.getDisplayMedia(
// 			displayMediaOptions
// 		);
// 		startBtn.classList = 'hidden';
// 		stopBtn.classList = '';
// 	} catch (err) {
// 		console.error(err);
// 	}
// }

// function stopCapture(evt) {
// 	if (!video.srcObject) return;
	
// 	let tracks = video.srcObject.getTracks();

// 	tracks.forEach((track) => track.stop());
// 	video.srcObject = null;
// 	startBtn.classList = '';
// 	stopBtn.classList = 'hidden';
// }

// function openPreferences() {
// 	main.openScreenSecurity();
// }

let screenPickerOptions = {
	system_preferences: false
};

// // function getDisplayMedia() {
// // 	if (main.isOSX()) {
// // 		screenPickerOptions.system_preferences = true;
// // 	}

// // 	return new Promise(async (resolve, reject) => {
// // 		let has_access = await main.getScreenAccess();
// // 		if (!has_access) {
// // 			return reject('none');
// // 		}

// // 		try {
// // 			const sources = await main.getScreenSources();
// // 			screenPickerShow(sources, async (id) => {
// // 				try {
// // 					const source = sources.find(source => source.id === id);
// // 					if (!source) {
// // 						return reject('none');
// // 					}

// // 					const stream = await window.navigator.mediaDevices.getUserMedia({
// // 						audio: false,
// // 						video: {
// // 							mandatory: {
// // 								chromeMediaSource: 'desktop',
// // 								chromeMediaSourceId: source.id
// // 							}
// // 						}
// // 					});
// // 					resolve(stream);
// // 				}
// // 				catch (err) {
// // 					reject(err);
// // 				}
// // 			}, {});
// // 		}
// // 		catch (err) {
// // 			reject(err);
// // 		}
// // 	});
// // }

function screenPickerShow(sources, onselect) {
	// console.log(sources);
	const list = document.querySelector('#sources');
	list.innerHTML = '';

	sources.forEach(source => {
		const item = document.createElement('div');
		item.classList = '__electron-list';

		const wrapper = document.createElement('div');
		wrapper.classList = 'thumbnail __electron-screen-thumbnail';

		const thumbnail = document.createElement('img');
		thumbnail.src = source.thumbnailURL;

		const label = document.createElement('div');
		label.classList = '__electron-screen-name';
		label.innerText = source.name;

		wrapper.append(thumbnail);
		wrapper.append(label);
		item.append(wrapper);
		item.onclick = () => {
			console.log('itemclicked');
			onselect(source.id);
			MicroModal.close('electron-screen-picker');
		};
		list.append(item);
	});
	
	if (!screenPickerOptions.system_preferences) {
		openSettingsBtn.classList = 'hidden';
	}

	MicroModal.show('electron-screen-picker');
}