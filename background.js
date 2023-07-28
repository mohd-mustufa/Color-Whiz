// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message) => {
	if (message.action === "color_picked") {
		showNotification(message);
	}
});

function showNotification(message) {
	const notificationOptions = {
		type: "basic",
		iconUrl: "images/img_128.png",
		title: "Color Whiz - Notification",
		message: `${message.clipboard} is copied to clipboard`,
	};

	// Clear the notificationID if already exists then create a new notification with given ID
	chrome.notifications.clear("colorNotif");
	chrome.notifications.create("colorNotif", notificationOptions);
}
