const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lugarSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    },
    foto: {
      type: String,
      required: true
    },
    descripcion: {
      type: String
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users'
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = Lugar = mongoose.model('lugares', lugarSchema);
