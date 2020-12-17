require('./config/config')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});


app.use(bodyParser.urlencoded({ extended: false }));


app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.send('<h1>Bienvenido a mi servidor REST</h1>');
});

//rutas

app.use(require('./routes/usuario'));
app.use(require('./routes/empleado'));
app.use(require('./routes/departamento'));


//conexion

mongoose.connect("mongodb+srv://admin:d80ce98a@cluster0.0wfwm.mongodb.net/empleos", {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log('El servidor esta en linea en el puerto', process.env.PORT);
});