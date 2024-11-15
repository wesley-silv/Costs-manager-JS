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
  $('#theme-switcher').on('change', function () {
    const selectedTheme = $(this).val()

    $('body').removeClass('light-theme dark-theme')

    if (selectedTheme === 'dark') {
      $('body').addClass('dark-theme')
      currentTheme = 'dark'
    } else if (selectedTheme === 'light') {
      $('body').addClass('light-theme')
      currentTheme = 'light'
    } else if (selectedTheme === 'system') {
      applySystemTheme()
      currentTheme = 'system'
    }
  })

  $(window).on('load', function () {
    if (currentTheme === 'system') {
      applySystemTheme()
    }
  })
})
