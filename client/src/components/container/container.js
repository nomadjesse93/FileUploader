import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getFile, setLoading, error } from '../../redux/rootReducer';
import ReactToolTip from 'react-tooltip';
import Header from '../header/Header';
import * as styles from './ContainerStyles.module.css';

function Container(props) {
  const history = useHistory();

  const handleChange = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.target.files[0];

    if (props.fileTest(file.name)) {
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
    } else {
      props.getFile({ url: '', fileName: '' });
      props.setLoading(false);
      props.error(true);

      const timer = setTimeout(() => props.error(false), 5000);
    }
  };

  const handleClear = () => {
    props.getFile({ url: '', fileName: '' });
    history.push('');
  };

  const trimmedUrlString = () => {
    let originUrl = `${window.location.origin}/${props.fileName}`.toString();

    let trimmedURL =
      originUrl.length > 45 ? `${originUrl.slice(0, 45)} ...` : originUrl;

    return trimmedURL;
  };

  return (
    <div className={styles.main}>
      <Header isFile={props.fileName} />
      {props.children}
      <div className={styles.fileNameBorder}>
        <p className={styles.fileName}>
          {props.fileName ? `${trimmedUrlString()}` : ''}
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

      <div className={styles.chooseFileButton}>
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

      <button className={styles.clearButton} onClick={() => handleClear()}>
        Clear
      </button>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    url: state.url,
    fileName: state.fileName,
    loading: state.loading,
    wrongFile: state.wrongFile,
  };
};
const mapDispatchtoProps = { getFile, setLoading, error };

export default connect(mapStateToProps, mapDispatchtoProps)(Container);
