const express = require('express');
const route = express.Router();
const bcrypt = require('bcryptjs');

//User mongoose schema
const User = require('../models/User');

//joi user validation
const userValidation = require('../validation/userValidation');

// POST /api/users/register
// registra un usuario
// publica

route.post('/register', (req, res) => {
  User.findOne({ nombreUsuario: req.body.nombreUsuario }).then(user => {
    if (user) {
      return res.status(400).json({ error: 'Ese nombre de usuario ya existe' });
    }

    //usuario ingresado
    const usuarioIngresado = {
      nombreUsuario: req.body.nombreUsuario,
      password: req.body.password,
      password2: req.body.password2
    };

    //checkear si las contraseñas coinciden
    if (usuarioIngresado.password !== usuarioIngresado.password2) {
      return res.status(400).json({ error: 'Las contraseñas no coinciden' });
    }

    delete usuarioIngresado.password2;

    //validar los datos ingresados con Joi
    const validation = userValidation.validate(usuarioIngresado);

    if (validation.error) {
      return res
        .status(400)
        .json({ error: validation.error.details[0].message });
    }

    //crear usuario
    const nuevoUsuario = new User({ ...validation.value });

    //hash password
    bcrypt
      .hash(nuevoUsuario.password, 10)
      .then(hashPass => {
        //reemplazar password
        nuevoUsuario.password = hashPass;
        //guardar usuario en db
        nuevoUsuario
          .save()
          .then(usr => res.json({ id: usr._id, usuario: usr.nombreUsuario }))
          .catch(e => res.status(400).json(e));
      })
      .catch(err => res.status(400).json(err));
  });
});

// GET /api/users/
// registra un usuario
// publica

module.exports = route;
