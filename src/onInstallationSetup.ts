// TODO run a automatic registration request ID for datacolleciton
chrome.runtime.onInstalled.addListener(()=>{
    const blacklist: Array<string> = ["www.reddit.com","www.instagram.com","www.facebook.com", "www.youtube.com","www.netflix.com","9gag.com"];
    chrome.storage.local.set({blacklist: blacklist})
})
