import React, { Component } from 'react';
import { Map as Mapita, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import fotoPerfil from '../../img/profile.png';

class Profile extends Component {
  render() {
    const id = 22;
    const latlng = {
      lat: -30.90534,
      lng: -55.55076
    };
    return (
      <div className='bg-light pb-4'>
        <div className='container'>
          <div className='row'>
            <div className='col my-2 mx-1 p-2 bg-white rounded-top'>
              <span className='h3 mx-2'>Perfil</span>
              <button className='btn btn-dark btn-sm float-right'>
                Editar Perfil
              </button>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-3 col-lg-2 col-xl-2 text-center bg-white mx-1 p-1 mb-2'>
              <h5>Nombre de la persona</h5>
              <img
                className='rounded mx-auto img-fluid mb-4'
                src={fotoPerfil}
                alt='foto de perfil'
              />
              <h6>Mas datos 1</h6>
              <h6>Mas datos 2</h6>
              <h6>Mas datos 3</h6>
              <button className='btn btn-secondary btn-sm'>
                Editar perfil
              </button>
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
              <div class='row row-cols-1 row-cols-md-2 row-cols-lg-3 mt-4'>
                <div class='col mb-4'>
                  <div class='card'>
                    <img src='...' class='card-img-top' alt='...' />
                    <div class='card-body'>
                      <h5 class='card-title'>Card title</h5>
                      <p class='card-text'>
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
  }
}

export default Profile;
