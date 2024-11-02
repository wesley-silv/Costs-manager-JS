// Take the values of inputs and chack if they are NaN
function getFloatValue(id) {
  return parseFloat(document.getElementById(id).value) || 0
}

// Build the message to presentation
function displayResult(id, message) {
  const element = document.getElementById(id)
  element.innerHTML = message
}

// Fuction to check and update Pie Chart
function updateChart(percentages, labels) {
  const ctx = document.getElementById('percentChart').getContext('2d')

  // Conditions to destroy the Pie Chart for case exists
  if (window.myPieChart) {
    window.myPieChart.destroy()
  }

  // Fuction to create Pie Chart
  window.myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [
        {
          data: percentages,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF9F40',
            '#4BC0C0',
            '#9966FF',
            '#C9CBCF'
          ],
          borderColor: ['#ffffff'],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'left',
          align: 'start',
          labels: {
            boxWidth: 20,
            padding: 15,
            font: {
              size: 14,
              family: 'Arial'
            },
            color: '#333'
          }
        },
        layout: {
          padding: {
            left: 20,
            right: 20
          }
        }
      }
    }
  })
}

// Event to view results
document
  .querySelector('.view-results button')
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
      'credit',
      'leisure',
      'clothing',
      'transport',
      'fixed-income',
      'variable-income',
      'savings'
    ]

    // Obtain the values of inputs and define tha variables
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
      credit,
      leisure,
      clothing,
      transport,
      fixedIncome,
      variableIncome,
      savings
    ] = values

    // Realize the math calcs
    const totalProvments = provments + extraGain
    if (totalProvments === 0) {
      alert('Por favor, preencha os campos de provisões e ganhos extras.')
      return
    }

    const paymentResult = values.slice(2).reduce((acc, val) => acc + val, 0)
    const tithe = totalProvments / 10
    const afterPayment = totalProvments - (tithe + paymentResult)

    // Calc the mean and mean percent
    const percentages = values
      .slice(2)
      .map(value => ((value / totalProvments) * 100).toFixed(2))
    const meanPercentage =
      ((paymentResult / totalProvments) * 100) / (values.length - 2)

    // Rótulos para as despesas (obtain the text of labels)
    const expenseLabels = ids
      .slice(2)
      .map(id => document.querySelector(`label[for=${id}]`).textContent)

    // Update the Results table
    const resultsContainer = document.querySelector('.table-container')
    if (paymentResult > 0) {
      displayResult('result', `R$ ${paymentResult.toFixed(2)}`)
      displayResult('tithe', `R$ ${tithe.toFixed(2)}`)
      displayResult('after-payment', `R$ ${afterPayment.toFixed(2)}`)
      displayResult('percent', `${percentages.join('% ')}`)
      displayResult('mean-percent', `${meanPercentage.toFixed(2)}%`)
      resultsContainer.style.display = 'flex'

      // Update the Pie Chart
      updateChart(percentages, expenseLabels)

      // Scroll authomaticaly for the table and chart
      resultsContainer.scrollIntoView({ behavior: 'smooth' })
    } else {
      alert('Preencha corretamente os campos do formulário!')
      resultsContainer.style.display = 'none'
    }
  })
