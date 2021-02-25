const url = "https://canvas.chapman.edu/api/v1/courses";

chrome.runtime.onMessage.addListener(
    function(url, sender, onSuccess) {
        fetch(url)
            .then(data => response.json())

        return true;  // Will respond asynchronously.
    }
);





/*
var itemId = 12345;
var url = "https://another-site.com/price-query?itemId=" +
         encodeURIComponent(request.itemId);
fetch(url)
  .then(response => response.text())
  .then(text => parsePrice(text))
  .then(price => ...)
  .catch(error => ...)

chrome.runtime.sendMessage(
    {contentScriptQuery: "queryPrice", itemId: 12345},
    price => ...);

chrome.runtime.sendMessage( //goes to bg_page.js
      url,
      data => dataProcessFunction(data)
);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.contentScriptQuery == "queryPrice") {
      var url = "https://another-site.com/price-query?itemId=" +
              encodeURIComponent(request.itemId);
      fetch(url)
          .then(response => response.text())
          .then(text => parsePrice(text))
          .then(price => sendResponse(price))
          .catch(error => ...)
      return true;  // Will respond asynchronously.
    }
  });
*/
