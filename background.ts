// TODO Check what needs to be asynchronus

// Reacts when an chrome tab is updated.
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    const url: URL = new URL(tab.url);
    const domain: string = url.hostname;
    // Check if website finished loading
    if (changeInfo.status == 'complete') {
        chrome.storage.local.get(['lastDomain'], (result) => {
            // Check if new domain is called
            if (result.lastDomain !== undefined && result.lastDomain !== domain) {
                // Check if new domain is on blacklist
                const badWebsite: boolean = blacklistHandler(domain);
                if (badWebsite) {
                    console.log("This bad Domain")
                    chrome.tabs.sendMessage(tabId, {domain: domain});
                }
            }
        })
        chrome.storage.local.set({lastDomain: domain});
    }
})

// Reacts when the user switches between tabs
chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tabs) {
        const url: URL = new URL(tabs.url);
        const domain: string = url.hostname;
        chrome.storage.local.set({lastDomain: domain});
        const badWebsite: boolean = blacklistHandler(domain);
        if (badWebsite) {
            console.log("This bad Domain")
            chrome.tabs.sendMessage(tabs[0].id, {domain: domain});
        } else {
            console.log("this normal domain")
        }
    })
})

// TODO handle asyn stuff fml
// blacklistHandler checks if the active window opened a blacklisted Website
function blacklistHandler(domain: string): boolean {
    chrome.storage.local.get(["blacklist"], (result) => {
        console.log(result.blacklist.includes(domain));
        if (result.blacklist.includes(domain)) {
            return true;
        }
        return false;
    })

}
