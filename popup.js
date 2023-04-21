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
          // remove all existing images from the tab-images div
          while (images.firstChild) {
            images.removeChild(images.firstChild);
          }
          // create the new image and append it to the tab-images div
          var img = document.createElement("img");
          img.src = "tab" + tabs.length + ".png";
          images.appendChild(img);
        }
      });
    });
  
    // initialize the tab-images div with the first image
    var img = document.createElement("img");
    img.src = "tab1.png";
    images.appendChild(img);
  });
  