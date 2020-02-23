import React from 'react';
import { Map as Mapita, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

const data = [
  { id: 1, latlng: { lat: -30, lng: -55 } },
  { id: 2, latlng: { lat: -11, lng: 35 } },
  { id: 3, latlng: { lat: -15, lng: -25 } },
  { id: 4, latlng: { lat: -20, lng: -11 } },
  { id: 5, latlng: { lat: -10, lng: 34 } },
  { id: 6, latlng: { lat: -20, lng: -35 } }
];

const Home = () => {
  const latlng = {
    lat: -30.90534,
    lng: -55.55076
  };
  const markers = data.map(m => {
    return (
      <Marker position={m.latlng}>
        <Popup>
          <div className='container text-center'>
            <h6>Nombre</h6>
            <Link to={'lugar/2'}>
              <button className='btn btn-sm btn-dark'>Ver lugar</button>
            </Link>
          </div>
        </Popup>
      </Marker>
    );
  });

  return (
    <div style={{ height: '91.5%' }}>
      <Mapita
        className='map'
        style={{ minHeight: '100%' }}
        center={latlng}
        length={4}
        zoom={6}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {markers}
      </Mapita>
    </div>
  );
};

export default Home;
