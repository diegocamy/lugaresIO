import React from 'react';
import { Link } from 'react-router-dom';

const LugaresSubidos = ({ lugares }) => {
  return (
    <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 mt-4'>
      {lugares.map(l => {
        return (
          <div key={l._id} className='col mb-4'>
            <div className='card'>
              <img
                src={`http://localhost:5000/${l.foto}`}
                className='card-img-top'
                alt={l.nombre}
              />
              <div className='card-body'>
                <h5 className='card-title'>{l.nombre}</h5>
                <p className='card-text'>
                  <Link to={`/lugar/${l._id}`}>
                    <button className='btn btn-dark'>Ver Lugar</button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LugaresSubidos;
