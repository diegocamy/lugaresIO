import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <Link className='navbar-brand' to='/'>
        LUGARES.IO
      </Link>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarColor01'
        aria-controls='navbarColor01'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarColor01'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>
              Lugares
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/profile'>
              Perfil
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/users'>
              Usuarios
            </Link>
          </li>
        </ul>
        <ul className='navbar-nav ml-auto'>
          <Link to='/register'>
            <button className='btn btn-dark m-1'>Registrarse</button>
          </Link>

          <Link to='/login'>
            <button className='btn btn-light m-1'>Ingresar</button>
          </Link>
        </ul>
      </div>
    </nav>
  );
};
