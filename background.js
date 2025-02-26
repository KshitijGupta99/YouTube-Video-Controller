let activeTabId = null;

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed!");
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Received message:", message);

    if (message.action === "video_played") {
        console.log("Video played message received!");

        if (activeTabId && activeTabId !== sender.tab.id) {
            chrome.tabs.sendMessage(activeTabId, { action: "pause_video" });
        }
        activeTabId = sender.tab.id;

        sendResponse({ status: "ok" });
    }

    if (message.action === "video_paused") {
        if (activeTabId === sender.tab.id) {
            activeTabId = null;
        }
        sendResponse({ status: "paused" });
    }
});
