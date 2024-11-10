document.getElementById('open-sidebar').addEventListener('click', () => {
  const sidebar = document.getElementById('sidebar').classList.add('open')
  if (sidebar) {
    document.getElementById('close-sidebar').style.display = 'block'
  } else {
    document.getElementById('open-sidebar').style.display = 'none'
  }
})

document.getElementById('close-sidebar').addEventListener('click', () => {
  const sidebar = document.getElementById('sidebar').classList.remove('open')
  if (!sidebar) {
    document.getElementById('open-sidebar').style.display = 'block'
  } else {
    document.getElementById('close-sidebar').style.display = 'none'
  }
})
