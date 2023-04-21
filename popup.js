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
    var images = document.getElementById("tab-images");
  
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
        } else {
          var img = document.createElement("img");
          img.src = "tab" + tabs.length + ".png";
          images.appendChild(img);
        }
      });
    });
  
    for (var i = 1; i <= count; i++) {
      var img = document.createElement("img");
      img.src = "tab" + i + ".png";
      images.appendChild(img);
    }
  });
  