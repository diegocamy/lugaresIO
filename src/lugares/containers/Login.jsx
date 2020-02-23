import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import actions from '../../actions';

const { login } = actions;

const Login = props => {
  //si el usuario esta autenticado es redireccionado a su perfil
  if (props.autenticado) {
    props.history.push('/dashboard');
  }

  const [nombreUsuario, setNombreUsuario] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = e => {
    e.preventDefault();
    const loginInfo = { nombreUsuario, password };
    props.login(loginInfo, props.history);
  };

  const alertMessage = (
    <div className='alert alert-danger' role='alert'>
      {props.error}
    </div>
  );

  return (
    <div className='container mt-4'>
      {props.error && alertMessage}
      <form onSubmit={submitLogin}>
        <div className='form-group'>
          <label htmlFor='exampleInputnombreUsuario1'>Nombre de Usuario</label>
          <input
            type='nombreUsuario'
            className='form-control'
            id='exampleInputnombreUsuario1'
            aria-describedby='nombreUsuarioHelp'
            value={nombreUsuario}
            onChange={e => setNombreUsuario(e.target.value.toLowerCase())}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputPassword1'>Password</label>
          <input
            type='password'
            className='form-control'
            id='exampleInputPassword1'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button className='btn btn-primary'>Ingresar</button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    autenticado: state.auth.autenticado,
    error: state.auth.error
  };
};

export default withRouter(connect(mapStateToProps, { login })(Login));
