import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const submitLogin = e => {
    e.preventDefault();
    const loginInfo = { email, pass };
    console.log(loginInfo);
  };

  return (
    <div className='container mt-4'>
      <form onSubmit={submitLogin}>
        <div className='form-group'>
          <label htmlFor='exampleInputEmail1'>Email</label>
          <input
            type='email'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            value={email}
            onChange={e => setEmail(e.target.value.toLowerCase())}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='exampleInputPassword1'>Password</label>
          <input
            type='password'
            className='form-control'
            id='exampleInputPassword1'
            value={pass}
            onChange={e => setPass(e.target.value)}
          />
        </div>
        <button className='btn btn-primary'>Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
