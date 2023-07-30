import * as settingsHandler from "/modules/SettingsHandler.js";

const form = document.getElementById("form");

window.addEventListener("load", settingsHandler.loadSettings);
form.addEventListener("submit", settingsHandler.saveSettings);
