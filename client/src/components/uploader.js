import React, { Component } from 'react';

class DragAndDrop extends Component {
  dropRef = React.createRef();

  state = {
    dragging: false,
    dragCounter: 0,
  };

  handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const data = e.dataTransfer;

    this.setState({ dragCounter: this.dragCounter++ });

    if (data.items && data.items.length > 0) {
      this.setState({ dragging: true });
    }
  };

  handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ dragging: false, dragCounter: 0 });
  };

  handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  componentDidMount() {
    let div = this.dropRef.current;
    div.addEventListener('dragenter', this.handleDragIn);
    div.addEventListener('dragleave', this.handleDragOut);
    div.addEventListener('dragover', this.handleDrag);
    div.addEventListener('drop', this.handleDrop);
  }

  componentWillUnmount() {
    let div = this.dropRef.current;
    div.removeEventListener('dragenter', this.handleDragIn);
    div.removeEventListener('dragleave', this.handleDragOut);
    div.removeEventListener('dragover', this.handleDrag);
    div.removeEventListener('drop', this.handleDrop);
  }

  render() {
    return (
      <div
        style={{
          display: 'inline-block',
          position: 'relative',
        }}
        ref={this.dropRef}
      >
        {this.state.dragging && (
          <div
            style={{
              border: 'dashed grey 4px',
              backgroundColor: 'rgba(255,255,255,.8)',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              height: '100%',
              width: '100%',
              border: 'solid black 1px',
              zIndex: 9999,
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                right: 0,
                left: 0,
                textAlign: 'center',
                color: 'grey',
                fontSize: 36,
              }}
            >
              <div>drop here :)</div>
            </div>
          </div>
        )}
        {this.props.children}
      </div>
    );
  }
}

export default DragAndDrop;
