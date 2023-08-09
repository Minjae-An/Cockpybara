import React from 'react';
import ReactDOM from 'react-dom';
import "./static/fonts/font.css";
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import App from './App';
import './index.css'; // 전역 스타일을 import
//import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter> {/* Wrap your App component with BrowserRouter */}
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

//reportWebVitals();