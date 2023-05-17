import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ConfigProvider, theme } from 'antd';

const THEME = createTheme({
    palette: {
        primary: {
            main: "#5436A9",
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <ThemeProvider theme={THEME}>
              <Provider store={store}>
                  <ConfigProvider
                      theme={{
                          algorithm: theme.darkAlgorithm,
                          token: {
                              colorPrimary: '#5436A9',
                          },
                      }}
                  >
                      <App/>
                  </ConfigProvider>
              </Provider>
          </ThemeProvider>
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
