function updateBadge(tabCount) {
    let color = "";
    if (tabCount >= 1 && tabCount <= 5) {
      color = "green";
    } else if (tabCount >= 6 && tabCount <= 9) {
      color = "yellow";
    } else if (tabCount >= 10 && tabCount <= 10) {
      color = "red";
    }
    const badgeText = tabCount > 9 ? "10" : tabCount.toString();
    chrome.browserAction.setBadgeText({text: badgeText});
    chrome.browserAction.setBadgeBackgroundColor({color: color});
  }
  
  chrome.tabs.onCreated.addListener(function(tab) {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
      const tabCount = tabs.length;
      if (tabCount > 9) {
        chrome.tabs.remove(tab.id);
        chrome.notifications.create({
          type: "basic",
          title: "Tab Limit Exceeded",
          message: "You can't open more than 10 tabs at once!",
          iconUrl: "icon.png"
        }, function() {
          setTimeout(function() {
            chrome.notifications.clear("tab-limit-notification");
          }, 3000);
        });
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
  