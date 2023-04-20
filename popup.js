function updateTabCount() {
    chrome.tabs.query({ currentWindow: true }, function (tabs) {
      var tabCount = tabs.length;
      var tabCountElement = document.getElementById("tabCount");
      tabCountElement.innerText = tabCount;
      if (tabCount > 10) {
        chrome.tabs.remove(tabs[tabCount - 1].id);
      }
    });
  }