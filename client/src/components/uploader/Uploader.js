import logo from '../../assets/img/loader.gif';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getFile, setLoading } from '../../redux/rootReducer';
import * as styles from './UploaderStyles.module.css';

function UploaderFunction(props) {
  const [value, setValue] = useState({
    drag: false,
    count: 0,
    switch: false,
    size: ['99% 99%', 'contain'],
  });

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

  const handleSizing = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setValue({ ...value, switch: !value.switch });
  };

  return (
    <div
      className={styles.picture}
      style={{
        backgroundImage: `url(${props.url})`,
        backgroundSize: `${value.switch ? value.size[0] : value.size[1]}`,
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
        <p className={styles.directions}>Drag and Drop your images here</p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return { url: state.url, fileName: state.fileName, loading: state.loading };
};
const mapDispatchtoProps = { getFile, setLoading };

export default connect(mapStateToProps, mapDispatchtoProps)(UploaderFunction);
