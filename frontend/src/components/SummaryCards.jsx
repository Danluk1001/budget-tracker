function SummaryCards({ summary }) {
  return (
    <section className="summary-grid">
      <div className="summary-card income-card">
        <p className="summary-label">Total Income</p>
        <h3>${summary.income.toFixed(2)}</h3>
      </div>

      <div className="summary-card expense-card">
        <p className="summary-label">Total Expenses</p>
        <h3>${summary.expenses.toFixed(2)}</h3>
      </div>

      <div className="summary-card balance-card">
        <p className="summary-label">Balance</p>
        <h3>${summary.balance.toFixed(2)}</h3>
      </div>
    </section>
  );
}

export default SummaryCards;