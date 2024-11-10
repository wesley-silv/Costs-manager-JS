const toggleThemeBtn = document.getElementById('toggle-theme')
const lightThemeBtn = document.getElementById('light-theme')
const systemThemeBtn = document.getElementById('system-theme')
let currentTheme = 'light'

function applySystemTheme() {
  const prefersDarkScheme = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
  document.body.classList.remove('light-theme', 'dark-theme')

  if (prefersDarkScheme) {
    document.body.classList.add('dark-theme')
    currentTheme = 'dark'
  } else {
    document.body.classList.add('light-theme')
    currentTheme = 'light'
  }
}

toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.remove('light-theme')
  document.body.classList.add('dark-theme')
  currentTheme = 'dark'
})

lightThemeBtn.addEventListener('click', () => {
  document.body.classList.remove('dark-theme')
  document.body.classList.add('light-theme')
  currentTheme = 'light'
})

systemThemeBtn.addEventListener('click', () => {
  applySystemTheme()
  currentTheme = 'system'
})

window.addEventListener('load', () => {
  if (currentTheme === 'system') {
    applySystemTheme()
  }
})
