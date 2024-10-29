// Função para pegar valores numéricos dos inputs
function getFloatValue(id) {
  return parseFloat(document.getElementById(id).value) || 0
}

function displayResult(id, message) {
  const element = document.getElementById(id)
  element.innerHTML = message
}

// Função para criar ou atualizar o gráfico de pizza
function updateChart(percentages, labels) {
  const ctx = document.getElementById('percentChart').getContext('2d')

  // Destroi o gráfico anterior se existir
  if (window.myPieChart) {
    window.myPieChart.destroy()
  }

  // Cria um novo gráfico de pizza
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
          ]
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  })
}

// Listener para o botão "Visualizar Resultados"
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

    // Obtém valores dos inputs e define variáveis
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

    // Calcula valores financeiros
    const totalProvments = provments + extraGain
    if (totalProvments === 0) {
      alert('Por favor, preencha os campos de provisões e ganhos extras.')
      return
    }

    const paymentResult = values.slice(2).reduce((acc, val) => acc + val, 0)
    const tithe = totalProvments / 10
    const afterPayment = totalProvments - (tithe + paymentResult)

    // Calcula percentuais e média percentual
    const percentages = values
      .slice(2)
      .map(value => ((value / totalProvments) * 100).toFixed(2))
    const meanPercentage =
      ((paymentResult / totalProvments) * 100) / (values.length - 2)

    // Rótulos para as despesas (obtém texto dos labels)
    const expenseLabels = ids
      .slice(2)
      .map(id => document.querySelector(`label[for=${id}]`).textContent)

    // Atualiza a tabela com resultados
    const resultsContainer = document.querySelector('.table-container')
    if (paymentResult > 0) {
      displayResult('result', `R$ ${paymentResult.toFixed(2)}`)
      displayResult('tithe', `R$ ${tithe.toFixed(2)}`)
      displayResult('after-payment', `R$ ${afterPayment.toFixed(2)}`)
      displayResult('percent', `${percentages.join(', ')}%`)
      displayResult('mean-percent', `${meanPercentage.toFixed(2)}%`)
      resultsContainer.style.display = 'flex'

      // Atualiza o gráfico de pizza
      updateChart(percentages, expenseLabels)

      // Rola automaticamente para a tabela e o gráfico
      resultsContainer.scrollIntoView({ behavior: 'smooth' })
    } else {
      alert('Preencha corretamente os campos do formulário!')
      resultsContainer.style.display = 'none'
    }
  })
