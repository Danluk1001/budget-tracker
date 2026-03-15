function TransactionList({ transactions, handleDelete, handleEdit }) {
  return (
    <>
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
              <strong>{transaction.type.toUpperCase()}</strong> — $
              {transaction.amount}
              <br />
              Category: {transaction.category}
              <br />
              Description: {transaction.description || "No description"}
              <br />
              Date: {transaction.date}
              <br />

              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleEdit(transaction)}
                  style={{ padding: "6px 12px", cursor: "pointer" }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(transaction.id)}
                  style={{ padding: "6px 12px", cursor: "pointer" }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default TransactionList;