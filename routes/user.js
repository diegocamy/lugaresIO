const express = require('express');
const route = express.Router();

const User = require('../models/User');

route.get('/', (req, res) => {
  res.send('USER ROUTE');
});

route.post('/register', (req, res) => {
  User.findOne({ nombreUsuario: req.body.nombreUsuario }).then(user => {
    if (user) {
      return res.status(400).json({ error: 'Ese nombre de usuario ya existe' });
    }

    //crear nuevo usuario

    const usuarioIngresado = {
      nombreUsuario: req.body.nombreUsuario,
      password: req.body.password,
      password2: req.body.password2
    };

    if (usuarioIngresado.password !== usuarioIngresado.password2) {
      return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    const nuevoUsuario = new User({ ...usuarioIngresado });
    nuevoUsuario
      .save()
      .then(usr => res.json(usr))
      .catch(err => res.json(err));
  });
});

module.exports = route;
