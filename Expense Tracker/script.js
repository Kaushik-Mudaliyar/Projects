document.addEventListener("DOMContentLoaded", () => {
  // First we are taking reference of every id which we will target with javascript
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  // We are creating an empty array of expenses to add the expenses in the array whenever we want we can retrieve from it.
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  // we are calling a function to calculate the total expense and store it in the variable named totalAmount
  let totalAmount = calculateTotal();

  renderExpenses();
  updateTotal();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Whenever any form is submitted the value which was coming from the form is actually a string. so we if we are using a number type input in the form we need to convert it from the string to number.
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    // so here we are cheking whether the name which was coming from the input is not need to be empty and also the amount input we are taking needs to be number only and also amount needs to be greater than zero than and than this block will start its execution.
    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
      };
      // here we are pushing the newly created object newExpense to the array which was a globally declared array
      expenses.push(newExpense);
      // Creating this function to save our work on local storage as well
      saveExpensesToLocal();
      renderExpenses();
      updateTotal();

      // clear the input after the submit
      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  });

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function saveExpensesToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
  function renderExpenses() {
    expenseList.innerHTML = "";

    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `${expense.name} - $${expense.amount}
        <button data-id = ${expense.id}>Delete</button>
        `;
      expenseList.appendChild(li);
    });
  }
  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }
  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const expenseId = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((expense) => expense.id !== expenseId);
      saveExpensesToLocal();
      renderExpenses();
      updateTotal();
    }
  });
});
