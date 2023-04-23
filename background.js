var tabCount = 0;

function updateBadge(tabCount) {
  var badgeText = "";
  var badgeColor = "";
  if (tabCount > 0 && tabCount <= 5) {
    badgeText = tabCount.toString();
    badgeColor = "#00b300"; // green
  } else if (tabCount > 5 && tabCount <= 8) {
    badgeText = tabCount.toString();
    badgeColor = "#ffff4d"; // yellow
  } else if (tabCount > 8 && tabCount <= 10) {
    badgeText = tabCount.toString();
    badgeColor = "#ff0000"; // red
  } else if (tabCount > 10) {
    badgeText = "10+";
    badgeColor = "#ff0000"; // red
  }
  chrome.browserAction.setBadgeText({text: badgeText});
  chrome.browserAction.setBadgeBackgroundColor({color: badgeColor});
}

function showAlert() {
  var opt = {
    type: "basic",
    title: "Tab limit exceeded",
    message: "Stop right here, there won't be an 11th!",
    iconUrl: "icon.png"
  };
  chrome.notifications.create(opt);
}

chrome.tabs.onCreated.addListener(function(tab) {
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    const tabCount = tabs.length;
    if (tabCount > 10) {
      chrome.tabs.remove(tab.id);
      showAlert();
    }
    updateBadge(tabCount);
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

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({url: "popup.html"});
});
