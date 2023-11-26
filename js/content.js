const requestOptions = {
  method: "GET",
  redirect: "follow",
};

const isInt = (n) => {
  return n % 1 === 0;
};

const isFloat = (n) => {
  return Number(n) === n && n % 1 !== 0;
};

export const getConversionRate = async () => {
  try {
    const dataFromLocalStorage = localStorage.getItem("conversionRate");
    if (dataFromLocalStorage) {
      const parsedData = JSON.parse(dataFromLocalStorage);
      const date = new Date(parsedData.date);
      const now = new Date();
      const diff = Math.abs(now - date);
      const minutes = Math.floor(diff / 1000 / 60);
      if (minutes < 600) {
        return parsedData.rate;
      }
    }
    const response = await fetch(
      "https://tropik-usd-try.vercel.app/api/tryusd",
      requestOptions
    );
    const result = await response.json();
    const dateFormatted = result.updated
      .split(" ")[0]
      .split(".")
      .reverse()
      .join("-");
    const timeFormatted = result.updated.split(" ")[1];
    const dateTime = new Date(`${dateFormatted}T${timeFormatted}+03:00`);

    const dataToLocalStorage = {
      rate: result.results.TRY,
      date: dateTime,
    };
    localStorage.setItem("conversionRate", JSON.stringify(dataToLocalStorage));
    return parseFloat(result.results.TRY).toFixed(2);
  } catch (e) {
    console.error("error: ", e);
    return null;
  }
};

export const convert = (conversionRate, classes) => {
  chrome.storage.local.get({ showUsd: false }, (data) => {
    [...classes].forEach((element) => {
      
      if (element.getAttribute("converted")) {
        return;
      }
      
      let oldPrice = element.innerText;
  
      if (oldPrice.includes("TRY")) {
        return;
      }
      if (!oldPrice.includes("USD") && !oldPrice.includes("$")) {
        return;
      }
  
      oldPrice = oldPrice.replaceAll("$", "");
      oldPrice = oldPrice.replaceAll("USD", "");
      const price = parseFloat(oldPrice);
      const shouldConvert = isInt(price) || isFloat(price);
      if (shouldConvert) {
        const convertedPrice = parseFloat(price * conversionRate).toFixed(2);
        element.setAttribute("converted", true);
        element.setAttribute("price-usd", price);
        element.setAttribute("price-try", convertedPrice);
        element.innerText = `${!data.showUsd ? "₺" : "$"}${ !data.showUsd ? convertedPrice : price}`;
      }
    });
  });
};
