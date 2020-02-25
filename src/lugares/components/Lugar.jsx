import React from 'react';
import { Link } from 'react-router-dom';

const Lugar = ({
  nombre,
  foto,
  likes,
  subidoPor,
  id,
  idUsuario,
  comentarios
}) => {
  return (
    <div class='col-md-6 col-sm col-lg-4 my-3'>
      <div class='card mx-auto' style={{ width: 300 }}>
        <img src={foto} class='card-img-top' style={{ height: 250 }} />
        <div class='card-body'>
          <h5 class='card-title text-truncate'>{nombre}</h5>
          <p class='card-text'>
            By: <Link to={`/profile/${idUsuario}`}>{subidoPor}</Link>
          </p>
          <Link to={`/lugar/${id}`} class='btn btn-outline-success btn-sm'>
            Ver lugar
          </Link>{' '}
          <span className='mx-2 text-danger'>
            {likes} <i class='far fa-heart'></i>
          </span>
        </div>
      </div>
    </div>
  );
  return (
    <div className='col-md'>
      <div className='card mb-3 mx-auto mt-3'>
        <p class='card-header text-truncate'>{nombre}</p>
        <img src={foto} className='' style={{ height: 200 }} alt={nombre} />
        <p className='text-muted mx-2'>Por: {subidoPor}</p>
        <p className='card-text mx-2'>
          <small className='text-dark'>
            {likes} {likes === 1 ? 'Like' : 'Likes'}
          </small>
        </p>
        {/* <p className='card-text text-right'>
            <small className='text-dark'>
              {comentarios} {comentarios === 1 ? 'Comentario' : 'Comentarios'}
            </small>
          </p> */}
      </div>
    </div>
  );
};

export default Lugar;
