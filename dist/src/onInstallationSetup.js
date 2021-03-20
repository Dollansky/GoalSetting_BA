// TODO run a automatic registration request ID for datacolleciton
chrome.runtime.onInstalled.addListener(function () {
    var blacklist = ["www.reddit.com", "www.instagram.com", "www.facebook.com", "www.youtube.com", "www.netflix.com", "9gag.com"];
    chrome.storage.local.set({ blacklist: blacklist });
    chrome.storage.local.set({ mode: 'work' });
    chrome.browserAction.setIcon({ path: 'src/img/work.png' });
});
