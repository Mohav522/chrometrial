// Main resource for manifest.json - https://developer.chrome.com/docs/extensions/mv3/manifest/
// Main resource for background script - https://developer.chrome.com/docs/extensions/mv2/background_pages/
// Youtube resource - https://www.youtube.com/watch?v=m9mTzpRnOqE
// youtube resource - https://www.youtube.com/watch?v=PA_h67I-dgk
// Youtube resource - https://www.youtube.com/watch?v=gtF2nHVjqFk

// Note - i started off with creating a tab count function + tab limit function using a popup window which didn't seem right because you need to click on the extension to check the count/message. Thus i moved to the current version where the tab count and color are always visible to the user as a badge in the extension icon.
// Manisfest.json version note - Early on when i started with the json i was using a manifest v2 which is now on the verge of getting cancelled and chrome will soon discontinue it. So i had to shift to v3 which is more secure and uses the latest api names and will now allow me to upload this extension on the chrome web store.
// Main json notes - The json file has the name, version, description, icons, actions, permissions and background details. The action key triggers the event and loads the default icon and title in the browser. The permissions are set to activetabs and tabs which are needed by the extension to perform. The background script here a service worker handles events and performs actions like tab creation, tab removal, tab count and badge update.

// The background script - 

// function updateBadge(tabCount): Since we need to count the open tabs to put a max limit I have used function updateBadge(tabCount) that determines the total tab count/number of tabs currently open in the window. 
// Based on the tab count value it determines the color of the badge that will be displayed on the extension icon using chrome apis - chrome.action.setBadgeText() and chrome.action.setBadgeBackgroundColor() respectively. 

   function updateBadge(tabCount) {
    let color = "";

// Set condition - if tabcount is between 1-5 then the background color will be green for optimum number of open tabs.
    if (tabCount >= 1 && tabCount <= 5) {
        color = "#00FF00";

// Set condition - if tabcount is between 6-9 then the background color will be yellow to show user is moving towards the limit.
      } else if (tabCount >= 6 && tabCount <= 9) {
        color = "#FFFF00";

// Set condition - if tabcount is 10 then the background color will be red depicting you have reached the max limit.
      } else if (tabCount >= 10 && tabCount <= 10) {
        color = "#FF0000";
      }

// const badgeText is creating a variable named badgtext which is assigned the value of tabcount. Using this we have set a condition- if tabcount is greater than 9 then set badgetext to 10 displaying the max tab limit. If the tabcount is less than or equal to 9 then show the current tabcount using toString().
    const badgeText = tabCount > 9 ? "10" : tabCount.toString();

// The chrome api chrome.action.setBadgeText() is used to set the text/tab count displayed on the badge of the extension icon. 
    chrome.action.setBadgeText({text: badgeText});

// The chrome api chrome.action.setBadgeBackgroundColor() is used to set the background color of the badge in respect to the tab count.
    chrome.action.setBadgeBackgroundColor({color: color});
  }
  
// The chrome api event chrome.tabs.onCreated fires whenever a new tab is created. Whenever triggered it checks how many tabs are currently open in the current window using the chrome.tabs.query function. 
  chrome.tabs.onCreated.addListener(function(tab) {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
      const tabCount = tabs.length;

// if the tab count is more than ten, the newly created tab is removed using the chrome.tabs.remmove function.
      if (tabCount > 10) {
        chrome.tabs.remove(tab.id);

// Here updateBadge (tabcount) function updates the badge icon as per the new tab count.
        updateBadge(tabCount);
      } else {
        updateBadge(tabCount);
      }
    });
  });
  
// Similar to chrome.tabs.oncreated, this chrome api event listener is fired whenever a tab is closed. whenver triggered it uses the chrome.tabs.query to checks all the current tabs open and stores the number of tabs in tabcount. Then the uppdateBage function is called with the tabcount to update the new number of tabs. This keeps the badge number up to date with the current number of open tabs in the window.
  chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
    chrome.tabs.query({currentWindow: true}, function(tabs) {
      const tabCount = tabs.length;
      updateBadge(tabCount);
    });
  });

// Here chrome.tabs.query checks all the tabs in the current window when the extension is first loaded and calls for updateBadge function and tabcount variable to set the badge text ad color.
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    const tabCount = tabs.length;
    updateBadge(tabCount);
  });
  