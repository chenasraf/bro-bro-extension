const $ = document.querySelectorAll.bind(document)
const $1 = document.querySelector.bind(document)

function toggleExt(e) {
  e.stopPropagation()
  chrome.storage.local.set({ isExtOn: this.checked })
}

document.addEventListener('DOMContentLoaded', () => {
  console.log('hey, bro')
  const el = $1('#__toggle_ext_input')
  el.addEventListener('change', toggleExt)
  chrome.storage.local.get(['isExtOn'], (values) => {
    el.checked = !!values.isExtOn
  })
})
