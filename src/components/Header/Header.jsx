import React from "react";
import styles from "./Header.module.scss";
import { Sun, Moon, Heart } from "lucide-react";

export default function Header({ darkMode, setDarkMode, wishlistCount }) {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>Product Dashboard</h1>
      </div>

      <div className={styles.actions}>
        <button
          aria-label="Toggle theme"
          onClick={() => setDarkMode(!darkMode)}
          className={styles.iconBtn}
        >
          {darkMode ? <Sun /> : <Moon />}
        </button>

        <div className={styles.wishlist}>
          <Heart />
          {wishlistCount > 0 && (
            <span className={styles.badge}>{wishlistCount}</span>
          )}
        </div>
      </div>
    </header>
  );
}
