import React, { Fragment } from 'react';
import * as styles from './Header.module.css';
import checkMark from '../../assets/img/checkMark2.webp';

export default function Header(props) {
  return (
    <Fragment>
      {props.isFile ? (
        <div className={styles.div2}>
          <img
            src={checkMark}
            style={{
              height: '5rem',
              width: '5rem',
              margin: '1rem auto 0 auto',
              padding: '0',
            }}
          ></img>
          <h1 className={styles.title2}>Upload Success</h1>
        </div>
      ) : (
        <div className={styles.div}>
          <h1 className={styles.title}>Upload your files</h1>
          <h4 className={styles.subtitle}>Files should be jpeg or png</h4>
        </div>
      )}
    </Fragment>
  );
}
