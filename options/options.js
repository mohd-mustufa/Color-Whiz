import * as settingsHandler from "/modules/SettingsHandler.js";

const form = document.getElementById("form");
const copytoclipboard = document.getElementById("copytoclipboard");
const colorFormatLabel = document.querySelector('label[for="color-format"]');
const colorFormatList = document.getElementById("color-format");
const message = document.getElementById("message");

window.addEventListener("load", settingsHandler.loadSettings);
form.addEventListener("submit", settingsHandler.saveSettings);
form.addEventListener("submit", showSaveMessage);

copytoclipboard.addEventListener("change", copytoclipboardHandler);

function copytoclipboardHandler() {
	if (copytoclipboard.checked) {
		colorFormatList.disabled = false;
		colorFormatLabel.classList.remove("disabled");
	} else {
		colorFormatList.disabled = true;
		colorFormatLabel.classList.add("disabled");
	}
}

function showSaveMessage() {
	message.innerText = "Options saved";
	message.style.display = "inline";
	message.style.fontSize = "13px";
	message.style.color = "#007bff";
	setTimeout(() => {
		message.innerText = "";
	}, 3000);
}
