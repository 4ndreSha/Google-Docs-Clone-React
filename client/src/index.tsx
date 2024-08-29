import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import {HashRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import './styles.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);