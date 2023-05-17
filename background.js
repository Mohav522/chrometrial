const MAX_TAB_LIMIT = 10;

function updateBadge(tabCount) {
  let color = "";
  if (tabCount >= 1 && tabCount <= 5) {
    color = "#00FF00";
  } else if (tabCount >= 6 && tabCount <= 9) {
    color = "#FFFF00";
  } else if (tabCount >= MAX_TAB_LIMIT) {
    color = "#FF0000";
  }

  const badgeText = tabCount > MAX_TAB_LIMIT ? `${MAX_TAB_LIMIT}+` : tabCount.toString();
  chrome.action.setBadgeText({ text: badgeText });
  chrome.action.setBadgeBackgroundColor({ color: color });

  if (tabCount === MAX_TAB_LIMIT) {
    chrome.windows.getCurrent(function (currentWindow) {
      chrome.tabs.query({ active: true, windowId: currentWindow.id }, function (activeTabs) {
        const activeTab = activeTabs[0];
        const message = "Maximum limit of 10 tabs reached.";
        chrome.tabs.executeScript(activeTab.id, {
          code: `alert("${message}");`
        });
      });
    });
  }
}

chrome.tabs.onCreated.addListener(function (tab) {
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    const tabCount = tabs.length;
    updateBadge(tabCount);
    if (tabCount > MAX_TAB_LIMIT) {
      chrome.tabs.remove(tab.id);
    }
  });
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    const tabCount = tabs.length;
    updateBadge(tabCount);
  });
});

chrome.tabs.query({ currentWindow: true }, function (tabs) {
  const tabCount = tabs.length;
  updateBadge(tabCount);
});
