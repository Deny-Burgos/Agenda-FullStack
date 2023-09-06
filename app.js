require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const contactosRouter = require('./controllers/contactos');
const { userExtractor } = require('./middleware/auth');
const logoutRouter = require('./controllers/logout');
const { MONGO_URI } = require('./config');

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    // await mongoose.connect(MONGO_URI);
    console.log('Conecto a mongodb');
  } catch (error) {
    console.error(error);
    console.log('No conecto a mongodb');
  }
})();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/', express.static(path.resolve(__dirname, 'views', 'home')));
app.use('/signup', express.static(path.resolve(__dirname, 'views', 'signup')));
app.use('/login', express.static(path.resolve(__dirname, 'views', 'login')));
app.use('/agenda', express.static(path.resolve(__dirname, 'views', 'agenda')));
app.use('/styles', express.static(path.resolve(__dirname, 'views', 'styles')));
app.use('/components', express.static(path.resolve(__dirname, 'views', 'components')));
app.use('/images', express.static(path.resolve('img')));
app.use('/verify/:id/:token', express.static(path.resolve(__dirname, 'views', 'verify')));

app.use(morgan('tiny'));

// Rutas backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/contactos', userExtractor, contactosRouter);


module.exports = app;