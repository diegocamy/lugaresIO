import React from 'react';
import Lugar from './Lugar';

import { Link } from 'react-router-dom';

const ListaLugares = ({ lugares }) => {
  if (lugares.length === 0) {
    return <h1>No hay lugares para mostrar</h1>;
  }

  return (
    <div className='container'>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center'>
        {lugares.map(lugar => {
          return (
            <Link
              key={lugar._id}
              to={`/lugar/${lugar._id}`}
              style={{ textDecoration: 'none' }}
            >
              <Lugar
                key={lugar._id}
                nombre={lugar.nombre}
                foto={`http://localhost:5000/${lugar.foto}`}
                likes={lugar.likes.length}
                descripcion={lugar.descripcion}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ListaLugares;
