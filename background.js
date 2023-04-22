chrome.tabs.onCreated.addListener(function(tab) {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    if (tabs.length > 10) {
      chrome.tabs.remove(tab.id);
    }
  });
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    if (tabs.length > 10) {
      chrome.browserAction.setBadgeText({text: "10+"});
    } else {
      chrome.browserAction.setBadgeText({text: ""});
    }
  });
});

chrome.tabs.query({currentWindow: true}, function(tabs) {
  if (tabs.length > 10) {
    chrome.browserAction.setBadgeText({text: "10+"});
  } else {
    chrome.browserAction.setBadgeText({text: ""});
  }
});

var tabCount = 0;

chrome.tabs.onCreated.addListener(function(tab) {
  tabCount++;
  if (tabCount >= 10) {
    chrome.tabs.sendMessage(tab.id, {message: "max_tab_limit_reached"});
  }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  tabCount--;
});
