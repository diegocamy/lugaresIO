import axios from 'axios';

import {
  FETCH_USER_INICIO,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR
} from '../types';

export const fetchProfile = id => dispatch => {
  dispatch(inicioFetchUser());

  axios
    .get(`http://localhost:5000/api/users/${id}`)
    .then(res => {
      dispatch(finFetchUser(res.data));
    })
    .catch(err => dispatch(errorFetchUser(err.response.data.error)));
};

const inicioFetchUser = () => {
  return {
    type: FETCH_USER_INICIO
  };
};

const finFetchUser = user => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user
  };
};

const errorFetchUser = error => {
  return {
    type: FETCH_USER_ERROR,
    payload: error
  };
};
