import axios from 'axios';
import {
  USER_REGISTER_STARTED,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_ERROR
} from '../types';

export const userRegister = (usuarioNuevo, history) => dispatch => {
  dispatch(registerStarted());

  axios
    .post('http://localhost:5000/api/users/register', {
      nombreUsuario: usuarioNuevo.nombreUsuario,
      password: usuarioNuevo.password,
      password2: usuarioNuevo.password2
    })
    .then(res => {
      dispatch(registerSuccess);
      history.push('/login');
    })
    .catch(err => dispatch(registerError(err)));
};

const registerStarted = () => ({
  type: USER_REGISTER_STARTED
});

const registerSuccess = () => ({
  type: USER_REGISTER_SUCCESS
});

const registerError = error => ({
  type: USER_REGISTER_ERROR,
  payload: error
});
