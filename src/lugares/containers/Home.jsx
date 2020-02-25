import React, { useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Mapa from '../components/Mapa';
import Spinner from '../components/Spinner';

import actions from '../../actions';
const { fetchTodosLosLugares } = actions;

const Home = props => {
  useEffect(() => {
    props.fetchTodosLosLugares();
  }, []);

  const latlng = {
    lat: 10.90534,
    lng: -10.55076
  };

  const markers = props.lugares.map(l => {
    return (
      <Marker position={l.latlng} key={l._id}>
        <Popup>
          <div className='container text-center'>
            <h6>{l.nombre}</h6>
            <Link to={`/lugar/${l._id}`}>
              <button className='btn btn-sm btn-dark'>Ver lugar</button>
            </Link>
          </div>
        </Popup>
      </Marker>
    );
  });

  if (props.cargando) {
    return <Spinner />;
  }

  return (
    <div style={{ height: '91.5%' }}>
      <Mapa
        zoom={3}
        latlng={latlng}
        markers={markers}
        style={{ minHeight: '100%' }}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    cargando: state.todosLosLugares.cargando,
    lugares: state.todosLosLugares.lugares,
    error: state.todosLosLugares.error
  };
};

export default connect(mapStateToProps, { fetchTodosLosLugares })(Home);
