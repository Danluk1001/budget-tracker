function SummaryCards({ summary }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "16px",
        marginBottom: "30px",
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h3>Total Income</h3>
        <p style={{ fontSize: "24px", margin: 0 }}>
          ${summary.income.toFixed(2)}
        </p>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h3>Total Expenses</h3>
        <p style={{ fontSize: "24px", margin: 0 }}>
          ${summary.expenses.toFixed(2)}
        </p>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h3>Balance</h3>
        <p style={{ fontSize: "24px", margin: 0 }}>
          ${summary.balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default SummaryCards;