// TODO run a automatic registration request ID for datacolleciton
chrome.runtime.onInstalled.addListener(function () {
    var blacklist = ["www.reddit.com", "www.instagram.com", "www.facebook.com", "www.youtube.com", "www.netflix.com", "9gag.com"];
    console.log("onInstalledas");
    chrome.storage.local.set({ blacklist: blacklist });
});
