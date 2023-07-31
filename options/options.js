import * as settingsHandler from "/modules/SettingsHandler.js";

const form = document.getElementById("form");
const copytoclipboard = document.getElementById("copytoclipboard");
const colorFormatLabel = document.querySelector('label[for="color-format"]');
const colorFormatList = document.getElementById("color-format");

window.addEventListener("load", settingsHandler.loadSettings);
form.addEventListener("submit", settingsHandler.saveSettings);
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
