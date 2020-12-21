import React, { useState } from 'react';

function UploaderFunction() {
  const [value, setValue] = useState({ drag: false });
  const [count, setCount] = useState({ number: 0 });
  const [url, setUrl] = useState({ picture: null });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCount({ number: (count.number += 1) });
    setValue({ drag: true });
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCount({ number: 0 });

    setUrl({ picture: null });

    if (count.number === 0) {
      setValue({ drag: false });
    }
  };

  const handleDrop = (e) => {
    const reader = new FileReader();

    e.preventDefault();
    e.stopPropagation();

    setValue({ drag: false });

    const file = e.dataTransfer.files[0];

    if (e.dataTransfer.files[0]) {
      reader.readAsDataURL(file);

      reader.onload = () => {
        setUrl({ picture: reader.result });
      };
    }
  };

  return (
    <div
      style={{
        zIndex: '1',
        position: 'relative',
        gridRow: '2/3',
        gridColumn: '1/4',
        outline: '1.3em dashed white',
        outlineOffset: '-3px',
        border: '0.13em solid deepskyblue',
        borderRadius: '17px',
        backgroundColor: 'whitesmoke',
        width: '85%',
        margin: '0 auto 0 auto',
        height: '100%',
        textAlign: 'center',
      }}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDrop={handleDrop}
      onDragOver={handleDrag}
    >
      {url.picture ? (
        <img
          src={url.picture}
          alt={'Broken'}
          style={{
            height: '95%',
            width: '95%',
            margin: '5px 5px 5px 5px',
            borderRadius: 'inherit',
          }}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDrop={handleDrop}
          onDragOver={handleDrag}
        ></img>
      ) : (
        <div
          style={{
            position: 'relative',
            right: 0,
            left: 0,
            textAlign: 'center',
            color: 'grey',
            fontSize: 36,
          }}
          hidden={!value.drag}
        >
          drop here ;)
        </div>
      )}
    </div>
  );
}

export default UploaderFunction;
