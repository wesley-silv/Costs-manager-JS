$(document).ready(function () {
  $('#open-sidebar').on('click', function () {
    $('#sidebar').addClass('open')
    $('#close-sidebar').css('display', 'block')
    $('#open-sidebar').css('display', 'none')
  })

  $('#close-sidebar').on('click', function () {
    $('#sidebar').removeClass('open')
    $('#open-sidebar').css('display', 'block')
    $('#close-sidebar').css('display', 'none')
  })
})
