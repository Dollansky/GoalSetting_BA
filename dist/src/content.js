chrome.runtime.onMessage.addListener(function (request, sender, resp) {
    // Maybe here [Intervention1] Liste [Intervention2] ....
    if (request.domain === 'www.youtube.com') {
        console.log(document.getElementById('category'));
    }
    // const goalIntervention: HTMLElement = document.createElement('goalIntervention');
    // goalIntervention.id = 'goalIntervention';
    // goalIntervention.textContent =
    // const input: HTMLElement = document.createElement('input');
    var banner = document.createElement("div");
    banner.className = "b";
    banner.innerHTML = "Banner Contensst";
    document.body.insertAdjacentHTML("afterbegin", "<div class='b'>Banner Content</div>");
});
