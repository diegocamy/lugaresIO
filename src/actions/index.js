import { userRegister } from './userRegister';
import { login, logout } from './userLogin';
import { fetchProfile } from './fetchProfile';
import { editarPerfil } from './editarPerfil';

const actions = {
  userRegister,
  login,
  logout,
  fetchProfile,
  editarPerfil
};

export default actions;
