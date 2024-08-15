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
    'rent',
    'foods',
    'home',
    'water',
    'eletric-energy',
    'internet',
    'phone',
    'car',
    'credit-cards',
    'cook-gas',
    'leisure',
    'other-cost'
  ]

  const values = ids.map(id => getFloatValue(id))
  const [
    receivedValue,
    rent,
    foods,
    home,
    water,
    eletricEnergy,
    internet,
    phone,
    car,
    creditCards,
    cookGas,
    leisure,
    otherCost
  ] = values

  const tithe = receivedValue / 10
  const paymentResult = values.slice(1).reduce((acc, val) => acc + val, 0)
  const afterPayment = receivedValue - (tithe + paymentResult)

  const percentages = values
    .slice(1)
    .map(value => (value / receivedValue) * 100)
  const meanPercentage =
    percentages.reduce((acc, val) => acc + val, 0) / percentages.length

  const resultsContainer = document.querySelector('.view-results')

  if (paymentResult > 0) {
    displayResult('result', `Custo total: R$ ${paymentResult.toFixed(2)}`)
    displayResult('tithe', `Dízimo: R$ ${tithe.toFixed(2)}`)
    displayResult(
      'after-payment',
      `Proventos restantes: R$ ${afterPayment.toFixed(2)}`
    )
    displayResult(
      'percent',
      `Custos percentuais: ${percentages
        .map(p => p.toFixed(2) + '%')
        .join(', ')}`
    )
    displayResult(
      'mean-percent',
      `Médias percentuais: ${meanPercentage.toFixed(2)}%`
    )
    resultsContainer.style.display = 'flex'
  } else {
    displayResult(
      'result' !== undefined ? '' : 'result',
      alert('Preencha correntamente os campos do formulário!')
    )
    resultsContainer.style.display = 'none'
  }
}
