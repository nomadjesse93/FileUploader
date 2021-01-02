import './App.css';
import { React } from 'react';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../src/redux/rootReducer';
import { Provider } from 'react-redux';
import Routes from './components/router/routes';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
