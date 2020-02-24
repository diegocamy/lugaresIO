import axios from 'axios';

import {
  INICIO_ACTUALIZACION_DATOS_USER,
  USER_ACTUALIZADO_EXITO,
  ERROR_ACTUALIZANDO_USER
} from '../types';

export const editarPerfil = (data, history) => dispatch => {
  dispatch(inicioActualizacionDatos());

  axios
    .patch(`http://localhost:5000/api/users/update`, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(res => {
      dispatch(datosActualizadoConExito());
      history.push('/dashboard');
    })
    .catch(err => {
      dispatch(errorActualizandoDatos(err.response.data));
    });
};

const inicioActualizacionDatos = () => {
  return {
    type: INICIO_ACTUALIZACION_DATOS_USER
  };
};

const datosActualizadoConExito = () => {
  return {
    type: USER_ACTUALIZADO_EXITO
  };
};

const errorActualizandoDatos = error => {
  return {
    type: ERROR_ACTUALIZANDO_USER,
    payload: error.error
  };
};
