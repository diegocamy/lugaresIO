import { combineReducers } from 'redux';
import registerReducer from './registerReducer';
import loginReducer from './loginReducer';
import userProfileReducer from './userProfileReducer';
import actualizarDatosUserReducer from './actualizarDatosUserReducer';

const rootReducer = combineReducers({
  register: registerReducer,
  auth: loginReducer,
  userProfile: userProfileReducer,
  updateUserData: actualizarDatosUserReducer
});

export default rootReducer;
