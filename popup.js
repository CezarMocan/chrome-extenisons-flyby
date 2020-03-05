console.log('popup script')

window.addEventListener('DOMContentLoaded', () => {
  console.log('loaded: ', document)
  document.getElementById('actionButton').addEventListener('click', () => {
    console.log('clicked!')

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { changeColors: true }, (response) => {
        console.log(response);
      });
    });

    // chrome.runtime.sendMessage({ clicked: true }, (response) => {
    //   console.log('response: ', response)
    // })
  })
})