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
    'credit-cards',
    'internet',
    'water',
    'eletric-energy',
    'phone',
    'cook-gas',
    'foods',
    'home',
    'leisure',
    'other-cost'
  ]

  const values = ids.map(id => getFloatValue(id))
  const [
    receivedValue,
    car,
    rent,
    creditCards,
    internet,
    water,
    eletricEnergy,
    phone,
    cookGas,
    foods,
    home,
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
    displayResult('result', `Valor do pagamento R$ ${paymentResult.toFixed(2)}`)
    displayResult('tithe', `Valor do dízimo R$ ${tithe.toFixed(2)}`)
    displayResult(
      'after-payment',
      `Valor restante após o pagamento R$ ${afterPayment.toFixed(2)}`
    )
    displayResult(
      'percent',
      `Porcentagens em relação ao valor recebido: ${percentages
        .map(p => p.toFixed(2) + '%')
        .join(', ')}`
    )
    displayResult(
      'mean-percent',
      `Média das porcentagens: ${meanPercentage.toFixed(2)}%`
    )
    resultsContainer.style.display = 'flex'
  } else {
    displayResult(
      'result',
      `Resultado inválido! Insira os valores corretos em cada campo do formulário.`
    )
    resultsContainer.style.display = 'none'
  }
}
