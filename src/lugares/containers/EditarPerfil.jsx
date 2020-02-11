import React, { useState } from 'react';

const EditarPerfil = () => {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [intereses, setIntereses] = useState('');
  const [foto, setFoto] = useState('');
  const [error, setError] = useState('');

  const submitNewUser = e => {
    e.preventDefault();
    const loginInfo = { nombre, mensaje, ciudad, intereses, foto };
    if (nombre.length === 0) return setError('Debe ingresar un nombre');

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
          <label htmlFor='Mensaje'>Mensaje</label>
          <input
            type='text'
            className='form-control'
            id='Mensaje'
            aria-describedby='MensajeHelp'
            value={mensaje}
            onChange={e => {
              setMensaje(e.target.value);
              setError('');
            }}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='Ciudad'>Ciudad</label>
          <input
            type='text'
            className='form-control'
            id='Ciudad'
            aria-describedby='CiudadHelp'
            value={ciudad}
            onChange={e => {
              setCiudad(e.target.value);
              setError('');
            }}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='Intereses'>Intereses</label>
          <input
            type='text'
            className='form-control'
            id='Intereses'
            aria-describedby='InteresesHelp'
            value={intereses}
            onChange={e => {
              setIntereses(e.target.value);
              setError('');
            }}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='Foto'>Foto</label>
          <input
            type='file'
            className='form-control'
            id='Foto'
            aria-describedby='FotoHelp'
            value={foto}
            onChange={e => {
              setFoto(e.target.value);
              setError('');
            }}
          />
        </div>
        <button className='btn btn-primary'>Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditarPerfil;
