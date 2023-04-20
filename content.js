let tabCount = 0;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "getTabCount") {
    sendResponse({count: tabCount});
  }
});

chrome.tabs.onCreated.addListener(function(tab) {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    if (tabs.length > 10) {
      chrome.tabs.remove(tab.id);
    }
    else {
      tabCount = tabs.length;
    }
  });
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    tabCount = tabs.length;
  });
});