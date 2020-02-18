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

route.post('/', upload.single('fotoLugar'), authValidate, (req, res) => {
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

module.exports = route;
