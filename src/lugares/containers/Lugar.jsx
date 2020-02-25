import React, { useEffect, useState } from 'react';
import { Marker } from 'react-leaflet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Mapa from '../components/Mapa';
import Spinner from '../components/Spinner';
import actions from '../../actions';
import Comentarios from '../components/Comentarios';
import foto from '../../img/profile.png';
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

  const formComentario = (
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
          <div className='row mx-3'>
            <div className='col-md-6 col-sm-6 mx-auto'>
              <div className='row'>
                <div className='col'>
                  <h6 className='text-active'>Compartido por:</h6>
                  <Link
                    to={`/profile/${props.lugar.usuario.id}`}
                    style={{ textDecoration: 'none' }}
                    className='text-muted'
                  >
                    <img
                      src={
                        props.lugar.usuario.foto
                          ? `http://localhost:5000/${props.lugar.usuario.foto}`
                          : foto
                      }
                      className={'rounded'}
                      style={{ height: '60px', width: '60px' }}
                      alt=''
                    />
                    <p>{props.lugar.usuario.nombreUsuario}</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6 mb-2 bg-white p-2' style={{ height: 350 }}>
              <img
                src={`http://localhost:5000/${props.lugar.foto}`}
                alt='foto del lugar'
                className='rounded mx-auto'
                style={{ height: '100%' }}
              />
            </div>
            <div className='col-md-6 mb-2'>
              <Mapa zoom={16} latlng={props.lugar.latlng} markers={marker} />
            </div>
          </div>
          <div className='col-md-6 mx-auto'>
            <div className='mx-2 my-2 h5'>
              115 <i class='fas fa-heart text-danger'></i>
            </div>
            {props.autenticado && (
              <button className='btn btn-danger'>
                <i className='far fa-heart'></i> Me gusta
              </button>
            )}
          </div>
          <div className='row'>
            {props.autenticado ? (
              formComentario
            ) : (
              <div className='text-center my-3 mx-auto'>
                <h3>Debes iniciar sesión para comentar</h3>
              </div>
            )}
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
    autenticado: state.auth.autenticado,
    lugar: state.lugar.lugar,
    error: state.lugar.error,
    cargando: state.lugar.cargando,
    cargandoComentario: state.comentario.cargando,
    errorComentario: state.comentario.error
  };
};

export default connect(mapStateToProps, { fetchLugar, comentarLugar })(Lugar);
