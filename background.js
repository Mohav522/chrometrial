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

  var tabCount = 0;
var notificationTimeoutId = null;

function updateBadge(tabCount) {
  const badgeText = tabCount > 9 ? "10+" : tabCount.toString();
  const color = tabCount > 8 ? "red" : (tabCount > 5 ? "yellow" : "green");
  chrome.browserAction.setBadgeText({text: badgeText});
  chrome.browserAction.setBadgeBackgroundColor({color: color});
}

function showNotification() {
  const message = "Stop right here, there won't be an 11th!";
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon.png',
    title: 'Tab Limit Reached',
    message: message
  });
  notificationTimeoutId = setTimeout(function() {
    chrome.notifications.clear(notificationId);
  }, 3000);
}

chrome.tabs.onCreated.addListener(function(tab) {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    tabCount = tabs.length;
    if (tabCount > 10) {
      chrome.tabs.remove(tab.id);
      showNotification();
    } else {
      updateBadge(tabCount);
    }
  });
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    tabCount = tabs.length;
    updateBadge(tabCount);
    if (notificationTimeoutId !== null) {
      clearTimeout(notificationTimeoutId);
      notificationTimeoutId = null;
      chrome.notifications.clear();
    }
  });
});
