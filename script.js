//Seleciona os elementos do formulário
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')

//capturando o evento de input para formatar o valor
amount.oninput = () => {
  //obtem o valor atual do input e remove os caracteres não numerico
  let value = amount.value.replace(/\D/g, "")

  //transformar o valor em centavos
  value = Number(value) / 100

  //Atualiza o valor do input
  amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL (value) {
  //formata o valor no padrão BRL(Real Brasileiro)
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  })

  return value
}

//captura o evento do submit do formulário para obter os valores
form.addEventListener('submit', (e) => {
  //previne o comportamento padrão
  e.preventDefault()

  //cria objeto com detalhes da nova despesa
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date()
  }

})