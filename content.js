const CONVERSION_RATE = 28.80;

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

    [...originals, ...finals, ...areas, ...purchases].forEach(element => {
        let oldPrice = element.innerText;

        oldPrice = oldPrice.replaceAll("$", "");
        oldPrice = oldPrice.replaceAll("USD", "");

        const price = parseFloat(oldPrice);

        const shouldConvert = (isInt(price) || isFloat(price));

        if(shouldConvert) {
            element.innerText = `${Number(price * CONVERSION_RATE).toFixed(2)} TRY`;
        }
    });
}

window.addEventListener("load", () => {
    setTimeout(() => {
        convert();
    }, 250);
});
