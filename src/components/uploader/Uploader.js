import logo from '../../assets/img/loader.gif';
import pictureIcon from '../../assets/img/pictureIcon.png';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFile, setLoading, error } from '../../redux/rootReducer';
import * as styles from './UploaderStyles.module.css';

function Uploader(props) {
  const [value, setValue] = useState({
    drag: false,
    count: 0,
    switch: false,
    size: ['99% 99%', 'contain', '60% 73%'],
    wrongFile: false,
  });

  const history = useHistory();

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValue({ ...value, drag: true, count: (value.count += 1) });
    props.setLoading(true);
    props.getFile({ fileName: '', url: '' });
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValue({ ...value, count: 0 });
    props.setLoading(false);
    props.getFile({ fileName: '', url: '' });
    if (value.count === 0) {
      setValue({ ...value, drag: false });
    }
  };

  const handleDrop = (e) => {
    props.getFile({ fileName: '', url: '' });

    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];

    if (props.fileTest(file.name)) {
      history.push(file.name);

      const reader = new FileReader();
      if (file) {
        reader.readAsDataURL(file);
        reader.onload = () => {
          props.getFile({ url: reader.result, fileName: file.name });
          props.setLoading(false);
        };
      }
    } else {
      props.getFile({ url: '', fileName: '' });
      props.setLoading(false);
      props.error(true);

      const timer = setTimeout(() => props.error(false), 5000);

      ///clearTimeout(timer);
    }
  };

  const handleSizing = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValue({ ...value, switch: !value.switch });
  };

  return (
    <div
      className={props.url ? styles.picture : styles.icon}
      style={{
        backgroundImage: `url(${
          props.url ? props.url : props.loading ? null : pictureIcon
        })`,
        backgroundSize: `${
          props.url && value.switch
            ? value.size[0]
            : props.url && !value.switch
            ? value.size[1]
            : value.size[2]
        }`,
      }}
      onClick={handleSizing}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDrop={handleDrop}
      onDragOver={handleDrag}
    >
      {props.loading ? (
        <img
          src={logo}
          alt={'Something Went Wrong!'}
          className={styles.loading}
        ></img>
      ) : null}
      {props.url !== '' ? null : (
        <p className={styles.directions}>
          {props.wrongFile
            ? 'Sorry wrong file type!'
            : 'Drag and Drop your images here'}
        </p>
      )}
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

export default connect(mapStateToProps, mapDispatchtoProps)(Uploader);
