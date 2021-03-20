chrome.runtime.onMessage.addListener(function (request, sender, resp) {
    // const goalIntervention: HTMLElement = document.createElement('goalIntervention');
    // goalIntervention.id = 'goalIntervention';
    // goalIntervention.textContent =
    // const input: HTMLElement = document.createElement('input');
    var banner = document.createElement("div");
    banner.className = "b";
    banner.innerHTML = "Banner Content";
    document.body.insertAdjacentHTML("afterbegin", "<div class='b'>Banner Content</div>");
});
