import axios from 'axios';

import {
  FETCH_TODOS_LUGARES_INICIO,
  FETCH_TODOS_LUGARES_SUCCESS,
  FETCH_TODOS_LUGARES_ERROR
} from '../types';

export const fetchTodosLosLugares = () => dispatch => {
  dispatch(fetchTodosLosLugaresInicio());

  axios
    .get('http://localhost:5000/api/places')
    .then(res => {
      dispatch(fetchTodosLosLugaresSuccess(res.data));
    })
    .catch(err => dispatch(fetchTodosLosLugaresError(err.resonse.data.error)));
};

const fetchTodosLosLugaresInicio = () => {
  return { type: FETCH_TODOS_LUGARES_INICIO };
};

const fetchTodosLosLugaresSuccess = lugares => {
  return { type: FETCH_TODOS_LUGARES_SUCCESS, payload: lugares };
};

const fetchTodosLosLugaresError = error => {
  return { type: FETCH_TODOS_LUGARES_ERROR, payload: error };
};
