import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import actions from '../../actions';

const { userRegister } = actions;

const Register = ({ history, userRegister, error }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');

  const submitNewUser = e => {
    e.preventDefault();
    const nuevoUser = { nombreUsuario, password: pass, password2: pass2 };
    userRegister(nuevoUser, history);
  };

  const alertMessage = (
    <div className='alert alert-danger' role='alert'>
      {error}
    </div>
  );

  return (
    <div className='container mt-4'>
      {error && alertMessage}
      <form onSubmit={submitNewUser}>
        <div className='form-group'>
          <label htmlFor='nombreUsuario'>Nombre de Usuario</label>
          <input
            type='text'
            className='form-control'
            id='nombreUsuario'
            aria-describedby='nombreHelp'
            value={nombreUsuario}
            onChange={e => {
              setNombreUsuario(e.target.value);
            }}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputPassword1'>Contraseña</label>
          <input
            type='password'
            className='form-control'
            id='exampleInputPassword1'
            value={pass}
            onChange={e => {
              setPass(e.target.value);
            }}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputPassword1'>Repetir Contraseña</label>
          <input
            type='password'
            className='form-control'
            id='exampleInputPassword2'
            value={pass2}
            onChange={e => {
              setPass2(e.target.value);
            }}
          />
        </div>
        <button className='btn btn-primary'>Ingresar</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.register.loading,
    error: state.register.error
  };
};

export default withRouter(connect(mapStateToProps, { userRegister })(Register));
