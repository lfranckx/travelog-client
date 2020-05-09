import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { ArticleProvider } from './Contexts/ArticleContext';

ReactDOM.render(
  <BrowserRouter>
    <ArticleProvider>
      <App />
    </ArticleProvider>
  </BrowserRouter>,
  document.getElementById('root')
);