// Set the maximum number of allowed tabs
const MAX_TABS = 10;

// Listen for the browser action being clicked
chrome.action.onClicked.addListener(async (tab) => {
  // Get all the tabs in the current window
  const tabs = await chrome.tabs.query({ currentWindow: true });
  
  // If the number of tabs is less than the maximum allowed, open a new tab
  if (tabs.length < MAX_TABS) {
    chrome.tabs.create({});
  }
});

// Listen for tab creation events
chrome.tabs.onCreated.addListener(async (tab) => {
  // Get all the tabs in the current window
  const tabs = await chrome.tabs.query({ currentWindow: true });
  
  // If the number of tabs is greater than the maximum allowed, close the newly created tab
  if (tabs.length > MAX_TABS) {
    chrome.tabs.remove(tab.id);
  }
});
