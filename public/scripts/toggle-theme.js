const toggleThemeBtn = document.getElementById('toggle-theme')
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme')

  toggleThemeBtn.textContent = document.body.classList.contains('dark-theme')
    ? 'Claro'
    : 'Escuro'
})
