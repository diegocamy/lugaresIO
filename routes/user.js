const express = require('express');
const route = express.Router();
// require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    //aceptar foto
    cb(null, true);
  } else {
    //rechazar foto
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

//User mongoose schema
const User = require('../models/User');

//joi user validation
const userValidation = require('../validation/userValidation');

//auth middleware
const authValidate = require('../authentication/validAuth');

// POST /api/users/register
// registra un usuario
// publica

route.post('/register', (req, res) => {
  User.findOne({ nombreUsuario: req.body.nombreUsuario })
    .then(user => {
      if (user) {
        return res.json({ error: 'Ese nombre de usuario ya existe' });
      }

      //usuario ingresado
      const usuarioIngresado = {
        nombreUsuario: req.body.nombreUsuario,
        nombre: req.body.nombre || '',
        ciudad: req.body.ciudad || '',
        pais: req.body.pais || '',
        password: req.body.password,
        password2: req.body.password2
      };

      if (!usuarioIngresado.nombreUsuario) {
        return res.json({ error: 'Debe ingresar un nombre de usuario!' });
      }

      //checkear si las contraseñas coinciden
      if (usuarioIngresado.password !== usuarioIngresado.password2) {
        return res.json({ error: 'Las contraseñas no coinciden' });
      }

      delete usuarioIngresado.password2;

      //validar los datos ingresados con Joi
      const validation = userValidation.validate(usuarioIngresado);

      if (validation.error) {
        return res.json({ error: validation.error.details[0].message });
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
            .catch(e => res.json(e));
        })
        .catch(err => res.json(err));
    })
    .catch(err => res.json({ error: 'Ese nombre de usuario ya existe!' }));
});

// POST /api/users/login
// logea un usuario
// publica

route.post('/login', (req, res) => {
  //datos ingresados
  const usuarioIngresado = {
    nombreUsuario: req.body.nombreUsuario,
    password: req.body.password
  };

  //buscar usuario en db
  User.findOne({ nombreUsuario: usuarioIngresado.nombreUsuario }).then(
    usuario => {
      if (!usuario) {
        return res
          .status(400)
          .json({ error: 'Usuario o contraseña incorrecta' });
      }

      //comparar password
      bcrypt
        .compare(usuarioIngresado.password, usuario.password)
        .then(sonIguales => {
          if (sonIguales) {
            //JWT payload
            const payload = {
              id: usuario._id,
              nombreUsuario: usuario.nombreUsuario,
              foto: usuario.foto
            };
            //JWT
            jwt.sign(
              payload,
              process.env.LLAVE,
              {
                expiresIn: '1h'
              },
              //devolver token
              (err, token) => {
                if (err) {
                  console.log(err);
                  return res
                    .status(400)
                    .json({ error: 'Usuario o contraseña incorrecta' });
                }

                res.json({ token });
              }
            );
          } else {
            return res
              .status(400)
              .json({ error: 'Usuario o contraseña incorrecta' });
          }
        })
        .catch(err => res.sendStatus(400).json(err));
    }
  );
});

// PATCH /api/users/update
// actualizar info del user
// privada

route.patch('/update', authValidate, upload.single('foto'), (req, res) => {
  //nuevos datos
  const datosIngresados = {
    nombre: req.body.nombre || '',
    ciudad: req.body.ciudad || '',
    pais: req.body.pais || ''
  };
  if (req.file) datosIngresados.foto = req.file.path.replace(`\\`, '/');

  //actualizar los datos
  User.findOneAndUpdate(
    { _id: req.user.id },
    {
      $set: {
        ...datosIngresados
      }
    },
    { new: true, useFindAndModify: false }
  )
    .then(user => {
      if (user) {
        return res.json({
          id: user._id,
          nombreUsuario: user.nombreUsuario,
          nombre: user.nombre,
          ciudad: user.ciudad,
          pais: user.pais,
          foto: user.foto
        });
      } else {
        return res.status(404).json({ error: 'User not found.' });
      }
    })
    .catch(err => res.status(400).json({ error: err }));
});

// DELETE /api/users/
// borrar user
// privada

route.delete('/delete', authValidate, (req, res) => {
  User.findOneAndDelete({ _id: req.user.id })
    .then(() => res.json({ success: 'Usuario eliminado' }))
    .catch(err => res.status(400).json({ error: err }));
});

// GET /api/users/
// obtener lista de usuarios
// publica

route.get('/', (req, res) => {
  User.find()
    .sort('nombreUsuario')
    .then(users => {
      if (!users) {
        return res.status(404).json({ error: 'No existen usuarios.' });
      }

      res.json(users);
    })
    .catch(err => res.json(err));
});

// GET /api/users/:user_id
// obtener usuario por id
// publica

route.get('/:user_id', (req, res) => {
  User.findOne({ _id: req.params.user_id })
    .select('-password')
    .then(user => {
      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado.' });
      }
      res.json(user);
    })
    .catch(err => res.status(404).json({ error: 'Usuario no encontrado.' }));
});

module.exports = route;
