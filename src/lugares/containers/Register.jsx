import React, { useState } from 'react';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [error, setError] = useState('');

  const submitNewUser = e => {
    e.preventDefault();
    const loginInfo = { nombre, email, pass, pass2 };
    if (pass !== pass2) return setError('Las contraseñas deben coincidir!');

    console.log(loginInfo);
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
          <label htmlFor='nombre'>Nombre</label>
          <input
            type='text'
            className='form-control'
            id='nombre'
            aria-describedby='nombreHelp'
            value={nombre}
            onChange={e => {
              setNombre(e.target.value);
              setError('');
            }}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputEmail1'>Email</label>
          <input
            type='email'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            value={email}
            onChange={e => {
              setEmail(e.target.value.toLowerCase());
              setError('');
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
              setError('');
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
              setError('');
            }}
          />
        </div>
        <button className='btn btn-primary'>Ingresar</button>
      </form>
    </div>
  );
};

export default Register;
