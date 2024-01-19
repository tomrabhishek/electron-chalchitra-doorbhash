const webview = document.querySelector("webview");

// Electron experiments

const information = document.getElementById('info')
information.innerText = `  preload sending versions.chrome() (v${versions.chrome()})`;

const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // prints out 'pong'
}

func()