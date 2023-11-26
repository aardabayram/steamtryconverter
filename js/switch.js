export const insertSwitch = async (document) => {
    const data = await chrome.storage.local.get({showUsd: false});
    const style = document.createElement("style");
    
    style.innerHTML = `
    .switch-currency {
        position:fixed;
        display:flex;
        justify-content:center;
        align-items:center;
        width:40px;
        height:40px;
        bottom:20px;
        right:20px;
        background-color:#2e3a4b;
        color:#FFF;
        border-radius:50px;
        text-align:center;
    }
    `;
    document.head.appendChild(style);
    

    const switchDiv = document.createElement("div");
    switchDiv.innerHTML = `
    <a href="#" class="switch-currency">
        ${data.showUsd ? "$" : "₺"}
        </a>
    `;
    document.body.appendChild(switchDiv);

    switchDiv.addEventListener("click", async (e) => {
        e.preventDefault();
        const data = await chrome.storage.local.get({showUsd: false});
        await chrome.storage.local.set({showUsd: !data.showUsd});
        switchDiv.innerHTML = `
        <a href="#" class="switch-currency">
            ${!data.showUsd ? "$" : "₺"}
            </a>
        `;

        const elements = document.querySelectorAll("[converted]");
        [...elements].forEach((element) => {
            const usd = element.getAttribute("price-usd");
            const tryPrice = element.getAttribute("price-try");
            const converted = element.getAttribute("converted");
            if (converted) {
                element.innerText = `${!data.showUsd ? "$" : "₺"}${
                    !data.showUsd ? usd : tryPrice
                }`;
            }
        });

    });
}