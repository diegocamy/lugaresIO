const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const userRoute = require('./routes/user');
const placesRoute = require('./routes/places');

//connect to db
mongoose
  .connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('CONNECTED TO DB'))
  .catch(err => console.log(err));

mongoose.connection.on('error', err => console.log(err));

app.get('/', (req, res) => {
  res.send('HELLO');
});

//middleware
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Rutas
app.use('/api/users', userRoute);
app.use('/api/places', placesRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
