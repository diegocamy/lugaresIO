import { combineReducers } from 'redux';
import registerReducer from './registerReducer';
import loginReducer from './loginReducer';
import userProfileReducer from './userProfileReducer';
import actualizarDatosUserReducer from './actualizarDatosUserReducer';
import compartirLugarReducer from './compartirLugarReducer';
import lugarReducer from './lugarReducer';
import comentarLugarReducer from './comentarLugarReducer';

const rootReducer = combineReducers({
  register: registerReducer,
  auth: loginReducer,
  userProfile: userProfileReducer,
  updateUserData: actualizarDatosUserReducer,
  compartirLugar: compartirLugarReducer,
  lugar: lugarReducer,
  comentario: comentarLugarReducer
});

export default rootReducer;
