import { combineReducers } from 'redux';
import registerReducer from './registerReducer';
import loginReducer from './loginReducer';
import userProfileReducer from './userProfileReducer';

const rootReducer = combineReducers({
  register: registerReducer,
  auth: loginReducer,
  userProfile: userProfileReducer
});

export default rootReducer;
