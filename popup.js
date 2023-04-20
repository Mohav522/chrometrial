// Get the tab count and update the UI
function updateTabCount() {
    chrome.tabs.query({ currentWindow: true }, function (tabs) {
      var tabCount = tabs.length;
      var tabCountElement = document.getElementById("tabCount");
      tabCountElement.innerText = tabCount;
      if (tabCount >= 10) {
        chrome.tabs.create({ url: "chrome://newtab" }, function () {
          alert("You have reached the maximum limit of 10 tabs per window.");
        });
      }
    });
  }
  
  // Update the tab count when the popup is opened
  document.addEventListener("DOMContentLoaded", function () {
    updateTabCount();
  });
  
  // Update the tab count when a tab is created or removed
  chrome.tabs.onCreated.addListener(updateTabCount);
  chrome.tabs.onRemoved.addListener(updateTabCount);
  