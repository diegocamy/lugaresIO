import React, { createRef, Component } from 'react';
import { Map as Mapita, TileLayer, Marker } from 'react-leaflet';

export default class EventsExample extends Component {
  state = {
    hasLocation: false,
    latlng: {
      lat: -30.90534,
      lng: -55.55076
    },
    zoom: 13,
    nombre: '',
    descripcion: ''
  };

  mapRef = createRef(Mapita);

  handleClick = e => {
    const map = this.mapRef.current;
    if (map != null) {
      const zoom = e.target._zoom;
      this.setState({ hasLocation: true, latlng: e.latlng, zoom });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFoto = e => {
    this.setState({ foto: e.target.files[0] });
  };

  render() {
    const marker = this.state.hasLocation ? (
      <Marker position={this.state.latlng}></Marker>
    ) : null;

    return (
      <div className='container'>
        <div className='row'>
          <div className='col text-center mt-2'>
            <h2>Ingresar Nuevo Lugar</h2>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6 col-lg-6 mt-2 mx-auto'>
            <Mapita
              className='map'
              style={{ height: 350 }}
              center={this.state.latlng}
              length={4}
              onClick={this.handleClick}
              ref={this.mapRef}
              zoom={this.state.zoom}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              {marker}
            </Mapita>
          </div>
          <div className='col-md-6 col-lg-6 mt-2'>
            <form onSubmit={e => this.handleSubmit(e)}>
              <div className='form-group'>
                <label htmlFor='nombreLugar'>Nombre del Lugar</label>
                <input
                  type='text'
                  name='nombre'
                  className='form-control'
                  id='nombreLugar'
                  aria-describedby='nombreLugar'
                  value={this.state.nombre}
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='descripcion'>Descripcion</label>
                <textarea
                  type='text'
                  name='descripcion'
                  className='form-control'
                  id='descripcion'
                  value={this.state.descripcion}
                  onChange={e => this.handleChange(e)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='foto'>Foto</label>
                <input
                  type='file'
                  className='form-control-file'
                  id='foto'
                  onChange={e => this.handleFoto(e)}
                />
              </div>
              <button className='btn btn-primary btn'>Agregar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
