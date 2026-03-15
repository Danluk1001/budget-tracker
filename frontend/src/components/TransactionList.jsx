function TransactionList({ transactions }) {
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
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default TransactionList;