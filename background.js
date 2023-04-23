var tabCount = 0;

function updateBadge(tabCount) {
  var badgeColor;
  if (tabCount >= 1 && tabCount <= 5) {
    badgeColor = [0, 255, 0, 255];
  } else if (tabCount >= 6 && tabCount <= 8) {
    badgeColor = [255, 255, 0, 255];
  } else if (tabCount >= 9 && tabCount <= 10) {
    badgeColor = [255, 0, 0, 255];
  }
  const badgeText = tabCount > 9 ? "10+" : tabCount.toString();
  chrome.browserAction.setBadgeText({text: badgeText});
  chrome.browserAction.setBadgeBackgroundColor({color: badgeColor});
}

function showNotification() {
  const options = {
    type: "basic",
    title: "Tab Limit Reached",
    message: "Stop right here, there won't be an 11th!",
    iconUrl: "icon.png"
  };
  chrome.notifications.create("tabLimitNotification", options);
}

chrome.tabs.onCreated.addListener(function(tab) {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    const tabCount = tabs.length;
    if (tabCount > 10) {
      chrome.tabs.remove(tab.id);
      updateBadge(tabCount);
      showNotification();
    } else {
      updateBadge(tabCount);
    }
  });
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    const tabCount = tabs.length;
    updateBadge(tabCount);
  });
});

chrome.tabs.query({currentWindow: true}, function(tabs) {
  const tabCount = tabs.length;
  updateBadge(tabCount);
});

chrome.notifications.onClicked.addListener(function(notificationId) {
  chrome.notifications.clear(notificationId);
});
