const Joi = require('@hapi/joi');

const lugarValidation = Joi.object({
  nombre: Joi.string()
    .required()
    .messages({
      'string.empty': 'Debe ingresar un nombre'
    }),
  latlng: Joi.object().required(),
  usuario: Joi.string().required(),
  foto: Joi.required().messages({
    'any.empty': 'Debe cargar una foto'
  }),
  descripcion: Joi.string().allow(''),
  likes: Joi.array()
});

module.exports = lugarValidation;
