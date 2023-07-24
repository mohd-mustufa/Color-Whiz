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
			console.log(injectionResults);
			const [data] = injectionResults;
			if (data.result) {
				// Handling for rgba
				const color = handleRGBA(data.result.sRGBHex);
				console.log(color);
				colorGrid.style.backgroundColor = color;
				colorValue.innerText = color;
				// Copy color to clipboard
				try {
					await navigator.clipboard.writeText(color);
				} catch (err) {
					console.error(err);
				}
			}
		}
	);
});

function handleRGBA(color) {
	if (color.startsWith("#")) return color;

	const rgbaValues = color.replace(/[^\d,.]/g, "").split(",");
	if (rgbaValues.length === 4) {
		const [r, g, b] = rgbaValues;
		return `rgb(${r}, ${g}, ${b})`;
	}
	return "red";
}

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
