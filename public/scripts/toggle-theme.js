let currentTheme = 'light'

function applySystemTheme() {
  const prefersDarkScheme = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches
  $('body').removeClass('light-theme dark-theme')

  if (prefersDarkScheme) {
    $('body').addClass('dark-theme')
    currentTheme = 'dark'
  } else {
    $('body').addClass('light-theme')
    currentTheme = 'light'
  }
}

$(document).ready(function () {
  $('#toggle-theme').on('click', function () {
    $('body').removeClass('light-theme').addClass('dark-theme')
    currentTheme = 'dark'
  })

  $('#light-theme').on('click', function () {
    $('body').removeClass('dark-theme').addClass('light-theme')
    currentTheme = 'light'
  })

  $('#system-theme').on('click', function () {
    applySystemTheme()
    currentTheme = 'system'
  })

  $(window).on('load', function () {
    if (currentTheme === 'system') {
      applySystemTheme()
    }
  })
})
