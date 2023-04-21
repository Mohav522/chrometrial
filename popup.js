chrome.tabs.query({}, function(tabs) {
    var count = tabs.length;
  
    const MAX_TABS = 10;
  
  chrome.tabs.onCreated.addListener(function(tab) {
    
    chrome.tabs.query({currentWindow: true}, function(tabs) {
      
      if (tabs.length > MAX_TABS) {
       
        chrome.tabs.remove(tab.id);
        
        chrome.notifications.create({
          type: "basic",
          title: "Tab Limit Exceeded",
          message: "You have reached the maximum number of tabs in this window.",
          iconUrl: "icon-48.png"
        });
      }
    });
  });
  
    document.getElementById("Tab Limiter").textContent = count;
  });
  
  chrome.tabs.query({}, function (tabs) {
    var count = tabs.length;
    var MAX_TABS = 10;
  
    chrome.tabs.onCreated.addListener(function (tab) {
      chrome.tabs.query({ currentWindow: true }, function (tabs) {
        if (tabs.length > MAX_TABS) {
          chrome.tabs.remove(tab.id);
  
          chrome.notifications.create({
            type: "basic",
            title: "Tab Limit Exceeded",
            message: "You have reached the maximum number of tabs in this window.",
            iconUrl: "icon-48.png",
          });
        }
      });
    });
  
    document.getElementById("tab-counter").textContent = count;
  
    var progressBar = document.getElementById("tab-counter-bar");
  
    if (count >= 0 && count <= 7) {
      progressBar.style.backgroundColor = "#7fff00";
      progressBar.style.width = count * 10 + "%";
    } else if (count > 7 && count <= 10) {
      progressBar.style.backgroundColor = "#ff8c00";
      progressBar.style.width = count * 10 + "%";
    } else {
      progressBar.style.backgroundColor = "#ff0000";
      progressBar.style.width = "100%";
    }
  });
  