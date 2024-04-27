// App.js
import React from 'react';
import Routes from './Components/Router/Routes';
import store from './Components/store/store';
import { Provider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
