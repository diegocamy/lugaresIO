import React from 'react';
import { Map as Mapita, TileLayer, Marker } from 'react-leaflet';

import foto from '../../img/profile.png';

const latlng = {
  lat: -30.90534,
  lng: -55.55076
};

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

const coments = comentarios.map(c => {
  return (
    <div className='container mx-5 my-1'>
      <div className='div'>
        <img
          src={c.foto}
          alt='foto'
          className='img-thumbnail float-left m-2'
          style={{ width: 100 }}
        />
      </div>
      <div
        className='bg-white text-left border p-1'
        style={{ minHeight: '100%' }}
      >
        <h5 className='text-dark m-1'>{c.nombre}</h5>
        <p className='text-break' style={{ lineHeight: 1.1 }}>
          {c.comentario}
        </p>
      </div>
    </div>
  );
});

const Lugar = () => {
  return (
    <div className='bg-light'>
      <div className='container text-center py-2'>
        <h2 className='my-2 text-uppercase'>Titulo del lugar</h2>
        <h5 className='my-2'>Descripcion del lugar este</h5>
        <div className='row'>
          <div className='col-md-6 my-2 bg-white p-2' style={{ height: 350 }}>
            <img
              src='https://live.staticflickr.com/4028/4266098597_f7521e4f60_b.jpg'
              alt='foto del lugar'
              className='rounded mx-auto'
              style={{ height: '100%' }}
            />
          </div>
          <div className='col-md-6 my-2'>
            <Mapita
              className='map'
              style={{ height: 350 }}
              center={latlng}
              length={4}
              zoom={14}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <Marker position={latlng}></Marker>
            </Mapita>
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
          {coments}
        </div>
      </div>
    </div>
  );
};

export default Lugar;
