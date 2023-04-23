let tabCount = 0;

function updateBadge(tabCount) {
  const badgeText = tabCount > 9 ? "10" : tabCount.toString();
  chrome.browserAction.setBadgeText({ text: badgeText });
  
  let badgeColor = "";
  if (tabCount >= 1 && tabCount <= 5) {
    badgeColor = "#00FF00"; // green
  } else if (tabCount >= 6 && tabCount <= 9) {
    badgeColor = "#FFFF00"; // yellow
  } else if (tabCount >= 10 && tabCount <= 10) {
    badgeColor = "#FF0000"; // red
  }
  
  chrome.browserAction.setBadgeBackgroundColor({ color: badgeColor });
}

function handleTabCount(tabs) {
  tabCount = tabs.length;
  
  if (tabCount > 10) {
    chrome.tabs.query({ currentWindow: true, active: true }, function(tabs) {
      if (tabs[0]) {
        chrome.tabs.remove(tabs[0].id);
      }
    });
  }
  
  updateBadge(tabCount);
}

chrome.tabs.onCreated.addListener(function(tab) {
  chrome.tabs.query({ currentWindow: true }, handleTabCount);
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  chrome.tabs.query({ currentWindow: true }, handleTabCount);
});

chrome.tabs.query({ currentWindow: true }, handleTabCount);
