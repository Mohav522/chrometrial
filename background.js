function updateBadge(tabCount) {
  let color = "";
  if (tabCount >= 1 && tabCount <= 5) {
    color = "#00FF00";
  } else if (tabCount >= 6 && tabCount <= 9) {
    color = "#FFFF00";
  } else if (tabCount >= 10 && tabCount <= 10) {
    color = "#FF0000";
  }
  
  const badgeText = tabCount > 9 ? "10" : tabCount.toString();
  chrome.action.setBadgeText({ text: badgeText });
  chrome.action.setBadgeBackgroundColor({ color: color });
  
  if (tabCount >= 10) {
    chrome.windows.getCurrent(function (currentWindow) {
      chrome.tabs.query({ active: true, windowId: currentWindow.id }, function (activeTabs) {
        const activeTab = activeTabs[0];
        const message = "Maximum limit of 10 tabs reached.";
        chrome.tabs.sendMessage(activeTab.id, { message: message });
      });
    });
  }
}

chrome.tabs.onCreated.addListener(function (tab) {
  chrome.tabs.query({ currentWindow: true }, function (tabs) {
    const tabCount = tabs.length;
    if (tabCount > 10) {
      chrome.tabs.remove(tab.id);
      updateBadge(tabCount);
    } else {
      updateBadge(tabCount);
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

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "loading" && tab.status === "complete") {
    chrome.tabs.query({ currentWindow: true }, function (tabs) {
      const tabCount = tabs.length;
      if (tabCount === 11) {
        const message = "Maximum tab limit reached.";
        chrome.tabs.sendMessage(tab.id, { message: message });
      }
    });
  }
});
