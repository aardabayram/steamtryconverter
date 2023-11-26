window.addEventListener("load", () => {
  (async () => {
    const switchSrc = await import(chrome.runtime.getURL("js/switch.js"));
    await switchSrc.insertSwitch(document);

    const convertSrc = await import(chrome.runtime.getURL("js/content.js"));
    const conversionRate = await convertSrc.getConversionRate();

    if (!conversionRate) {
      return;
    }

    const conversionCall = () => {
      const originals = document.querySelectorAll(".discount_final_price");
      const finals = document.querySelectorAll(".discount_original_price");
      const areas = document.querySelectorAll(".game_area_dlc_price");
      const purchases = document.querySelectorAll(".game_purchase_price");
      const search = document.querySelectorAll(".match_subtitle");
      const price = document.querySelectorAll(".price");
      const headerWalletBalance = document.querySelectorAll(
        "#header_wallet_balance"
      );
      const accountName = document.querySelectorAll(".account_name");
      const whtTotal = document.querySelectorAll(".wht_total");

      convertSrc.convert(conversionRate, [
        ...originals,
        ...finals,
        ...areas,
        ...purchases,
        ...search,
        ...price,
        ...headerWalletBalance,
        ...accountName,
        ...whtTotal,
      ]);
    };

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === "childList" || mutation.type === "subtree") {
          console.log("called");
          conversionCall();
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    conversionCall();
  })();
});
