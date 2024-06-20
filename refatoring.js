function getFloatValue(id) {
  return parseFloat(document.getElementById(id).value) || 0
}

function displayResult(id, message) {
  const element = document.getElementById(id)
  element.style.display = 'block'
  element.innerHTML = message
}

function managementValues() {
  const ids = [
    'received-value',
    'car',
    'rent',
    'cred-card',
    'nubank-card',
    'internet',
    'water',
    'eletric-energy',
    'phone',
    'fuel',
    'foods',
    'others'
  ]

  const values = ids.map(id => getFloatValue(id))
  const [
    receivedValue,
    car,
    rent,
    credCard,
    nubankCard,
    internet,
    water,
    eletricEnergy,
    phone,
    fuel,
    foods,
    others
  ] = values

  const tithe = receivedValue / 10
  const paymentResult = values.slice(1).reduce((acc, val) => acc + val, 0)
  const afterPayment = receivedValue - (tithe + paymentResult)

  if (paymentResult > 0) {
    displayResult(
      'results',
      `Valor do pagamento R$ ${paymentResult.toFixed(2)}`
    )
    displayResult('tithe', `Valor do dízimo R$ ${tithe.toFixed(2)}`)
    displayResult(
      'after-payment-result',
      `Valor restante após o pagamento R$ ${afterPayment.toFixed(2)}`
    )
  } else {
    displayResult(
      'results',
      `Resultado inválido! Insira os valores corretos em cada campo do formulário.`
    )
  }
}
