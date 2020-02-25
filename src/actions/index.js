import { userRegister } from './userRegister';
import { login, logout } from './userLogin';
import { fetchProfile } from './fetchProfile';
import { editarPerfil } from './editarPerfil';
import { compartirLugar } from './compartirLugar';

const actions = {
  userRegister,
  login,
  logout,
  fetchProfile,
  editarPerfil,
  compartirLugar
};

export default actions;
