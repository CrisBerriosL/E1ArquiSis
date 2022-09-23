const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

require('dotenv').config();

const app = express();

app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

const routes = require('./routes/index');
const { errorHandler, notFoundError } = require('./middlewares/errorHandler');

const { User } = require('./models');

const { initializePassport } = require('./middlewares/passport-config');
initializePassport(
    passport, 
    username => User.findOne({ where: { username: username } }),
    id => User.findOne({ where: { id: id } })
    );

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use(errorHandler);
app.use(notFoundError);

module.exports = app;