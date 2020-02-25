import { userRegister } from './userRegister';
import { login, logout } from './userLogin';
import { fetchProfile } from './fetchProfile';
import { editarPerfil } from './editarPerfil';
import { compartirLugar } from './compartirLugar';
import { fetchLugar } from './fetchLugar';
import { comentarLugar } from './comentarLugar';
import { fetchTodosLosLugares } from './fetchTodosLosLugares';

const actions = {
  userRegister,
  login,
  logout,
  fetchProfile,
  editarPerfil,
  compartirLugar,
  fetchLugar,
  comentarLugar,
  fetchTodosLosLugares
};

export default actions;
