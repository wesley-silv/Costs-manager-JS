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
    'provments',
    'extra-gain',
    'foods',
    'home',
    'water',
    'eletric-energy',
    'cook-gas',
    'internet',
    'phone',
    'car',
    'credit',
    'leisure',
    'clothing',
    'fixed-income',
    'variable-income',
    'savings'
  ]

  const values = ids.map(id => getFloatValue(id))
  const [
    provments,
    extraGain,
    foods,
    home,
    water,
    eletricEnergy,
    cookGas,
    internet,
    phone,
    car,
    credit,
    leisure,
    clothing,
    fixedIncome,
    variableIncome,
    savings
  ] = values

  const tithe = (provments + extraGain) / 10
  const paymentResult = values.slice(1).reduce((acc, val) => acc + val, 0)
  const afterPayment = provments - (tithe + paymentResult)

  const totalPercentage = (paymentResult / provments) * 100
  const meanPercentage = totalPercentage / (values.length - 1)

  const percentages = values.slice(1).map(value => (value / provments) * 100)

  const resultsContainer = document.querySelector('.view-results')
  console.log(fixedIncome, variableIncome, savings)

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
