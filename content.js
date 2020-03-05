setTimeout(function() {
  console.log("This is our content script!")
  console.log(window)
}, 1000)

const getRandomByte = () => {
  return parseInt(Math.floor(Math.random() * 256))
}

const getRandomColor = () => {
  let r = getRandomByte(), g = getRandomByte(), b = getRandomByte();
  return `rgb(${r}, ${g}, ${b})`
}

const sleep = (t) => new Promise((res, rej) => { setTimeout(res, t) })

const manipulateDOM = async (el) => {
  el.style.backgroundColor = getRandomColor()
  el.style.color = 'transparent'
  if (el.tagName == 'img' || el.tagName == 'svg' || el.src) el.style.visibility = 'hidden'
  await sleep(50)
  let ch = el.children
  for (let i = 0; i < ch.length; i++) {
    await manipulateDOM(ch[i])
  }
}

window.addEventListener('DOMContentLoaded', function(event) {
  alert('The website is now loaded!')
  window.addEventListener('keypress', (event) => {
    if (event.key == 'e') {
      manipulateDOM(document.body)
    }
  })
  // manipulateDOM(document.body)
})

chrome.runtime.onMessage.addListener( (request, sender, sendResponse) => {
  console.log('Req: ', request)
  if (request.changeColors) {
    manipulateDOM(document.body)
    sendResponse({ ok: true })
  }
})