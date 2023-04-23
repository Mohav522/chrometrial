var tabCount = 0;

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
  tabCount--;
  updateBadge(tabCount);
});

function updateBadge(tabCount) {
  let badgeColor = "";
  if (tabCount >= 1 && tabCount <= 5) {
    badgeColor = "#00FF00"; // green
  } else if (tabCount >= 6 && tabCount <= 8) {
    badgeColor = "#FFFF00"; // yellow
  } else if (tabCount >= 9 && tabCount <= 10) {
    badgeColor = "#FF0000"; // red
  }
  const badgeText = tabCount > 9 ? "10" : tabCount.toString();
  chrome.browserAction.setBadgeText({text: badgeText});
  chrome.browserAction.setBadgeBackgroundColor({color: badgeColor});
}

function showNotification() {
  const message = "Stop right here, there won't be an 11th!";
  const options = {
    type: "basic",
    title: "Tab Limit Reached",
    message: message,
    iconUrl: "icon.png"
  };
  chrome.notifications.create(options);
}
