const express = require('express')
const path = require('path')
const session = require('express-session')
const app = express()
const port = process.env.PORT || 3000

// Middleware to sections manager
app.use(
  session({
    secret: 'secret-key', // Use the hard secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Config such as 'true' in production in HTTPS
  })
)

// Middleware to treating data from form
app.use(express.urlencoded({ extended: true }))

// Middleware to provide statics files
app.use(express.static(path.join(__dirname, 'public')))

// Meddleware function to check authentication
function requireAuth(req, res, next) {
  if (req.session.authenticated) {
    next()
  } else {
    res.redirect('/')
  }
}

// Route from login, render the form login.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Route to process login
app.post('/login', (req, res) => {
  const { username, password } = req.body

  // Basic authentication: replate this to check wiht use a database
  if (username === 'wesleysilva' && password === 'financial') {
    req.session.authenticated = true
    res.redirect('/dashboard')
  } else {
    res.send('Credenciais inválidas! Tente novamente.')
  }
})

// Route to logout
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Erro ao sair da sessão.')
    }
    res.redirect('/')
  })
})

// Route from home page (security with authentication)
app.get('/dashboard', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'dashboard.html'))
})

// Become the route fo login to start the application.
app.get('*', (req, res) => {
  if (!req.session.authenticated) {
    res.redirect('/')
  } else {
    res
      .status(404)
      .sendFile(path.join(__dirname, 'public', 'views', 'error.html'))
  }
})

app.listen(port, () => {
  console.log(`Servidor executando em http://localhost:${port}/`)
})
