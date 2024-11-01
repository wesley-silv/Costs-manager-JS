const toggleThemeBtn = document.getElementById('toggle-theme')

toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme')

  if (document.body.classList.contains('dark-theme')) {
    toggleThemeBtn.classList.replace('bi-moon-fill', 'bi-brightness-high-fill')
  } else {
    toggleThemeBtn.classList.replace('bi-brightness-high-fill', 'bi-moon-fill')
  }
})
