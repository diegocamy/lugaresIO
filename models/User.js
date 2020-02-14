const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  nombre: {
    type: String
  },
  ciudad: {
    type: String
  },
  pais: {
    type: String
  },
  seguidores: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  seguidos: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      }
    }
  ],
  fecha: {
    type: Date,
    default: Date.now()
  }
});

module.exports = User = mongoose.model('users', userSchema);
