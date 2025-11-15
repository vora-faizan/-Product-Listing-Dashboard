import React from 'react';
import styles from './Filters.module.scss';
import { Search, Grid3x3, List } from 'lucide-react';

export default function Filters({
  searchQuery, setSearchQuery,
  categories, selectedCategory, setSelectedCategory,
  sortBy, setSortBy,
  viewMode, setViewMode,
  products, priceRange, setPriceRange
}) {
  const max = Math.max(0, ...products.map(p => p.price));

  return (
    <section className={styles.filters}>
      <div className={styles.row}>
        <div className={styles.search}>
          <Search className={styles.searchIcon} />
          <input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className={styles.select}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className={styles.select}
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating: High to Low</option>
          <option value="title-asc">Title: A → Z</option>
          <option value="title-desc">Title: Z → A</option>
        </select>

        <div className={styles.viewToggle}>
          <button
            className={`${styles.smallBtn} ${viewMode === 'grid' ? styles.active : ''}`}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
          >
            <Grid3x3 />
          </button>
          <button
            className={`${styles.smallBtn} ${viewMode === 'list' ? styles.active : ''}`}
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <List />
          </button>
        </div>
      </div>

      <div className={styles.row}>
        <label className={styles.priceLabel}>
          Price: ${priceRange[0]} — ${priceRange[1]}
        </label>

        <div className={styles.range}>
          <input
            type="range"
            min="0"
            max={max}
            value={priceRange[0]}
            onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
          />
          <input
            type="range"
            min="0"
            max={max}
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
          />
        </div>
      </div>
    </section>
  );
}
