// App.js
import React from 'react';
import Routes from './Components/Router/Routes';
import store from './Components/store/store';
import { Provider } from 'react-redux';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';


const App = () => {
  return (
    <PrimeReactProvider>
      <Provider store={store}>
        <Routes />
      </Provider>
    </PrimeReactProvider>

  );
};

export default App;
