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
  
  // Get the total number of tabs
chrome.tabs.query({}, function(tabs) {
    const totalCount = tabs.length;
    
    // Set the maximum number of tabs
    const MAX_TABS = 10;
  
    // Calculate the percentage of tabs used
    const percentage = Math.min((totalCount / MAX_TABS) * 100, 100);
  
    // Get the progress bar element
    const progressBar = document.getElementById("progress-bar");
  
    // Set the progress bar width
    progressBar.style.width = `${percentage}%`;
  
    // Set the progress bar text
    progressBar.textContent = `${totalCount} / ${MAX_TABS}`;
  });