import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import { store } from './store';
import { ThemeContextProvider } from './context/ThemeContext';
import { SocketProvider } from './context/SocketContext';
import { muiTheme } from './theme/muiTheme';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={muiTheme}>
            <ThemeContextProvider>
              <BrowserRouter>
                <SocketProvider>
                <CssBaseline />
                <App />
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#101828',
                      color: '#fff',
                      borderRadius: '12px',
                      padding: '16px',
                    },
                    success: {
                      iconTheme: {
                        primary: '#00A86B',
                        secondary: '#fff',
                      },
                    },
                    error: {
                      iconTheme: {
                        primary: '#E31837',
                        secondary: '#fff',
                      },
                    },
                  }}
                />
                </SocketProvider>
              </BrowserRouter>
            </ThemeContextProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
