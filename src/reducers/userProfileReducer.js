import {
  FETCH_USER_INICIO,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR
} from '../types';

const initialState = {
  user: {},
  error: '',
  cargando: false
};

export default function userProfileReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_INICIO:
      return {
        ...state,
        cargando: true
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        cargando: false
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        user: {},
        cargando: false,
        error: action.payload
      };
    default:
      return state;
  }
}
