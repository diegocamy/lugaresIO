import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ListaLugares from '../components/ListaLugares';

const LUGARES2 = [
  {
    id: 1,
    nombre: 'O beco',
    foto: 'https://live.staticflickr.com/4028/4266098597_f7521e4f60_b.jpg',
    descripcion: 'U beco irmau',
    likes: 22
  },
  {
    id: 2,
    nombre: 'Parque',
    foto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaBHcfOLz9imvBaiaSOLc6aEW2sAh7Zo9a4SFmJUwFZ-OLqutY&s',
    descripcion: 'Parque Verde',
    likes: 11
  },
  {
    id: 3,
    nombre: 'Parque',
    foto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaBHcfOLz9imvBaiaSOLc6aEW2sAh7Zo9a4SFmJUwFZ-OLqutY&s',
    descripcion: 'Parque Verde',
    likes: 11
  },
  {
    id: 4,
    nombre: 'eParque',
    foto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaBHcfOLz9imvBaiaSOLc6aEW2sAh7Zo9a4SFmJUwFZ-OLqutY&s',
    descripcion: 'Parque Verde',
    likes: 116
  },
  {
    id: 35,
    nombre: 'Parque',
    foto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaBHcfOLz9imvBaiaSOLc6aEW2sAh7Zo9a4SFmJUwFZ-OLqutY&s',
    descripcion: 'Parque Verde',
    likes: 11
  },
  {
    id: 23,
    nombre: 'Parque',
    foto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaBHcfOLz9imvBaiaSOLc6aEW2sAh7Zo9a4SFmJUwFZ-OLqutY&s',
    descripcion: 'Parque Verde',
    likes: 11
  },
  {
    id: 311,
    nombre: 'Parque',
    foto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaBHcfOLz9imvBaiaSOLc6aEW2sAh7Zo9a4SFmJUwFZ-OLqutY&s',
    descripcion: 'Parque Verde',
    likes: 11
  },
  {
    id: 52,
    nombre: 'Parque',
    foto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaBHcfOLz9imvBaiaSOLc6aEW2sAh7Zo9a4SFmJUwFZ-OLqutY&s',
    descripcion: 'Parque Verde',
    likes: 11
  },
  {
    id: 366,
    nombre: 'Parque',
    foto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaBHcfOLz9imvBaiaSOLc6aEW2sAh7Zo9a4SFmJUwFZ-OLqutY&s',
    descripcion: 'Parque Verde',
    likes: 11
  },
  {
    id: 27,
    nombre: 'ParquePAREQUE ARASCAPITO DI SOUZA FRAGANTI',
    foto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaBHcfOLz9imvBaiaSOLc6aEW2sAh7Zo9a4SFmJUwFZ-OLqutY&s',
    descripcion:
      'Parque Verde lorem ipsum asdasdasdasd lorem ipsum asdasdasdasd lorem ipsum asdasdasdasd lorem ipsum asdasdasdasd lorem ipsum asdasdasdasd lorem ipsum asdasdasdasd lorem ipsum asdasdasdasd',
    likes: 11
  },
  {
    id: 384,
    nombre: 'Parque',
    foto:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaBHcfOLz9imvBaiaSOLc6aEW2sAh7Zo9a4SFmJUwFZ-OLqutY&s',
    descripcion: 'Parque Verde',
    likes: 11
  }
];

const Lugares = () => {
  const [lugares, setLugares] = useState(LUGARES2);

  const filtrarLugares = (valor, lugares) => {
    if (Number(valor) === 1) {
      //filtrar por cantidad de likes
      let filtradoPorLikes = [...lugares];
      filtradoPorLikes = filtradoPorLikes.sort((a, b) => b.likes - a.likes);
      setLugares(filtradoPorLikes);
    } else if (valor === 2) {
      //filtrar por fecha
      const filtradoPorLikes = lugares.sort((a, b) => a.likes - b.likes);
      setLugares(filtradoPorLikes);
    } else if (Number(valor) === 3) {
      //filtrar por nombre
      let filtradoPorNombre = [...lugares];
      filtradoPorNombre = filtradoPorNombre.sort((a, b) => {
        if (a.nombre > b.nombre) {
          return -1;
        }
        if (a.nombre < b.nombre) {
          return 1;
        }

        return 0;
      });
      setLugares(filtradoPorNombre);
    }
  };

  return (
    <div className='container '>
      <div className='row mt-4'>
        <div className='col text-center'>
          <h2>Has visitado algun lugar nuevo?</h2>
          <Link to='/add-place'>
            <button className='btn btn-primary btn-large'>
              Compartir un Lugar
            </button>
          </Link>
        </div>
      </div>
      <div className='row text-center justify-items-center'>
        <div className='col-md-6 col-lg-6 mx-auto mt-4 '>
          <h2>Filtrar Por:</h2>
          <select
            className='custom-select my-1 mr-sm-2'
            id='inlineFormCustomSelectPref'
            onChange={e => filtrarLugares(e.target.value, lugares)}
          >
            <option defaultValue>Elegir</option>
            <option value='1'>Popularidad</option>
            <option value='2'>Fecha</option>
            <option value='3'>Nombre</option>
          </select>
        </div>
      </div>
      <ListaLugares lugares={lugares} />
    </div>
  );
};

export default Lugares;
