// Required Modules
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');


// Initialization
const app = express();
dotenv.config();
require('./config/passport')

// Data Base Connection
require('./database');

// Settings
app.set('views', path.join(__dirname, './views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');


// Router Import 
const IndexRoutes = require('./routes/index.routes');
const UsersRoutes = require('./routes/users.routes');
const NoteRoutes = require('./routes/notes.routes');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.update_msg = req.flash('update_msg');
    res.locals.delete_msg = req.flash('delete_msg');
    res.locals.user = req.user || null;
    next();
})

// Routes
app.use(IndexRoutes);
app.use(UsersRoutes);
app.use(NoteRoutes);


// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Server is Listenning
app.listen(process.env.PORT, () => console.log(`Server is Listenning ${process.env.PORT}`));