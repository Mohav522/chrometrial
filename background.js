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

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  tabCount--;
});

function updateBadge(tabCount) {
    const badgeText = tabCount > 9 ? "10+" : tabCount.toString();
    chrome.browserAction.setBadgeText({text: badgeText});
  }
  
  chrome.tabs.onCreated.addListener(function(tab) {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
      const tabCount = tabs.length;
      if (tabCount > 10) {
        chrome.tabs.remove(tab.id);
        updateBadge(tabCount);
      } else {
        updateBadge(tabCount);
      }
    });
  });
  