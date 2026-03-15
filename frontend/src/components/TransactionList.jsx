function formatDisplayDate(dateString) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function TransactionList({ transactions, handleDelete, handleEdit }) {
  return (
    <>
      <div className="section-heading">
        <h2>Transactions</h2>
        <p>Your saved income and expense history.</p>
      </div>

      {transactions.length === 0 ? (
        <div className="empty-state">
          <p>No transactions yet.</p>
        </div>
      ) : (
        <div className="transaction-list">
          {transactions.map((transaction) => (
            <div className="transaction-card" key={transaction.id}>
              <div className="transaction-top">
                <div>
                  <span
                    className={`transaction-badge ${
                      transaction.type === "income"
                        ? "badge-income"
                        : "badge-expense"
                    }`}
                  >
                    {transaction.type.toUpperCase()}
                  </span>
                  <h3 className="transaction-amount">
                    ${Number(transaction.amount).toFixed(2)}
                  </h3>
                </div>
              </div>

              <div className="transaction-details">
                <p>
                  <strong>Category:</strong> {transaction.category}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {transaction.description || "No description"}
                </p>
                <p>
                  <strong>Date:</strong> {formatDisplayDate(transaction.date)}
                </p>
              </div>

              <div className="transaction-actions">
                <button
                  className="secondary-button"
                  onClick={() => handleEdit(transaction)}
                >
                  Edit
                </button>

                <button
                  className="danger-button"
                  onClick={() => handleDelete(transaction.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default TransactionList;