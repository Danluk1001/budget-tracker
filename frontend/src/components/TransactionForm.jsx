function TransactionForm({
  formData,
  handleChange,
  handleSubmit,
  isEditing,
  handleCancelEdit,
}) {
  return (
    <>
      <div className="section-heading">
        <h2>{isEditing ? "Edit Transaction" : "Add Transaction"}</h2>
        <p>
          {isEditing
            ? "Update the selected transaction below."
            : "Enter a new income or expense."}
        </p>
      </div>

      <form className="transaction-form" onSubmit={handleSubmit}>
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

        <div className="form-actions">
          <button className="primary-button" type="submit">
            {isEditing ? "Update Transaction" : "Add Transaction"}
          </button>

          {isEditing && (
            <button
              className="secondary-button"
              type="button"
              onClick={handleCancelEdit}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default TransactionForm;