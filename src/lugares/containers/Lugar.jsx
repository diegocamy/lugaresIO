import React, { useEffect } from 'react';
import { Marker } from 'react-leaflet';
import { connect } from 'react-redux';

import Mapa from '../components/Mapa';
import Spinner from '../components/Spinner';
import foto from '../../img/profile.png';
import actions from '../../actions';
import Comentarios from '../components/Comentarios';
const { fetchLugar } = actions;

const comentarios = [
  {
    id: 1,
    nombre: 'Alvertik',
    comentario: 'la verdad una buceta jajaj saludos',
    foto
  },
  {
    id: 2,
    nombre: 'Steven',
    comentario: 'estuve ahi, esta bueno el lugar ese',
    foto
  },
  { id: 3, nombre: 'Susan', comentario: 'que suciooooooo ASCO', foto }
];

const Lugar = props => {
  useEffect(() => {
    props.fetchLugar(props.match.params.id);
  }, []);

  const marker = <Marker position={props.lugar.latlng}></Marker>;

  if (props.cargando) {
    return <Spinner />;
  }

  if (props.lugar.latlng) {
    return (
      <div className='bg-light'>
        <div className='container text-center py-2'>
          <h2 className='my-2 text-uppercase'>{props.lugar.nombre}</h2>
          <h5 className='my-2'>{props.lugar.descripciono}</h5>
          <div className='row'>
            <div className='col-md-6 my-2 bg-white p-2' style={{ height: 350 }}>
              <img
                src={`http://localhost:5000/${props.lugar.foto}`}
                alt='foto del lugar'
                className='rounded mx-auto'
                style={{ height: '100%' }}
              />
            </div>
            <div className='col-md-6 my-2'>
              <Mapa zoom={4} latlng={props.lugar.latlng} markers={marker} />
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <h3 className='my-2'>Comentarios</h3>
              <form className='form-row justify-content-center'>
                <div className='col-md-10'>
                  <textarea
                    className='form-control my-2'
                    id='exampleFormControlTextarea1'
                    rows='2'
                  ></textarea>
                </div>
                <button className='btn btn-dark my-2'>Comentar</button>
              </form>
            </div>
            <Comentarios comentarios={props.lugar.comentarios} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const mapStateToProps = state => {
  return {
    lugar: state.lugar.lugar,
    error: state.lugar.error,
    cargando: state.lugar.cargando
  };
};

export default connect(mapStateToProps, { fetchLugar })(Lugar);
