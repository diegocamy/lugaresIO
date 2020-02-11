import React from 'react';
import Lugar from './Lugar';

const ListaLugares = ({ lugares }) => {
  if (lugares.length === 0) {
    return <h1>No hay lugares para mostrar</h1>;
  }

  return (
    <div className='container'>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 justify-content-center'>
        {lugares.map(lugar => {
          return (
            <Lugar
              key={lugar.id}
              nombre={lugar.nombre}
              foto={lugar.foto}
              likes={lugar.likes}
              descripcion={lugar.descripcion}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ListaLugares;
