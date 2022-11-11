import "./App.css";
import { useEffect } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";


// const expenses = [
//   {
//     id: "e1",
//     title: "Toilet Paper",
//     amount: 94.12,
//     date: new Date(2022, 7, 14),
//   },
//   { id: "e2", title: "New TV", amount: 799.49, date: new Date(2023, 2, 12) },
//   {
//     id: "e3",
//     title: "Car Insurance",
//     amount: 294.67,
//     date: new Date(2024, 2, 28),
//   },
//   {
//     id: "e4",
//     title: "New Desk (Wooden)",
//     amount: 450,
//     date: new Date(2022, 5, 12),
//   },
// ];

function App() {
  const [newExpenses, setNewExpenses] = useState([]);
 

  const getExpenses = async () => {
    try {
      const response = await fetch(
        "https://expense-tracker-b3366-default-rtdb.europe-west1.firebasedatabase.app/expenses.json"
      );
      const expenses = await response.json();
      const expenseFromServer = [];
      for (const key in expenses) {
        expenseFromServer.push({
          id: key,
          title: expenses[key].title,
          amount: expenses[key].amount,
          date: new Date(expenses[key].date),
        });
      }
      setNewExpenses(expenseFromServer);
    } catch (error) {
      // toastify
    }
  };
  const addExpense = async (newExpense) => {
    try {
      const response = await fetch(
        "https://expense-tracker-b3366-default-rtdb.europe-west1.firebasedatabase.app/expenses.json",
        {
          method: "POST",
          body: JSON.stringify(newExpense),
          headers: { "Content-type": "Application/json" },
        }
      );
      console.log(response);
      getExpenses();
    } catch (error) {
      // toastify
    }
  };

  useEffect(() => {
    getExpenses();
  }, []);
  return (
    <div className="App">
      <NewExpense onAddExpense={addExpense} />
      {newExpenses.length === 0 ? (
        <p>No expenses</p>
      ) : (
        <Expenses expenses={newExpenses} />
      )}
      {/* <ToastContainer /> */}
    </div>
  );
}

export default App;
