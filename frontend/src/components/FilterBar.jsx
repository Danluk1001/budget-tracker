function FilterBar({ filters, handleFilterChange, handleClearFilters }) {
  return (
    <section className="panel">
      <div className="section-heading">
        <h2>Filters & Sorting</h2>
        <p>Filter transactions by type or category, and sort the results.</p>
      </div>

      <div className="filter-bar">
        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Search by category"
          value={filters.category}
          onChange={handleFilterChange}
        />

        <select
          name="sortBy"
          value={filters.sortBy}
          onChange={handleFilterChange}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Amount</option>
          <option value="lowest">Lowest Amount</option>
        </select>

        <button className="secondary-button" onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>
    </section>
  );
}

export default FilterBar;