// Required Modules
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');


// Initialization
const app = express();
dotenv.config();

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
}))



// Routes
app.use(IndexRoutes);
app.use(UsersRoutes);
app.use(NoteRoutes);

// Global Variables

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Server is Listenning
app.listen(process.env.PORT, () => console.log(`Server is Listenning ${process.env.PORT}`));