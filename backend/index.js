const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');
const tipo_servicio = require('./routes/tipo_servicio');
const vehiculos = require('./routes/vehiculos');
const usuarios = require('./routes/usuarios');
const negocios = require('./routes/negocios');
const historial_negocio = require('./routes/historial_negocio');
const historial_cliente = require('./routes/historial_cliente');
const ubicacion = require('./routes/ubicacion')
const movimientos = require('./routes/movimientos_dinero');


app.use(cors({origin: '*'}));

app.set('port', process.env.PORT || 4000);


//Los middlewears 
app.use(express.json());

//rutas :b
app.use('/servicios', tipo_servicio);
app.use('/vehiculos', vehiculos);
app.use('/usuarios', usuarios);
app.use('/negocios', negocios);
app.use('/historiales-negocios', historial_negocio);
app.use('/historiales-cliente', historial_cliente);
app.use('/ubicaciones', ubicacion);
app.use('/movimientos', movimientos)


app.listen(app.get('port'), () => {
    console.log(`Servidor corriendo en puerto ${app.get('port')}`);
});