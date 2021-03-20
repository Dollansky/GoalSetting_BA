// TODO Check what needs to be asynchronus
// TODO NEXT UP: Date Format richtig machen. Export Classen zum laufen bringen
// Reacts when an chrome tab is updated.
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    try {
        var url = new URL(tab.url);
        var domain_1 = url.hostname;
        // Check if website finished loading
        if (changeInfo.status == 'complete') {
            chrome.storage.local.get(['lastDomain'], function (result) {
                // Check if new domain is called
                if (result.lastDomain !== domain_1) {
                    // Check if new domain is on blacklist
                    chrome.storage.local.get(['blacklist'], function (result) {
                        if (result.blacklist.includes(domain_1)) {
                            window.console.log(domain_1);
                            chrome.tabs.sendMessage(tabId, { domain: domain_1 });
                        }
                        chrome.storage.local.set({ lastDomain: domain_1 });
                    });
                }
            });
        }
    }
    catch (e) {
        console.log(e);
    }
});
// Reacts when the user switches between tabs
chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tabs) {
        try {
            var url = new URL(tabs.url);
            var domain_2 = url.hostname;
            chrome.storage.local.get(['blacklist'], function (result) {
                if (result.blacklist.includes(domain_2)) {
                    chrome.tabs.sendMessage(activeInfo.tabId, { domain: domain_2 });
                }
                chrome.storage.local.set({ lastDomain: domain_2 });
            });
        }
        catch (e) {
            // Error gets thrown when opening new tab maybe just catch it with if phrase
            // Maybe send other catched errors
            console.log(e);
        }
    });
});
// Reacts when Extension Icon is clicked
chrome.browserAction.onClicked.addListener(changeMode);
// Change Mode when extension Icon is clicked. "Work" and "Break" mode are avaible
// TODO add functionality for break mode so user doesnt get Interventions
// TODO still track usage data?
// TODO activate automatically after set time or when calender is set to learn
function changeMode() {
    chrome.storage.local.get(['mode'], function (result) {
        var mode;
        if (result.mode === 'work') {
            mode = 'break';
        }
        else {
            mode = 'work';
        }
        chrome.browserAction.setIcon({ path: 'src/img/' + mode + '.png' });
        chrome.storage.local.set({ mode: mode });
    });
}
// function storeTimeIntervall(domain: String, startTime: Date, endTime: Date, goal?: string) {
//
// }
