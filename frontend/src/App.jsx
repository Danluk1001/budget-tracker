import { useEffect, useState } from "react";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

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
  const [summary, setSummary] = useState({
    income: 0,
    expenses: 0,
    balance: 0,
  });

  async function fetchTransactions() {
    try {
      const response = await fetch("http://127.0.0.1:5000/transactions");
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      setMessage("Failed to load transactions");
    }
  }

  async function fetchSummary() {
    try {
      const response = await fetch("http://127.0.0.1:5000/summary");
      const data = await response.json();
      setSummary(data);
    } catch (error) {
      setMessage("Failed to load summary");
    }
  }

  useEffect(() => {
    fetchTransactions();
    fetchSummary();
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
      fetchSummary();
    } catch (error) {
      setMessage("Failed to connect to backend");
    }
  }

  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1>Budget Tracker</h1>

      <SummaryCards summary={summary} />

      <TransactionForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      {message && <p>{message}</p>}

      <TransactionList transactions={transactions} />
    </div>
  );
}

export default App;