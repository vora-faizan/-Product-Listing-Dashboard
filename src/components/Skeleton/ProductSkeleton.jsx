import React from 'react';
import styles from './ProductSkeleton.module.scss';

export default function ProductSkeleton({ viewMode = 'grid' }) {
  return (
    <div className={`${styles.skel} ${viewMode === 'list' ? styles.list : ''}`}>
      <div className={styles.media} />
      <div className={styles.body}>
        <div className={styles.line} style={{ width: '70%' }} />
        <div className={styles.line} style={{ width: '50%' }} />
        <div className={styles.line} style={{ width: '30%' }} />
      </div>
    </div>
  );
}
