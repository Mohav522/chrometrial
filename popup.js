chrome.tabs.query({}, function(tabs) {
    var count = tabs.length;
  
    const MAX_TABS = 10;
  
  chrome.tabs.onCreated.addListener(function(tab) {

    var img = document.createElement("img");
img.src = "tab" + tabs.length + ".png";
img.style.maxWidth = "100%"; // add this line to make the image fit within the card element
img.style.height = "auto"; // add this line to maintain the aspect ratio of the image
card.appendChild(img);

    
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
          // Remove existing images
          while (images.firstChild) {
            images.removeChild(images.firstChild);
          }
  
          // Add image for current tab count
          var img = document.createElement("img");
          img.src = "tab" + tabs.length + ".png";
          images.appendChild(img);
        }
      });
    });
  
    // Add initial image(s)
    while (images.firstChild) {
      images.removeChild(images.firstChild);
    }
    var img = document.createElement("img");
    img.src = "tab" + count + ".png";
    images.appendChild(img);
  });
  