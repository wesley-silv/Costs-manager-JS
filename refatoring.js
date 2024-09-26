function getFloatValue(id) {
  return parseFloat(document.getElementById(id).value) || 0
}

function displayResult(id, message) {
  const element = document.getElementById(id)
  element.style.display = 'block'
  element.innerHTML = message

  // // Converte a string "message" para número
  // const numericMessage = parseFloat(message)
  // // Define a cor de fundo do elemento com base no valor numérico
  // element.style.backgroundColor = numericMessage <= 0 ? '#ff0000' : '#00ff00'
}

function managementValues() {
  const ids = [
    'received-value',
    'foods',
    'home',
    'water',
    'eletric-energy',
    'cook-gas',
    'internet',
    'phone',
    'car',
    'credit-cards',
    'leisure',
    'other-cost'
  ]

  const values = ids.map(id => getFloatValue(id))
  const [
    receivedValue,
    foods,
    home,
    water,
    eletricEnergy,
    cookGas,
    internet,
    phone,
    car,
    creditCards,
    leisure,
    otherCost
  ] = values

  const tithe = receivedValue / 10
  const paymentResult = values.slice(1).reduce((acc, val) => acc + val, 0)
  const afterPayment = receivedValue - (tithe + paymentResult)

  // Corrigindo o cálculo da média percentual
  const totalPercentage = (paymentResult / receivedValue) * 100
  const meanPercentage = totalPercentage / (values.length - 1)

  const percentages = values
    .slice(1)
    .map(value => (value / receivedValue) * 100)

  const resultsContainer = document.querySelector('.view-results')

  if (paymentResult > 0) {
    displayResult('result', `R$ ${paymentResult.toFixed(2)}`)
    displayResult('tithe', `R$ ${tithe.toFixed(2)}`)
    displayResult('after-payment', `R$ ${afterPayment.toFixed(2)}`)
    displayResult(
      'percent',
      `${percentages.map(p => p.toFixed(2) + '%').join(', ')}`
    )
    displayResult('mean-percent', `${meanPercentage.toFixed(2)}%`)
    resultsContainer.style.display = 'flex'
  } else {
    displayResult(
      'result' !== undefined ? '' : 'result',
      alert('Preencha corretamente os campos do formulário!')
    )
    resultsContainer.style.display = 'none'
  }
}
