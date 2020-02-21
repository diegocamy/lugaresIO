import { combineReducers } from 'redux';
import errorsReducer from './errorsReducer';
import registerReducer from './registerReducer';

const rootReducer = combineReducers({
  register: registerReducer,
  errors: errorsReducer
});

export default rootReducer;
