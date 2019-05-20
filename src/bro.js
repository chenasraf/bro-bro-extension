function doIt() {
  const els = document.querySelectorAll('.userContent[data-testid=post_message]')
  els.forEach(el => {
    const inners = el.childNodes
    inners.forEach(inner => {
      wrapWithBro(inner)
    })
  })
}

function wrapWithBro(el) {
  if (el && !el.classList.contains('__brolang_parsed')) {
    const lang = el.innerText.search(/[\u0590-\u05FF]/) > -1 ? 'he' : 'en'
    el.classList.add(`__brolang_${lang}`, `__brolang_tag_${el.tagName.toLocaleLowerCase()}`)
  }
}

let timer

function turnOff() {
  if (timer) {
    clearInterval(timer)
  }
}

function turnOn() {
  turnOff()
  timer = setInterval(doIt, 1000)
  doIt()
}

chrome.storage.local.get(['afterFirstRun', 'isExtOn'], (results) => {
  if (!results.afterFirstRun) {
    chrome.storage.local.set({ afterFirstRun: true, isExtOn: true }, () => {
      turnOn()
    })
  }

  if (results.isExtOn) {
    turnOn()
  }
})
