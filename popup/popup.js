import * as converter from "/modules/Converter.js";

const pickColorBtn = document.getElementById("pickColorBtn");
const colorGrid = document.querySelector(".colorGrid");
const colorValue = document.querySelector(".colorValue");

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
				const displayColor = getDisplayFormat(rgbColor);
				colorGrid.style.backgroundColor = displayColor;
				colorValue.innerText = displayColor;

				// Copy color to clipboard
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
function getDisplayFormat(color) {
	const formatToDisplay = localStorage.getItem("whiz-colorFormat") || "rgb";
	if (formatToDisplay === "rgb") return color;
	else if (formatToDisplay === "hex") return converter.rgbToHex(color);
	else return converter.rgbToHsl(color);
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
