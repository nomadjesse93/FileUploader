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
      <p className={styles.fileName}>{props.fileName}</p>

      <div className={styles.button}>
        <label htmlFor='profileImage'>
          <a
            style={{ cursor: 'pointer' }}
            onClick={() => {
              props.setLoading(true);
              props.getFile({ url: '', fileName: '' });
            }}
          >
            <div className={styles.buttonText}>Choose a file</div>
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
