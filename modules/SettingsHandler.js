const copyToClipboardCheckbox = document.getElementById("copytoclipboard");
const colorFormatLabel = document.querySelector('label[for="color-format"]');
const colorFormatList = document.getElementById("color-format");
const notificationCheckbox = document.getElementById("notification");
const darkThemeRadio = document.getElementById("dark-theme");
const lightThemeRadio = document.getElementById("light-theme");

// This function retrieves settings from localStorage and updates UI elements accordingly
export function loadSettings() {
	setClipBoardOptions();
	setColorFormat();
	setNotificationOptions();
	setTheme();
}

// This function to saves the selected options to localStorage when the form is submitted
export function saveSettings(event) {
	// Prevent the default form submission behavior
	event.preventDefault();

	saveClipboardOptions();
	saveColorFormat();
	saveNotificationOptions();
	saveTheme();
}

// Setting clipboard options
function setClipBoardOptions() {
	if (localStorage.getItem("whiz-copyToClipboard") !== null) {
		copyToClipboardCheckbox.checked =
			localStorage.getItem("whiz-copyToClipboard") === "true" ? true : false;

		// Disable the color options on start if user doesn't want to copytoclipboard
		if (!copyToClipboardCheckbox.checked) {
			colorFormatList.disabled = true;
			colorFormatLabel.classList.add("disabled");
		}
	} else {
		copyToClipboardCheckbox.checked = true;
		localStorage.setItem("whiz-copyToClipboard", true);
	}
}

// Saving clipboard options
function saveClipboardOptions() {
	if (copyToClipboardCheckbox.checked) {
		localStorage.setItem("whiz-copyToClipboard", true);
	} else {
		localStorage.setItem("whiz-copyToClipboard", false);
	}
}

// Setting color format
function setColorFormat() {
	if (localStorage.getItem("whiz-colorFormat")) {
		colorFormatList.value = localStorage.getItem("whiz-colorFormat");
	} else {
		colorFormatList.value = "rgb";
		localStorage.setItem("whiz-colorFormat", "rgb");
	}
}

// Saving the color format
function saveColorFormat() {
	localStorage.setItem("whiz-colorFormat", colorFormatList.value);
}

// Setting notification options
function setNotificationOptions() {
	if (localStorage.getItem("whiz-showNotification") !== null) {
		notificationCheckbox.checked =
			localStorage.getItem("whiz-showNotification") === "true" ? true : false;
	} else {
		notificationCheckbox.checked = true;
		localStorage.setItem("whiz-showNotification", true);
	}
}

// Saving notification options
function saveNotificationOptions() {
	if (notificationCheckbox.checked) {
		localStorage.setItem("whiz-showNotification", true);
	} else {
		localStorage.setItem("whiz-showNotification", false);
	}
}

// Setting the theme
function setTheme() {
	if (localStorage.getItem("whiz-theme") !== null) {
		const theme = localStorage.getItem("whiz-theme");
		if (theme === "dark") darkThemeRadio.checked = true;
		else lightThemeRadio.checked = true;
	} else {
		lightThemeRadio.checked = true;
		localStorage.setItem("whiz-theme", "light");
	}
}

// Saving the theme
function saveTheme() {
	if (darkThemeRadio.checked) {
		localStorage.setItem("whiz-theme", "dark");
	} else {
		localStorage.setItem("whiz-theme", "light");
	}
}
