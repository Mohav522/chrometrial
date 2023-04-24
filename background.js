function updateBadge(tabCount) {
    let color = "";
    if (tabCount >= 1 && tabCount <= 5) {
      color = "039400"; //green
    } else if (tabCount >= 6 && tabCount <= 9) {
      color = "FFC700"; //yellow
    } else if (tabCount >= 10 && tabCount <= 10) {
      color = "A30000"; //red
    }
    const badgeText = tabCount > 9 ? "10" : tabCount.toString();
    chrome.action.setBadgeText({text: badgeText});
    chrome.action.setBadgeBackgroundColor({color: color});
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
  