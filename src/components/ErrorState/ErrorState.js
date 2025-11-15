import React from 'react';
import styles from './ErrorState.module.scss';
import { RefreshCw } from 'lucide-react';

export default function ErrorState({ message = 'Something went wrong', onRetry }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.msg}>
        <h3>Oops! Error</h3>
        <p>{message}</p>
        <div style={{ marginTop: 12 }}>
          <button className={styles.retry} onClick={onRetry}>
            <RefreshCw /> Retry
          </button>
        </div>
      </div>
    </div>
  );
}
