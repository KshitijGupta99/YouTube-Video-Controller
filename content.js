console.log("Content script is running!");

function setupVideoListeners(video) {
    console.log("Video element detected!");

    video.addEventListener("play", () => {
        chrome.runtime.sendMessage({ action: "video_played" }, (response) => {
            console.log("Response from background:", response);
        });
    });

    video.addEventListener("pause", () => {
        chrome.runtime.sendMessage({ action: "video_paused" }, (response) => {
            console.log("Response from background:", response);
        });
    });

    chrome.runtime.onMessage.addListener((message) => {
        if (message.action === "pause_video") {
            video.pause();
        }
    });
}

const observer = new MutationObserver(() => {
    let video = document.querySelector("video");
    if (video) {
        observer.disconnect(); 
        setupVideoListeners(video);
    }
});
observer.observe(document.body, { childList: true, subtree: true });
