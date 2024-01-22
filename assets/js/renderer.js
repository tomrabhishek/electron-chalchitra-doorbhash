const webview = document.querySelector("webview");

// Electron experiments

// const information = document.getElementById('info')
// information.innerText = `  preload sending versions.chrome() (v${versions.chrome()})`;

const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // prints out 'pong'
}

func()

const main = window.electronApi.main;

const video = document.querySelector('#stream');
const startBtn = document.querySelector('#start_share');
const stopBtn = document.querySelector('#stop_share');
const openSettingsBtn = document.querySelector('#system-preferences');
const screenPicker = document.querySelector('#electron-screen-picker');

const displayMediaOptions = {
	video: {
		displaySurface: "window",
	},
	audio: false,
};

navigator.mediaDevices.getDisplayMedia = getDisplayMedia;

// Set event listeners for the start, stop and openSettings buttons
startBtn.addEventListener("click", startCapture, false);
stopBtn.addEventListener("click", stopCapture, false);
openSettingsBtn.addEventListener("click", openPreferences, false);

async function startCapture() {
	try {
		video.srcObject = await navigator.mediaDevices.getDisplayMedia(
			displayMediaOptions
		);
		startBtn.classList = 'hidden';
		stopBtn.classList = '';
	} catch (err) {
		console.error(err);
	}
}

function stopCapture(evt) {
	if (!video.srcObject) return;
	
	let tracks = video.srcObject.getTracks();

	tracks.forEach((track) => track.stop());
	video.srcObject = null;
	startBtn.classList = '';
	stopBtn.classList = 'hidden';
}

function openPreferences() {
	main.openScreenSecurity();
}

let screenPickerOptions = {
	system_preferences: false
};

function getDisplayMedia() {
	if (main.isOSX()) {
		screenPickerOptions.system_preferences = true;
	}

	return new Promise(async (resolve, reject) => {
		let has_access = await main.getScreenAccess();
		if (!has_access) {
			return reject('none');
		}

		try {
			const sources = await main.getScreenSources();
			screenPickerShow(sources, async (id) => {
				try {
					const source = sources.find(source => source.id === id);
					if (!source) {
						return reject('none');
					}

					const stream = await window.navigator.mediaDevices.getUserMedia({
						audio: false,
						video: {
							mandatory: {
								chromeMediaSource: 'desktop',
								chromeMediaSourceId: source.id
							}
						}
					});
					resolve(stream);
				}
				catch (err) {
					reject(err);
				}
			}, {});
		}
		catch (err) {
			reject(err);
		}
	});
}

function screenPickerShow(sources, onselect) {
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