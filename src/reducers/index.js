import { combineReducers } from 'redux';
import registerReducer from './registerReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  register: registerReducer,
  auth: loginReducer
});

export default rootReducer;
