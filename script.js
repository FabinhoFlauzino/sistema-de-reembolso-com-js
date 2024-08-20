//Seleciona os elementos do formulário
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')

//seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")
const expenseTotal = document.querySelector("aside header h2")

//capturando o evento de input para formatar o valor
amount.oninput = () => {
  //obtem o valor atual do input e remove os caracteres não numerico
  let value = amount.value.replace(/\D/g, "")

  //transformar o valor em centavos
  value = Number(value) / 100

  //Atualiza o valor do input
  amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
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

  //chama a função que irá adicionar o item na lista
  expensedAdd(newExpense)

})

//adiciona um novo item na lista
function expensedAdd(newExpense) {
  try {
    //cria o elemento li para adicionar o item(li) na lista(ul)
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    //Cria o ícone da categoria
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    //cria a informação da despesa
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    //cria o nome da despesa
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    //cria a categoria da despesa
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    //adicona nome e categoria na div das informações da despesa
    expenseInfo.append(expenseName, expenseCategory)

    //criar valor da despesa
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small> ${newExpense.amount.toUpperCase().replace("R$", "")}`

    //cria icone de remover
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", `img/remove.svg`)
    removeIcon.setAttribute("alt", "Remover")

    //adiciona as informações no item(li)
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

    //adicona o item na lista(ul)
    expenseList.append(expenseItem)

    //atualiza dados de quantidade no header
    updateTotals()

    //limpando o form
    formClear()

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.")
    console.log(error)
  }
}

//atualiza os totais
function updateTotals() {
  try {
    //recuperar todos os itens da lista
    const items = expenseList.children
    
    //atualiza a quantidade de itens da lista
    expenseQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

    //incrementar o o total
    let total = 0

    //percorre cada item da lista
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount")

      //remover caracteres não numéricos e substitui por pontos
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")

      //converte o valor para float
      value = parseFloat(value)

      //Verificar se é um número válido
      if(isNaN(value)){
        return alert("Não foi possível calcular o valor total")
      }

      //incrementar total
      total += Number(value)
    }

    //criar a span para adicionar o R$ formatado
    const symbolBRL = document.createElement("small")
    symbolBRL.textContent = "R$"

    //Formata o valor e remove o R$ que será exibido pelo small
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "")

    //Limpa o conteúdo do elemento
    expenseTotal.innerHTML = ""

    //adiciona o simbolo da moeda e o valor total formatado
    expenseTotal.append(symbolBRL, total)
    
  } catch (error) {
    console.log(error);
    alert("Não foi possível atualizar os totais")
  }
}

//Evento que captura o clique nos itens da lista
expenseList.addEventListener("click", (e) => {
  //verificar se o elemento clicado é o icone de remover
  if(e.target.classList.contains("remove-icon")){
    //obtem a li pai do elemento clicado
    const item = e.target.closest(".expense")
    
    //remove o item da lista
    item.remove()
  }

  //atualiza o total
  updateTotals()
})

function formClear() {
  //limpa os inputs
  expense.value = ""
  category.value = ""
  amount.value = ""

  //colocar o foco no amount
  expense.focus()
}