const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash')
const handlebars = require('handlebars');
const {allowInsecurePrototypeAcces, allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

/* Initiliazations (Inicializaciones) */
const app = express();
require('./database');

/* Settings (Configuraciones) */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: allowInsecurePrototypeAccess(handlebars)
}));
app.set('view engine', '.hbs');

/* Middlewares (Funciones ejecutadas antes de que lleguen al servidor) */
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true,
}))
app.use(flash());

/* Global Variables (Variables globales) (Datos accesibles para toda nuestra aplicacion) */
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

/* Routes (Rutas) */
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

/* Static Files (Archivos estaticos) */
app.use(express.static(path.join(__dirname, 'public')));

/* Inicializar el servidor (Servidor escuchando) */
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
