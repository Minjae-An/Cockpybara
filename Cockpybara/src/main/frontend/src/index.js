import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './assets/fonts/Poller_One/font.css'; // 경로를 수정합니다.
import App from './App';

ReactDOM.render(
  <BrowserRouter> {/* Wrap your App component with BrowserRouter */}
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

