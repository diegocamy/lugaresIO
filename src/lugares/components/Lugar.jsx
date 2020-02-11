import React from 'react';

const Lugar = ({ nombre, foto, likes }) => {
  return (
    <div className='col-md'>
      <div className='card border-info mb-3 mx-auto mt-3'>
        <img
          src={foto}
          className='card-img-top'
          style={{ height: 200 }}
          alt={nombre}
        />
        <div className='card-body'>
          <h6 className='card-title text-dark'>
            <strong>{nombre}</strong>
          </h6>
          <p className='card-title text-dark'>User</p>
          <p className='card-text text-right'>
            <small className='text-dark'>{likes} Likes</small>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Lugar;
