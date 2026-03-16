function MonthlyBreakdown({ monthlyData }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Monthly Breakdown</h2>
        <p>See income, expenses, and balance grouped by month.</p>
      </div>

      {monthlyData.length === 0 ? (
        <div className="empty-state">
          <p>No monthly data available yet.</p>
        </div>
      ) : (
        <div className="monthly-breakdown-list">
          {monthlyData.map((month) => (
            <div className="monthly-breakdown-card" key={month.monthKey}>
              <div className="monthly-breakdown-header">
                <h3>{month.label}</h3>
              </div>

              <div className="monthly-breakdown-grid">
                <div>
                  <p className="monthly-label">Income</p>
                  <p className="monthly-income">
                    ${month.income.toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="monthly-label">Expenses</p>
                  <p className="monthly-expense">
                    ${month.expenses.toFixed(2)}
                  </p>
                </div>

                <div>
                  <p className="monthly-label">Balance</p>
                  <p className="monthly-balance">
                    ${month.balance.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MonthlyBreakdown;