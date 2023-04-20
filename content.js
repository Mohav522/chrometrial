let tabCount = 0;

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.command === "getTabCount") {
    sendResponse(tabCount);
  } else if (msg.command === "incrementTabCount") {
    tabCount++;
  } else if (msg.command === "decrementTabCount") {
    tabCount--;
  }
});

chrome.tabs.onCreated.addListener(function (tab) {
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    if (tabs.length > 10) {
      chrome.tabs.remove(tab.id);
    } else {
      chrome.runtime.sendMessage({ command: "incrementTabCount" });
    }
  });
});

chrome.tabs.onRemoved.addListener(function (tab) {
  chrome.runtime.sendMessage({ command: "decrementTabCount" });
});
