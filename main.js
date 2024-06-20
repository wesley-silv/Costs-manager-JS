// My old JavaScript code

function managementValues() {
  let receivedValue = parseFloat(
    document.getElementById('received-value').value
  )
  let tithe = receivedValue / 10
  let car = parseFloat(document.getElementById('car').value)
  let rent = parseFloat(document.getElementById('rent').value)
  let credeCard = parseFloat(document.getElementById('cred-card').value)
  let nubankCard = parseFloat(document.getElementById('nubank-card').value)
  let internet = parseFloat(document.getElementById('internet').value)
  let water = parseFloat(document.getElementById('water').value)
  let eletricEnergy = parseFloat(
    document.getElementById('eletric-energy').value
  )
  let phone = parseFloat(document.getElementById('phone').value)
  let fuel = parseFloat(document.getElementById('fuel').value)
  let foods = parseFloat(document.getElementById('foods').value)
  let others = parseFloat(document.getElementById('others').value)
  let paymentResult =
    car +
    rent +
    credeCard +
    nubankCard +
    internet +
    water +
    eletricEnergy +
    phone +
    fuel +
    foods +
    others

  let afterPayment = receivedValue - (tithe + paymentResult)

  if (paymentResult != 0) {
    let viewResult = document.getElementById('results')
    viewResult.style.display = 'block'
    viewResult.innerHTML = `Payment result R$ ${paymentResult}`

    let titheResult = document.getElementById('tithe')
    titheResult.style.display = 'block'
    titheResult.innerHTML = `Tithe result R$ ${tithe}`

    let payment = document.getElementById('after-payment-result')
    payment.style.display = 'block'
    payment.innerHTML = `Alfter paymente result R$ ${afterPayment}`
  } else {
    let invalidResult = document.getElementById('results')
    invalidResult.style.display = 'block'
    invalidResult.innerHTML = `Invalid result! Please insert the respective values in each field.`
  }
}
