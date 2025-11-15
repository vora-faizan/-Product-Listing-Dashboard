const BASE = 'https://fakestoreapi.com';

export const api = {
  async fetchProducts() {
    const res = await fetch(`${BASE}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async fetchCategories() {
    const res = await fetch(`${BASE}/products/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  }
};
