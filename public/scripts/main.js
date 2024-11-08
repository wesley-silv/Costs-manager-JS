// Take the values of inputs and chack if they are NaN
function getFloatValue(id) {
  return parseFloat(document.getElementById(id).value) || 0
}

// Save data with localStorage
function saveDataToLocalStorage(ids, values) {
  const data = {}
  ids.forEach((id, index) => {
    data[id] = values[index]
  })
  localStorage.setItem('userData', JSON.stringify(data))
}

function loadDataFromLocalStorage(ids) {
  const data = JSON.parse(localStorage.getItem('userData'))
  if (data) {
    ids.forEach(id => {
      const inputElement = document.getElementById(id)
      if (inputElement) {
        inputElement.value = data[id] || 0
      }
    })
  }
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
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [
        {
          data: percentages,
          backgroundColor: [
            'rgba(255, 99, 132, 0.9)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 120, 144, 0.8)',
            'rgba(255, 120, 144, 0.5)',
            'rgba(255, 80, 105, 0.7)',

            'rgba(75, 192, 192, 0.9)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(89, 205, 155, 0.8)',
            'rgba(89, 205, 155, 0.5)',
            'rgba(64, 160, 140, 0.7)',

            'rgba(54, 162, 235, 0.9)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(70, 130, 180, 0.8)',
            'rgba(70, 130, 180, 0.5)',
            'rgba(100, 120, 200, 0.7)'
          ],
          hoverOffset: 4,
          borderColor: ['#FFF'],
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

    // Save data to localStorage
    saveDataToLocalStorage(ids, values)

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

// Load data from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
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
  loadDataFromLocalStorage(ids)
})
