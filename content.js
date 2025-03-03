let video = document.querySelector("video");

console.log("Content script is running!"); // Debugging check

if (video) {
    video.addEventListener("play", () => {
        chrome.runtime.sendMessage({ action: "video_played" });
    });

    video.addEventListener("pause", () => {
        chrome.runtime.sendMessage({ action: "video_paused" });
    });

    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === "pause_video") {
            video.pause();
        } else if (message.action === "resume_video") {
            video.play();
        }
    });
}
