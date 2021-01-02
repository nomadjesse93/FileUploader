import { React } from 'react';
import { connect } from 'react-redux';
import Container from '../container/Container';

import { BrowserRouter as Router, Route } from 'react-router-dom';

function Routes(props) {
  return (
    <Router>
      <Route path={`/`} component={Container} />
    </Router>
  );
}

const mapStateToProps = (state) => {
  return { url: state.url, fileName: state.fileName };
};

export default connect(mapStateToProps)(Routes);
