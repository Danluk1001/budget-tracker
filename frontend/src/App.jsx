import { useEffect, useState } from "react";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import "./App.css";

function App() {
  const emptyForm = {
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: "",
  };

  const [formData, setFormData] = useState(emptyForm);
  const [message, setMessage] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    income: 0,
    expenses: 0,
    balance: 0,
  });
  const [editingId, setEditingId] = useState(null);

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

  function handleEdit(transaction) {
    setEditingId(transaction.id);
    setFormData({
      type: transaction.type,
      amount: transaction.amount,
      category: transaction.category,
      description: transaction.description || "",
      date: transaction.date,
    });
    setMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setFormData(emptyForm);
    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const isEditing = editingId !== null;
    const url = isEditing
      ? `http://127.0.0.1:5000/transactions/${editingId}`
      : "http://127.0.0.1:5000/transactions";

    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
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

      setMessage(
        isEditing
          ? "Transaction updated successfully!"
          : "Transaction added successfully!"
      );

      setFormData(emptyForm);
      setEditingId(null);

      fetchTransactions();
      fetchSummary();
    } catch (error) {
      setMessage("Failed to connect to backend");
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`http://127.0.0.1:5000/transactions/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Failed to delete transaction");
        return;
      }

      if (editingId === id) {
        setEditingId(null);
        setFormData(emptyForm);
      }

      setMessage("Transaction deleted successfully!");

      fetchTransactions();
      fetchSummary();
    } catch (error) {
      setMessage("Failed to connect to backend");
    }
  }

  return (
    <div className="app-shell">
      <div className="app-container">
        <header className="app-header">
          <p className="app-eyebrow">Full Stack Budget App</p>
          <h1>Budget Tracker</h1>
          <p className="app-subtext">
            Track income, expenses, and balance in one place.
          </p>
        </header>

        <SummaryCards summary={summary} />

        <section className="panel">
          <TransactionForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isEditing={editingId !== null}
            handleCancelEdit={handleCancelEdit}
          />
        </section>

        {message && <p className="status-message">{message}</p>}

        <section className="panel">
          <TransactionList
            transactions={transactions}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </section>
      </div>
    </div>
  );
}

export default App;