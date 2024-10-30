const toggleThemeBtn = document.getElementById('toggle-theme')

toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme')

  if (document.body.classList.contains('dark-theme')) {
    toggleThemeBtn.classList.replace('fa-moon', 'fa-sun')
  } else {
    toggleThemeBtn.classList.replace('fa-sun', 'fa-moon')
  }
})
