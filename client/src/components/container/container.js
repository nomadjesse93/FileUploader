import React, { useState } from 'react';
import UploaderFunction from '../uploaderFunction';
import * as styles from './container.module.css';

function Container() {
  const [value, setValue] = useState({ file: '' });

  const handleClick = (e) => {
    console.log(e.target.files[0]);
  };
  return (
    <div className={styles.main}>
      <UploaderFunction />{' '}
      <div style={{ gridColumn: '2/3', gridRow: '3/4', margin: 'auto' }}>
        <label htmlFor='profileImage'>
          <a style={{ cursor: 'pointer' }}>
            <em></em> Change Profile Image
          </a>
        </label>
        <input
          type='file'
          name='profileImage'
          id='profileImage'
          onChange={handleClick}
          value={value.file}
          style={{ display: 'none' }}
        ></input>
      </div>
    </div>
  );
}

export default Container;
