import * as converter from "/modules/converter.js";

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
				const hexColor = converter.rgbToHex(rgbColor);
				const hslColor = converter.rgbToHsl(rgbColor);
				colorGrid.style.backgroundColor = rgbColor;
				colorValue.innerText = rgbColor;

				// Copy color to clipboard
				const colorToCopy = rgbColor;
				await copyToClipboard(colorToCopy);
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

// Copies the given color to the clipboard
async function copyToClipboard(color) {
	try {
		await navigator.clipboard.writeText(color);
	} catch (err) {
		console.error(err);
	}
}
