import * as converter from "/modules/Converter.js";

const pickColorBtn = document.getElementById("pickColorBtn");
const colorGrid = document.querySelector(".colorGrid");
const colorValue = document.querySelector(".colorValue");
const colorText = document.querySelector(".colorText");

setTheme();
setLastPickedColors();

pickColorBtn.addEventListener("click", async () => {
	let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

	chrome.scripting.executeScript(
		{
			target: { tabId: tab.id },
			function: pickColor,
		},
		async (injectionResults) => {
			const [data] = injectionResults;

			if (data.result) {
				// Conversion, handling and display of selected color
				const rgbColor = converter.handleRGBA(data.result.sRGBHex);
				const hslColor = converter.rgbToHsl(rgbColor);
				const hexColor = converter.rgbToHex(rgbColor);
				storeLastPickedColors(rgbColor, hslColor, hexColor);
				setLastPickedColors();

				// Copy color to clipboard
				const displayColor = getDisplayFormat(rgbColor, hslColor, hexColor);
				await copyToClipboard(displayColor);

				// Send notification to user
				showNotification(displayColor);
			}
		}
	);
});

// This function creates an eyedropper which helps in selecting a color from the screen
async function pickColor() {
	try {
		const eyeDropper = new EyeDropper();
		const selectedColor = await eyeDropper.open();
		return selectedColor;
	} catch (err) {
		console.log(err);
	}
}

// Gets the format in which the user wants to display the data
function getDisplayFormat(rgbColor, hslColor, hexColor) {
	const formatToDisplay = localStorage.getItem("whiz-colorFormat") || "rgb";
	if (formatToDisplay === "rgb") return rgbColor;
	else if (formatToDisplay === "hsl") return hslColor;
	else return hexColor;
}

// Copies the given color to the clipboard
async function copyToClipboard(color) {
	const isCopyEnabled = localStorage.getItem("whiz-copyToClipboard") || true;
	if (isCopyEnabled === true || isCopyEnabled === "true") {
		try {
			await navigator.clipboard.writeText(color);
		} catch (err) {
			console.error(err);
		}
	}
}

// Sends notification to user
function showNotification(displayColor) {
	const isNotificationEnabled =
		localStorage.getItem("whiz-showNotification") || true;
	if (isNotificationEnabled === true || isNotificationEnabled === "true") {
		chrome.runtime.sendMessage({
			action: "color_picked",
			clipboard: displayColor,
		});
	}
}

// Sets the theme
function setTheme() {
	if (localStorage.getItem("whiz-theme") === "dark") {
		document.body.classList.remove("light-theme");
		document.body.classList.add("dark-theme");
	} else {
		document.body.classList.remove("dark-theme");
		document.body.classList.add("light-theme");
	}
}

// Stores the last picked colors to the local storage
function storeLastPickedColors(rgb, hsl, hex) {
	localStorage.setItem("whiz-rgb", rgb);
	localStorage.setItem("whiz-hsl", hsl);
	localStorage.setItem("whiz-hex", hex);
}

// Retrieves the last picked colors from the local storage
function getLastPickedColors() {
	const rgb = localStorage.getItem("whiz-rgb") || "";
	const hsl = localStorage.getItem("whiz-hsl") || "";
	const hex = localStorage.getItem("whiz-hex") || "";
	return [rgb, hsl, hex];
}

// Sets the last picked colors by updating colorGrid and setting the color values on popup
function setLastPickedColors() {
	const [rgb, hsl, hex] = getLastPickedColors();
	if (rgb || hsl || hex) {
		colorText.innerText = "Last Picked: ";
		colorGrid.style.height = "33px";
		colorGrid.style.width = "33px";
		colorGrid.style.backgroundColor = rgb;
		colorValue.innerHTML =
			"<li>" + rgb + "</li><li>" + hsl + "</li><li>" + hex + "</li>";
	}
}
