const copyToClipboard = document.getElementById("copytoclipboard");
const colorFormatLabel = document.querySelector('label[for="color-format"]');
const colorFormatList = document.getElementById("color-format");
const notification = document.getElementById("notification");

// This function retrieves settings from localStorage and updates UI elements accordingly
export function loadSettings() {
	// Setting color format
	if (localStorage.getItem("whiz-colorFormat")) {
		colorFormatList.value = localStorage.getItem("whiz-colorFormat");
	} else {
		colorFormatList.value = "rgb";
		localStorage.setItem("whiz-colorFormat", "rgb");
	}

	// Setting clipboard options
	if (localStorage.getItem("whiz-copyToClipboard") !== null) {
		copyToClipboard.checked =
			localStorage.getItem("whiz-copyToClipboard") === "true" ? true : false;
	} else {
		copyToClipboard.checked = true;
		localStorage.setItem("whiz-copyToClipboard", true);
	}

	// Setting notification options
	if (localStorage.getItem("whiz-showNotification") !== null) {
		notification.checked =
			localStorage.getItem("whiz-showNotification") === "true" ? true : false;
	} else {
		notification.checked = true;
		localStorage.setItem("whiz-showNotification", true);
	}
}

// Function to save the selected option to localStorage when the form is submitted
export function saveSettings(event) {
	// Prevent the default form submission behavior
	event.preventDefault();
	// Saving the color format
	localStorage.setItem("whiz-colorFormat", colorFormatList.value);

	// Saving clipboard options
	if (copyToClipboard.checked) {
		localStorage.setItem("whiz-copyToClipboard", true);
	} else {
		localStorage.setItem("whiz-copyToClipboard", false);
	}

	// Saving notification options
	if (notification.checked) {
		localStorage.setItem("whiz-showNotification", true);
	} else {
		localStorage.setItem("whiz-showNotification", false);
	}
}
