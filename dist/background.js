// TODO Check what needs to be asynchronus
// Reacts when an chrome tab is updated.
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    var url = new URL(tab.url);
    var domain = url.hostname;
    // Check if website finished loading
    if (changeInfo.status == 'complete') {
        chrome.storage.local.get(['lastDomain'], function (result) {
            // Check if new domain is called
            if (result.lastDomain !== undefined && result.lastDomain !== domain) {
                // Check if new domain is on blacklist
                var badWebsite = blacklistHandler(domain);
                if (badWebsite) {
                    console.log("This bad Domain");
                    chrome.tabs.sendMessage(tabId, { domain: domain });
                }
            }
        });
        chrome.storage.local.set({ lastDomain: domain });
    }
});
// Reacts when the user switches between tabs
chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tabs) {
        var url = new URL(tabs.url);
        var domain = url.hostname;
        chrome.storage.local.set({ lastDomain: domain });
        var badWebsite = blacklistHandler(domain);
        if (badWebsite) {
            console.log("This bad Domain");
            chrome.tabs.sendMessage(tabs[0].id, { domain: domain });
        }
        else {
            console.log("this normal domain");
        }
    });
});
// TODO handle asyn stuff fml
// blacklistHandler checks if the active window opened a blacklisted Website
function blacklistHandler(domain) {
    chrome.storage.local.get(["blacklist"], function (result) {
        console.log(result.blacklist.includes(domain));
        if (result.blacklist.includes(domain)) {
            return true;
        }
        return false;
    });
}
