import { USER_LOGOUT, USER_LOGIN_ERROR, SET_USUARIO_ACTUAL } from '../types';

const initialState = {
  user: {},
  autenticado: false,
  error: ''
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USUARIO_ACTUAL:
      return {
        ...state,
        autenticado: Object.entries(action.user) === 0 ? false : true,
        user: action.user,
        error: ''
      };
    case USER_LOGIN_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case USER_LOGOUT:
      return {
        user: {},
        autenticado: false,
        error: ''
      };
    default:
      return state;
  }
}
