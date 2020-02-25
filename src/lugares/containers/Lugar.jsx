import React, { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';
import { connect } from 'react-redux';

import Mapa from '../components/Mapa';
import Spinner from '../components/Spinner';
import actions from '../../actions';
import Comentarios from '../components/Comentarios';
const { fetchLugar, comentarLugar } = actions;

const Lugar = props => {
  const [comentario, setComentario] = useState('');

  useEffect(() => {
    props.fetchLugar(props.match.params.id);
  }, []);

  const marker = <Marker position={props.lugar.latlng}></Marker>;

  const enviarComentario = e => {
    e.preventDefault();
    props.comentarLugar(comentario, props.match.params.id);
    setComentario('');
  };

  const alertMessage = (
    <div className='alert alert-danger' role='alert'>
      {props.errorComentario}
    </div>
  );

  if (props.cargando || props.cargandoComentario) {
    return <Spinner />;
  }

  if (props.lugar.latlng) {
    return (
      <div className='bg-light'>
        <div className='container text-center py-2'>
          <h2 className='my-2 text-uppercase'>{props.lugar.nombre}</h2>
          <h5 className='my-2'>{props.lugar.descripcion}</h5>
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
              <Mapa zoom={16} latlng={props.lugar.latlng} markers={marker} />
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <h3 className='my-2'>Comentarios</h3>
              {props.errorComentario && alertMessage}
              <form
                className='form-row justify-content-center'
                onSubmit={enviarComentario}
              >
                <div className='col-md-10'>
                  <textarea
                    className='form-control my-2'
                    id='exampleFormControlTextarea1'
                    rows='2'
                    value={comentario}
                    onChange={e => setComentario(e.target.value)}
                  />
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
    cargando: state.lugar.cargando,
    cargandoComentario: state.comentario.cargando,
    errorComentario: state.comentario.error
  };
};

export default connect(mapStateToProps, { fetchLugar, comentarLugar })(Lugar);
