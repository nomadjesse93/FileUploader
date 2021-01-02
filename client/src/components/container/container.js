import React from 'react';
import { connect } from 'react-redux';
import { getFile, setLoading } from '../../redux/rootReducer';
import Uploader from '../uploader/Uploader';
import * as styles from './ContainerStyles.module.css';

function Container(props) {
  const handleChange = (e) => {
    props.setLoading(true);

    e.preventDefault();
    e.stopPropagation();

    const file = e.target.files[0];
    const name = file.name;

    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);

      reader.onload = () => {
        props.getFile({ url: reader.result, fileName: name });
        props.setLoading(false);
      };
    }
  };

  return (
    <div className={styles.main}>
      <Uploader />
      <p
        style={{
          gridColumn: '2/3',
          gridRow: '3/4',
          marginTop: '2rem',
        }}
      >
        {props.fileName}
      </p>
      <div
        style={{
          gridColumn: '2/3',
          gridRow: '3/4',
          margin: 'auto',
          height: '2rem',
          width: '6rem',
          textAlign: 'center',
          boxShadow: '2px 2px 5px lightgrey',
          borderRadius: '8px',
          backgroundColor: '#2F80ED',
        }}
      >
        <label htmlFor='profileImage'>
          <a
            style={{ cursor: 'pointer' }}
            onClick={() => {
              props.setLoading(true);
              props.getFile({ url: '', fileName: '' });
            }}
          >
            <div
              style={{
                margin: '6px 6px 4px 6px',
                font: 'Noto Sans',
                color: 'white',
                fontWeight: '500',
                fontSize: '14px',
                lineHeight: '16px',
                textAlign: 'center',
                letterSpacing: '-0.035rem',
              }}
            >
              Choose a file
            </div>
          </a>
        </label>
        <input
          type='file'
          name='profileImage'
          id='profileImage'
          onChange={handleChange}
          style={{ display: 'none' }}
        ></input>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return { url: state.url, fileName: state.fileName, loading: state.loading };
};
const mapDispatchtoProps = { getFile, setLoading };

export default connect(mapStateToProps, mapDispatchtoProps)(Container);
