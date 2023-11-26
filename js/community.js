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
      const global_action_link = document.querySelectorAll(
        ".global_action_link"
      );
      const marketWalletBalanceAmount = document.querySelectorAll(
        "#marketWalletBalanceAmount"
      );
      const normal_price = document.querySelectorAll(".normal_price");
      const market_listing_price = document.querySelectorAll(
        ".market_listing_price"
      );
      const market_commodity = document.querySelectorAll(
        ".market_commodity_orders_header_promote"
      );
      const td = document.querySelectorAll("td");
      const market_listing_price_with_fee = document.querySelectorAll(
        ".market_listing_price_with_fee"
      );
      const jqplot_xaxis_tick = document.querySelectorAll(".jqplot-xaxis-tick");
      const jqplot_yaxis_tick = document.querySelectorAll(".jqplot-yaxis-tick");
      const market_activity_line_item = document.querySelectorAll(
        ".market_activity_line_item"
      );
      convertSrc.convert(conversionRate, [
        ...global_action_link,
        ...marketWalletBalanceAmount,
        ...normal_price,
        ...market_listing_price,
        ...market_commodity,
        ...td,
        ...market_listing_price_with_fee,
        ...jqplot_xaxis_tick,
        ...jqplot_yaxis_tick,
        ...market_activity_line_item,
      ]);
    };

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.type === "childList" || mutation.type === "subtree") {
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
