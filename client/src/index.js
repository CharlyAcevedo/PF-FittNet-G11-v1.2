import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import {
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query'
import store from './redux/store/index';
import axios from 'axios';

// const queryClient = new QueryClient();


axios.defaults.baseURL = 'https://backend-fittnet-production.up.railway.app/';


ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
    {/* <QueryClientProvider client={queryClient}> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
    {/* </QueryClientProvider> */}
      </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);
