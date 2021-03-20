
// TODO Check what needs to be asynchronus

// TODO NEXT UP: Date Format richtig machen. Export Classen zum laufen bringen
// Reacts when an chrome tab is updated.
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    try {
        const url: URL = new URL(tab.url);
        const domain: string = url.hostname;
        // Check if website finished loading
        if (changeInfo.status == 'complete') {
            chrome.storage.local.get(['lastDomain'], (result) => {
                // Check if new domain is called
                if (result.lastDomain !== domain) {
                    // Check if new domain is on blacklist
                    chrome.storage.local.get(['blacklist'], (result) => {
                        if (result.blacklist.includes(domain)) {
                            window.console.log(domain);
                            chrome.tabs.sendMessage(tabId, {domain: domain});
                        }
                        chrome.storage.local.set({lastDomain: domain});
                    })
                }
            })
        }
    } catch (e) {
        console.log(e);
    }
})

// Reacts when the user switches between tabs
chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function (tabs) {
        try {
            const url: URL = new URL(tabs.url);
            const domain: string = url.hostname;
            chrome.storage.local.get(['blacklist'], (result) => {
                if (result.blacklist.includes(domain)) {
                    chrome.tabs.sendMessage(activeInfo.tabId, {domain: domain});
                }
                chrome.storage.local.set({lastDomain: domain});
            })
        } catch (e) {
            // Error gets thrown when opening new tab maybe just catch it with if phrase
            // Maybe send other catched errors
            console.log(e);
        }
    })
})


// Reacts when Extension Icon is clicked
chrome.browserAction.onClicked.addListener(changeMode);


// Change Mode when extension Icon is clicked. "Work" and "Break" mode are avaible
// TODO add functionality for break mode so user doesnt get Interventions
// TODO still track usage data?
// TODO activate automatically after set time or when calender is set to learn
function changeMode() {
    chrome.storage.local.get(['mode'], (result) => {
        let mode: string;
        if (result.mode === 'work') {
            mode = 'break';
        } else {
            mode = 'work';
        }
        chrome.browserAction.setIcon({path: 'src/img/' + mode + '.png'})
        chrome.storage.local.set({mode: mode});
    })
}


// function storeTimeIntervall(domain: String, startTime: Date, endTime: Date, goal?: string) {
//
// }
