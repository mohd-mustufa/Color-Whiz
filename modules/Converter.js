// This module helps with handling color conversions

// This function extracts the individual RGB values from an RGB color string and returns them as an array.
function extractRGBValues(color) {
	if (!color.toLowerCase().startsWith("rgb")) {
		throw new Error("Invalid color format.");
	}
	const rgbValues = color.replace(/[^\d,.]/g, "").split(",");
	if (rgbValues.length < 3 || rgbValues.length > 4) {
		throw new Error("Invalid RGB color format.");
	}
	return rgbValues;
}

// This function handles the condition where the eyeDropper returns rgba value where a = 0.
// So we remove the a and return only the rgb value
export function handleRGBA(rgbaString) {
	const [r, g, b] = extractRGBValues(rgbaString);
	return `rgb(${r}, ${g}, ${b})`;
}

// Below two functions convert the rgb color value to hexcode
export function rgbToHex(rgbString) {
	try {
		const [r, g, b] = extractRGBValues(rgbString);
		return (
			"#" +
			componentToHex(parseInt(r)) +
			componentToHex(parseInt(g)) +
			componentToHex(parseInt(b))
		);
	} catch (error) {
		console.error("Error converting RGB to HEX:", error);
		return "#fff"; // Default value in case of an error
	}
}
function componentToHex(c) {
	return c.toString(16).padStart(2, "0");
}

// Converts rgb values to hsl
export function rgbToHsl(rgbString) {
	let [r, g, b] = extractRGBValues(rgbString);
	try {
		(r /= 255), (g /= 255), (b /= 255);

		var max = Math.max(r, g, b),
			min = Math.min(r, g, b);
		var h,
			s,
			l = (max + min) / 2;

		if (max == min) {
			h = s = 0; // achromatic
		} else {
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / d + 2;
					break;
				case b:
					h = (r - g) / d + 4;
					break;
			}

			h /= 6;
		}

		return `hsl(${(360 * h.toFixed(3)).toFixed(0)}, ${(s * 100).toFixed(
			0
		)}%, ${(l * 100).toFixed(0)}%)`;
	} catch (error) {
		console.error("Error converting RGB to HSL:", error);
		return "hsl(0, 0%, 50%)"; // Default value in case of an error
	}
}
