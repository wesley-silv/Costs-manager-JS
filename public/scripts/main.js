function getFloatValue(id) {
  return parseFloat(document.getElementById(id).value) || 0
}

function displayResult(id, message) {
  const element = document.getElementById(id)
  element.style.display = 'block'
  element.innerHTML = message
}

const viewResults = document
  .querySelector('.view-results')
  .addEventListener('click', function () {
    const ids = [
      'provments',
      'extra-gain',
      'foods',
      'home',
      'water',
      'electric-energy',
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
      electricEnergy,
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

    const paymentResult = values.slice(1).reduce((acc, val) => acc + val, 0)
    const tithe = (provments + extraGain) / 10
    const afterPayment = provments - (tithe + paymentResult)

    const totalPercentage = (paymentResult / provments) * 100
    const meanPercentage = totalPercentage / (values.length - 1)

    const percentages = values.slice(1).map(value => (value / provments) * 100)

    const resultsContainer = document.querySelector('.table-container')

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
      alert('Preencha corretamente os campos do formulário!')
      resultsContainer.style.display = 'none'
    }
  })
