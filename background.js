let activeTabId = null;
let lastPausedTabId = null;

chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension Installed!");
});

chrome.runtime.onMessage.addListener((message, sender) => {
    if (message.action === "video_played") {
        if (activeTabId && activeTabId !== sender.tab.id) {
            chrome.tabs.sendMessage(activeTabId, { action: "pause_video" });
            lastPausedTabId = activeTabId; // Store last paused video
        }
        activeTabId = sender.tab.id;
    }

    if (message.action === "video_paused") {
        if (activeTabId === sender.tab.id) {
            activeTabId = null;

            // Resume the last paused video
            if (lastPausedTabId) {
                chrome.tabs.sendMessage(lastPausedTabId, { action: "resume_video" });
                activeTabId = lastPausedTabId; // Update active tab to the resumed one
                lastPausedTabId = null;
            }
        }
    }
});
