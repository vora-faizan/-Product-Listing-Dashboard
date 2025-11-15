import React from 'react';
import styles from './ProductCard.module.scss';
import { Heart, ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, viewMode, isInWishlist, toggleWishlist }) {
  return (
    <article className={`${styles.card} ${viewMode === 'list' ? styles.list : ''}`}>
      <div className={styles.media}>
        <img src={product.image} alt={product.title} />
        <button className={styles.wish} onClick={toggleWishlist} aria-label="Toggle wishlist">
          <Heart className={isInWishlist ? styles.filled : ''} />
        </button>
        <span className={styles.category}>{product.category}</span>
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{product.title}</h3>

        {viewMode === 'list' && (
          <p className={styles.desc}>{product.description}</p>
        )}

        <div className={styles.meta}>
          <div className={styles.rating}>
            <span>★</span>
            <span>{product.rating.rate}</span>
            <small>({product.rating.count})</small>
          </div>

          <div className={styles.buy}>
            <div className={styles.price}>${product.price.toFixed(2)}</div>
            <button className={styles.addBtn}>
              <ShoppingCart />
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
