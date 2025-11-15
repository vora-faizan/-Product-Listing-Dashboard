import React, { useState, useEffect, useCallback, useMemo } from "react";
import { api } from "../services/api";
import useDebounce from "../hooks/useDebounce";
import useLocalStorage from "../hooks/useLocalStorage";
import Header from "../components/Header/Header";
import Filters from "../components/Filters/Filters";
import ProductCard from "../components/ProductCard/ProductCard";
import Pagination from "../components/Pagination/Pagination";
import ProductSkeleton from "../components/Skeleton/ProductSkeleton";
import ErrorState from "../components/ErrorState/ErrorState";
import styles from "./ProductDashboard.module.scss";

export default function ProductDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const [wishlist, setWishlist] = useLocalStorage("wishlist", []);

  const itemsPerPage = 8;
  const debouncedSearch = useDebounce(searchQuery, 300);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.fetchProducts();
      setProducts(data);
      const maxPrice = Math.max(...data.map((p) => p.price));
      setPriceRange([0, Math.ceil(maxPrice)]);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return ["all", ...cats];
  }, [products]);

  const filteredSorted = useMemo(() => {
    let filtered = [...products];

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      filtered = filtered.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case "title-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [products, debouncedSearch, selectedCategory, priceRange, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSorted.length / itemsPerPage)
  );
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategory, priceRange, sortBy]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredSorted.slice(start, start + itemsPerPage);
  }, [filteredSorted, currentPage]);

  const toggleWishlist = (id) => {
    setWishlist((prev) => {
      const current = Array.isArray(prev) ? prev : [];
      return current.includes(id)
        ? current.filter((i) => i !== id)
        : [...current, id];
    });
  };

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

  return (
    <div className={styles.page}>
      <div className="container">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          wishlistCount={wishlist.length}
        />

        <Filters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          products={products}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        <div style={{ marginTop: 16 }} className={styles.resultsInfo}>
          Showing {paginated.length} of {filteredSorted.length} products
        </div>

        {error ? (
          <ErrorState message={error} onRetry={fetchProducts} />
        ) : loading ? (
          <div
            className={
              viewMode === "grid" ? styles.gridContainer : styles.listContainer
            }
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} viewMode={viewMode} />
            ))}
          </div>
        ) : paginated.length === 0 ? (
          <div className={styles.noResults}>
            No products found matching your criteria
          </div>
        ) : (
          <>
            <div
              className={
                viewMode === "grid"
                  ? styles.gridContainer
                  : styles.listContainer
              }
            >
              {paginated.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  viewMode={viewMode}
                  isInWishlist={wishlist.includes(p.id)}
                  toggleWishlist={() => toggleWishlist(p.id)}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
