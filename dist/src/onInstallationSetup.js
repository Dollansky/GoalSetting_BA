// TODO run a automatic registration request ID for datacolleciton
chrome.runtime.onInstalled.addListener(() => {
    const blacklist = ["www.reddit.com", "www.instagram.com", "www.facebook.com", "www.youtube.com", "www.netflix.com", "9gag.com"];
    const archive = [];
    chrome.storage.local.set({ lastDomain: { domain: "Installation Time" } });
    chrome.storage.local.set({ blacklist: blacklist });
    chrome.storage.local.set({ mode: 'work' });
    chrome.storage.local.set({ archive: archive });
    chrome.browserAction.setIcon({ path: 'src/img/work.png' });
});
// Set to 1500 = 25 min
// TODO Maybe handle youtube differently
chrome.idle.setDetectionInterval(15);
// Checks if user is afk
chrome.idle.onStateChanged.addListener((idleState) => {
    window.console.log('IdleState changed:', idleState);
    if (idleState == 'active') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            window.console.log('Idle message nbsends');
            if (tabs[0].id) {
                chrome.tabs.sendMessage(tabs[0].id, { toDo: 'Ask for Mode' });
            }
        });
    }
});
// Duplicate Code cause noone wants you to use modules i guess.
// @ts-ignore
class TimeIntervalls {
    constructor(domain, blacklisted, mode, startTime, endTime, goal) {
        this.domain = domain;
        this.goal = goal;
        this.blacklisted = blacklisted;
        this.mode = mode;
        this.startTime = startTime;
        this.endTime = endTime;
    }
}
