import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import store from './redux/store/index';
import axios from 'axios';

const queryClient = new QueryClient();


axios.defaults.baseURL = 'https://backend-fittnet-production.up.railway.app/';


ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,

  document.getElementById('root')
);
