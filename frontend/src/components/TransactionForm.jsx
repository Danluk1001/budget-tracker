function TransactionForm({
  formData,
  handleChange,
  handleSubmit,
  isEditing,
  handleCancelEdit,
}) {
  return (
    <>
      <h2>{isEditing ? "Edit Transaction" : "Add Transaction"}</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: "12px", marginBottom: "30px" }}
      >
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

        <button type="submit">
          {isEditing ? "Update Transaction" : "Add Transaction"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={handleCancelEdit}
            style={{ padding: "8px 12px", cursor: "pointer" }}
          >
            Cancel Edit
          </button>
        )}
      </form>
    </>
  );
}

export default TransactionForm;