const express = require('express');
const route = express.Router();
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

//auth middleware
const authValidate = require('../authentication/validAuth');

//lugares mongoose schema
const Lugar = require('../models/Lugar');

//validation para el lugar
const lugarValidation = require('../validation/lugarValidation');

// GET /api/places/
// obtener todos los lugares
// publica

route.get('/', (req, res) => {
  Lugar.find()
    .select('_id nombre foto descripcion likes usuario latlng')
    .exec()
    .then(lugares => res.json(lugares))
    .catch(err => {
      return res.status(400).json({ error: err });
    });
});

// GET /api/places/:id
// obtener un lugar
// publica

route.get('/:id', (req, res) => {
  Lugar.findOne({ _id: req.params.id })
    .then(lugar => res.json(lugar))
    .catch(err => {
      return res.status(400).json({ error: 'Lugar no encontrado.' });
    });
});

// POST /api/places/
// crear un lugar nuevo
// privada

route.post('/', authValidate, upload.single('fotoLugar'), (req, res) => {
  if (!req.file)
    return res.status(400).json({ error: 'Necesita subir una foto' });

  const lugarIngresado = {
    latlng: {
      lat: req.body.lat,
      lng: req.body.lng
    },
    nombre: req.body.nombre,
    usuario: req.user.id,
    foto: req.file.path.replace(`\\`, '/'),
    descripcion: req.body.descripcion || ''
  };

  const validation = lugarValidation.validate(lugarIngresado);

  if (validation.error) {
    return res.status(400).json({ error: validation.error.details[0].message });
  }

  const lugar = new Lugar({ ...validation.value });

  lugar.save((err, doc) => {
    if (err)
      return res
        .status(500)
        .json({ mensaje: 'Hubo un error al subir la img', error: err });

    res.json(doc);
  });
});

// POST /api/places/like/:id
// like a un lugar
// privada

route.post('/like/:id', authValidate, (req, res) => {
  Lugar.findOne({ _id: req.params.id }).then(lugar => {
    //Verificar si el usuario ha dado like
    const like = lugar.likes.find(el => el.toString() === req.user.id);

    //si ha dado like, elimina el like
    if (like) {
      const newLikeArray = lugar.likes.filter(
        lk => lk.toString() !== like.toString()
      );
      lugar.likes = [...newLikeArray];
    } else {
      //si no ha dado like, agrega el like
      lugar.likes.unshift(req.user.id);
      console.log(lugar.likes);
    }

    //guarda los cambios
    lugar
      .save()
      .then(lugar => res.json(lugar))
      .catch(err => res.json({ errorazo: err }));
  });
  // .catch(error => res.status(404).json({ error: 'Lugar no encontrado' }));
});

// PATCH /api/places/:id
// actualiza la info a un lugar
// privada

route.patch('/:id', authValidate, upload.single('fotoLugar'), (req, res) => {
  const nuevosDatos = {};

  if (req.file) {
    nuevosDatos.foto = req.file.path.replace(`\\`, '/');
  }

  if (req.body.lat && req.body.lng) {
    nuevosDatos.latlng = {};
    nuevosDatos.latlng.lat = req.body.lat;
    nuevosDatos.latlng.lng = req.body.lng;
  }

  if (req.body.nombre) {
    nuevosDatos.nombre = req.body.nombre;
  }

  if (req.body.descripcion) {
    nuevosDatos.descripcion = req.body.descripcion;
  }

  Lugar.findOneAndUpdate(
    { _id: req.params.id, usuario: req.user.id },
    nuevosDatos,
    {
      new: true,
      useFindAndModify: false
    }
  )
    .then(usr => res.status(200).json(usr))
    .catch(err => res.status(400).json({ error: err }));
});

// DELETE /api/places/:id
// borra un lugar
// privada

route.delete('/:id', authValidate, (req, res) => {
  Lugar.findOneAndDelete({
    _id: req.params.id,
    usuario: req.user.id
  })
    .then(lugar => res.json(lugar))
    .catch(err => res.status(400).json({ error: err }));
});

module.exports = route;
