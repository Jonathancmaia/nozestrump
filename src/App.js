import React from 'react';
import Routes from './Routes.js';
import { Provider } from 'react-redux';
import { store } from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import {Loading, Alert, Confirm, Notify} from './view/components';

const App = () => {
  return (
  <Provider store={store}>
    <Loading/>
    <Alert/>
    <Confirm/>
    <Notify/>
    <Routes />
  </Provider>
  )
};

export default App;
