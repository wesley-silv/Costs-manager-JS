// const toggleThemeBtn = document.getElementById('toggle-theme')
// let currentTheme = 'light' // Pode ser inicializado com o tema padrão

// toggleThemeBtn.addEventListener('click', () => {
//   if (currentTheme === 'light') {
//     document.body.classList.remove('light-theme')
//     document.body.classList.add('dark-theme')
//     toggleThemeBtn.classList.replace('bi-moon-fill', 'bi-brightness-high-fill')
//     currentTheme = 'dark'
//   } else if (currentTheme === 'dark') {
//     document.body.classList.remove('dark-theme')
//     document.body.classList.add('custom-theme')
//     toggleThemeBtn.classList.replace(
//       'bi-brightness-high-fill',
//       'bi-palette-fill'
//     )
//     currentTheme = 'custom'
//   } else {
//     document.body.classList.remove('custom-theme')
//     document.body.classList.add('light-theme')
//     toggleThemeBtn.classList.replace('bi-palette-fill', 'bi-moon-fill')
//     currentTheme = 'light'
//   }
// })

const toggleThemeBtn = document.getElementById('toggle-theme')
const lightThemeBtn = document.getElementById('light-theme')
const customThemeBtn = document.getElementById('custom-theme')
const systemThemeBtn = document.getElementById('system-theme')
let currentTheme = 'light' // Inicializa com o tema padrão

// Função para aplicar o tema de acordo com o sistema operacional
function applySystemTheme() {
  const prefersDarkScheme = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
  document.body.classList.remove('light-theme', 'dark-theme', 'custom-theme')

  if (prefersDarkScheme) {
    document.body.classList.add('dark-theme')
    currentTheme = 'dark'
  } else {
    document.body.classList.add('light-theme')
    currentTheme = 'light'
  }
}

// Eventos de clique para alternar entre os temas
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.remove('light-theme', 'custom-theme')
  document.body.classList.add('dark-theme')
  currentTheme = 'dark'
})

lightThemeBtn.addEventListener('click', () => {
  document.body.classList.remove('dark-theme', 'custom-theme')
  document.body.classList.add('light-theme')
  currentTheme = 'light'
})

customThemeBtn.addEventListener('click', () => {
  document.body.classList.remove('light-theme', 'dark-theme')
  document.body.classList.add('custom-theme')
  currentTheme = 'custom'
})

systemThemeBtn.addEventListener('click', () => {
  applySystemTheme()
  currentTheme = 'system'
})

// Aplica o tema do sistema automaticamente na carga da página se o botão de tema do sistema for padrão
window.addEventListener('load', () => {
  if (currentTheme === 'system') {
    applySystemTheme()
  }
})
