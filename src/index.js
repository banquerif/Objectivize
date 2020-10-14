const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session')

/* Initiliazations (Inicializaciones) */
const app = express();
require('./database');

/* Settings (Configuraciones) */
app.set('port', process.env.PORT || 1957);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main.hbs',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
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

/* Global Variables (Variables globales) (Datos accesibles para toda nuestra aplicacion) */

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
