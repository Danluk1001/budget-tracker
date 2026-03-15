import { useEffect, useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [message, setMessage] = useState("");
  const [transactions, setTransactions] = useState([]);

  async function fetchTransactions() {
    try {
      const response = await fetch("http://127.0.0.1:5000/transactions");
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      setMessage("Failed to load transactions");
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Something went wrong");
        return;
      }

      setMessage("Transaction added successfully!");

      setFormData({
        type: "expense",
        amount: "",
        category: "",
        description: "",
        date: "",
      });

      fetchTransactions();
    } catch (error) {
      setMessage("Failed to connect to backend");
    }
  }

  return (
    <div style={{ padding: "40px", fontFamily: "Arial", maxWidth: "700px" }}>
      <h1>Budget Tracker</h1>

      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px", marginBottom: "30px" }}>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />

        <button type="submit">Add Transaction</button>
      </form>

      {message && <p>{message}</p>}

      <h2>Transactions</h2>

      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {transactions.map((transaction) => (
            <li
              key={transaction.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "12px",
              }}
            >
              <strong>{transaction.type.toUpperCase()}</strong> — ${transaction.amount}
              <br />
              Category: {transaction.category}
              <br />
              Description: {transaction.description || "No description"}
              <br />
              Date: {transaction.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;