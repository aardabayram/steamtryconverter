let CONVERSION_RATE = null;

const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://tropik-usd-try.vercel.app/api/tryusd", requestOptions)
    .then(response => response.json())
    .then(result => {
        CONVERSION_RATE = parseFloat(result.results.TRY).toFixed(2);
    }
    )
    .catch(error => console.error('error: ', error));

const isInt = (n) => {
    return n % 1 === 0;
}

const isFloat = (n) => {
    return Number(n) === n && n % 1 !== 0;
}

const convert = () => {
    const originals = document.querySelectorAll(".discount_final_price");
    const finals = document.querySelectorAll(".discount_original_price");
    const areas = document.querySelectorAll(".game_area_dlc_price");
    const purchases = document.querySelectorAll(".game_purchase_price");
    const search = document.querySelectorAll(".match_subtitle");

    [...originals, ...finals, ...areas, ...purchases, ...search].forEach(element => {
        let oldPrice = element.innerText;

        if (oldPrice.includes("TRY")) {
            return;
        }

        oldPrice = oldPrice.replaceAll("$", "");
        oldPrice = oldPrice.replaceAll("USD", "");

        const price = parseFloat(oldPrice);

        const shouldConvert = (isInt(price) || isFloat(price));

        if (shouldConvert) {
            element.innerText = `${Number(price * CONVERSION_RATE).toFixed(2)} TRY`;
        }
    });
}

window.addEventListener("load", () => {

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList' || mutation.type === 'subtree') {
                convert();
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

});
