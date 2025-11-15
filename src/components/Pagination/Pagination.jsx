import React from 'react';
import styles from './Pagination.module.scss';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const maxVisible = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let end = Math.min(totalPages, start + maxVisible - 1);
  if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
  }

  const pageNumbers = [];
  for (let i = start; i <= end; i++) pageNumbers.push(i);

  return (
    <div className={styles.wrap}>
      <button
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
        disabled={currentPage === 1}
        className={styles.iconBtn}
      >
        <ChevronLeft />
      </button>

      {start > 1 && (
        <>
          <button onClick={() => setCurrentPage(1)} className={styles.btn}>1</button>
          {start > 2 && <span className={styles.sep}>…</span>}
        </>
      )}

      {pageNumbers.map(n => (
        <button
          key={n}
          onClick={() => setCurrentPage(n)}
          className={`${styles.btn} ${currentPage === n ? styles.active : ''}`}
        >
          {n}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className={styles.sep}>…</span>}
          <button onClick={() => setCurrentPage(totalPages)} className={styles.btn}>{totalPages}</button>
        </>
      )}

      <button
        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
        className={styles.iconBtn}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
