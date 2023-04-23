import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const globalStyle = css`
  ${reset};
  * {
    box-sizing: border-box
  }
  body {
    color: black;
  }
`
const GlobalStyle = createGlobalStyle`
  ${globalStyle};
`;


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle/>
      <App 
      />
    </BrowserRouter>
  </React.StrictMode>
);
