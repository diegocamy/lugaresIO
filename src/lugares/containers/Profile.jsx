import React, { useEffect } from 'react';
import { Map as Mapita, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import actions from '../../actions';
import fotoPerfil from '../../img/profile.png';

const { fetchProfile } = actions;

const Profile = props => {
  //cargar datos del perfil
  const userId = props.match.params.userId;

  //si el id del usuario que se busca es igual al id del usuario logeado
  //redireccionar a dashboard
  if (userId === props.userLogeado) {
    props.history.push('/dashboard');
  }

  useEffect(() => {
    props.fetchProfile(userId);
  }, []);

  const latlng = {
    lat: -30.90534,
    lng: -55.55076
  };

  if (props.cargando) {
    return (
      <div className='my-5 d-flex justify-content-center'>
        <div className='spinner-border text-primary' role='status'>
          <span className='sr-only'>Loading...</span>
        </div>
      </div>
    );
  }

  if (props.error) {
    return (
      <div className='text-center my-5'>
        <h2>{props.error}</h2>
        <Link to='/'>
          <button className='btn btn-primary'>Inicio</button>
        </Link>
      </div>
    );
  }

  return (
    <div className='bg-light pb-4'>
      <div className='container'>
        <div className='row'>
          <div className='col my-2 mx-1 p-2 bg-white rounded-top'>
            <span className='h3 mx-2'>Perfil</span>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-3 col-lg-2 col-xl-2 text-center bg-white mx-1 p-1 mb-2'>
            <h5>{props.user.nombreUsuario}</h5>
            <img
              className='rounded mx-auto img-fluid mb-4'
              src={fotoPerfil}
              alt='foto de perfil'
            />
            <h6>{props.user.nombre}</h6>
            <h6>{props.user.ciudad}</h6>
            <h6>{props.user.pais}</h6>
          </div>
          <div className='col text-center bg-white mx-1 mb-2'>
            <h3 className='mt-2'>LUGARES COMPARTIDOS</h3>
            <Mapita
              className='map'
              style={{ height: 350 }}
              center={latlng}
              length={4}
              zoom={13}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
            </Mapita>
            <div className='row row-cols-1 row-cols-md-2 row-cols-lg-3 mt-4'>
              <div className='col mb-4'>
                <div className='card'>
                  <img src='...' className='card-img-top' alt='...' />
                  <div className='card-body'>
                    <h5 className='card-title'>Card title</h5>
                    <p className='card-text'>
                      <button className='btn btn-dark'>Ver Lugar</button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.userProfile.user,
    error: state.userProfile.error,
    cargando: state.userProfile.cargando,
    userLogeado: state.auth.user.id
  };
};

export default connect(mapStateToProps, { fetchProfile })(Profile);
