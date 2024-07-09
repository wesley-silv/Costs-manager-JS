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

  // Calculando a porcentagem de cada valor pago em relação ao valor recebido
  const percentages = values
    .slice(1)
    .map(value => (value / receivedValue) * 100)
  const meanPercentage =
    percentages.reduce((acc, val) => acc + val, 0) / percentages.length

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

    // Exibindo a porcentagem de cada valor pago em relação ao valor recebido
    displayResult(
      'percent',
      `Porcentagens em relação ao valor recebido: ${percentages
        .map(p => p.toFixed(2) + '%')
        .join(', ')}`
    )

    // Exibindo a média das porcentagens
    displayResult(
      'mean-percent',
      `Média das porcentagens: ${meanPercentage.toFixed(2)}%`
    )
  } else {
    displayResult(
      'results',
      `Resultado inválido! Insira os valores corretos em cada campo do formulário.`
    )
  }
}
