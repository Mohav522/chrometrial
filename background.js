var tabCount = 0;

function updateBadge(tabCount) {
  const badgeText = tabCount > 9 ? "10" : tabCount.toString();
  chrome.browserAction.setBadgeText({text: badgeText});
}

chrome.tabs.query({currentWindow: true}, function(tabs) {
  tabCount = tabs.length;
  updateBadge(tabCount);
});

chrome.tabs.onCreated.addListener(function(tab) {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    tabCount = tabs.length;
    updateBadge(tabCount);
    if (tabCount > 10) {
      chrome.tabs.remove(tab.id);
    }
  });
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    tabCount = tabs.length;
    updateBadge(tabCount);
  });
});
