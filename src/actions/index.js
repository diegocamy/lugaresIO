import { userRegister } from './userRegister';
import { login, logout } from './userLogin';
import { fetchProfile } from './fetchProfile';

const actions = {
  userRegister,
  login,
  logout,
  fetchProfile
};

export default actions;
