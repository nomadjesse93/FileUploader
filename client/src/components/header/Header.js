import React from 'react';
import * as styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.div}>
      <h1 className={styles.title}>Upload your files</h1>
      <h4 className={styles.subtitle}>Files should be jpeg or png</h4>
    </div>
  );
}
