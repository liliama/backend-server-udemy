//Requires lo requerido  -- hacer referencia a libreria
var express= require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')


// inicializar varialbles
var app = express();



//Body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//Immportar rutas
var appRoutes = require('./routes/app');
var usuarioRoute = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var hospitalRoutes = require('./routes/hospital');

//Conexion a las bases de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', ( err, res ) => {
  
    if( err ) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m','online'); 
});




//Rutas midelwhere
app.use('/usuario', usuarioRoute);
app.use('/login', loginRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/', appRoutes);



//Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m','online');   
});