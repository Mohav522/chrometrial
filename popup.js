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
  
    var progress = document.getElementById("progress");
    var percent = (count / MAX_TABS) * 100;
  
    if (count <= 7) {
      progress.style.backgroundColor = "green";
    } else {
      progress.style.backgroundColor = "red";
    }
  
    progress.style.width = percent + "%";
    progress.textContent = count;
  });
  