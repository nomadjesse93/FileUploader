import { React } from 'react';
import { connect } from 'react-redux';
import Container from '../container/Container';
import Uploader from '../uploader/Uploader';

import { BrowserRouter as Router, Route } from 'react-router-dom';

function Routes(props) {
  const fileTest = (fileName) => {
    const threeLetters = fileName.length - 3;
    if (
      fileName.slice(threeLetters, fileName.length) !== 'png' &&
      fileName.slice(threeLetters, fileName.length) !== 'jpg'
    ) {
      return false;
    }

    return true;
  };

  return (
    <Router>
      <Route path={`/`}>
        <Container fileTest={fileTest}>
          <Uploader fileTest={fileTest} />
        </Container>
      </Route>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return { url: state.url, fileName: state.fileName };
};

export default connect(mapStateToProps)(Routes);
