import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getFile, setLoading } from '../../redux/rootReducer';
import ReactToolTip from 'react-tooltip';
import * as styles from './ContainerStyles.module.css';

function Container(props) {
  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.target.files[0];

    history.push(file.name);

    const reader = new FileReader();
    props.setLoading(true);

    reader.readAsDataURL(file);

    reader.onload = () => {
      props.getFile({
        url: reader.result,
        fileName: file.name,
      });
      props.setLoading(false);
    };
  };

  return (
    <div className={styles.main}>
      {props.children}
      <div className={styles.fileNameBorder}>
        <p className={styles.fileName}>
          {props.fileName ? `${window.location.origin}/${props.fileName}` : ''}
        </p>
        <button
          data-tip='Copied!'
          className={styles.copy}
          onClick={() =>
            navigator.clipboard.writeText(
              `${window.location.origin}/${props.fileName}`
            )
          }
        >
          Copy
        </button>
        <ReactToolTip
          type='info'
          effect='float'
          event='mousedown'
          eventOff='mouseup'
          delayHide={1000}
        />
      </div>

      <div className={styles.button}>
        <label htmlFor='profileImage'>
          <a
            style={{ cursor: 'pointer' }}
            onClick={() => {
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
          onChange={(e) => handleChange(e)}
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
