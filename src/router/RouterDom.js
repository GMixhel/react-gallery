import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../layout/Home';
import About from '../layout/About';


export const RouterDom = () => {
  return (
    <BrowserRouter>
      {/*Header del Proyecto*/}
  
      {/*Contenido central*/}

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h2 className="error__title">Error 404</h2>} />
      </Routes>

      {/*Footer del Proyecto*/}
    </BrowserRouter>
  );
}
