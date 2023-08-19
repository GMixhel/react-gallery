import React from 'react'
import { NavLink } from 'react-router-dom'

const Navegation = () => {
  return (
    <header>
      <ul>
        <li>
          <NavLink to= "/home">Home</NavLink>
        </li>
        <li>
          <NavLink to= "/about">About</NavLink>
        </li>
       
      </ul>
    </header>
  );
}

export default Navegation