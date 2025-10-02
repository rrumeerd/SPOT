const {Router} = require('express');
const router = Router();
const mysqlConnection = require('../db');

router.get('/todos-los-negocios', (req, res) =>{
    mysqlConnection.query(`SELECT * FROM negocio`, (err, rows, fields) => {
        if (err) {
            res.status(500).json({error: 'Hubo un error al mostrar los negocios'});
        }else {
            res.json(rows);
        }
    });
});

router.get('/:ID_negocio', (req, res) =>{
    const {ID_negocio} = req.params;
    mysqlConnection.query(`SELECT * FROM negocio WHERE ID_negocio=?`, [ID_negocio], (err, rows, fields) => {
        if (err) {
            console.error('Error en la consulta', err);
            res.status(500).json({error: 'Hubo un error al mostrar el negocio', detalle:err});
        }else {
            res.json(rows);
        }
    });
});

router.post('/', (req, res) => {
    const { ID_negocio, Nombre_negocio, ID_usuario, Tipo_negocio, Correo, Telefono, Direccion, Servicio, Descripcion} = req.body;
    mysqlConnection.query(
        'INSERT INTO negocio (Nombre_negocio, ID_usuario, Tipo_negocio, Correo, Telefono, Direccion, Servicio, Descripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [ID_negocio, Nombre_negocio, ID_usuario, Tipo_negocio, Correo, Telefono, Direccion, Servicio, Descripcion],
        (err) => {
            if (err) {
                console.error('Error al agregar negocio', err);
                res.status(500).json({ error: 'No se pudo agregar el negocio', detalle: err });
            } else {
                res.json({ mensaje: 'Negocio agregado', ID_negocio: ID_negocio });
            }
        }
    );
});

router.put('/:ID_negocio', (req, res) => {
    const { ID_negocio } = req.params;
    const { Nombre_negocio, ID_usuario, Tipo_negocio, Correo, Telefono, Direccion, Servicio, Descripcion } = req.body;
    mysqlConnection.query(
        'UPDATE usuario SET Nombre_negocio=?, ID_usuario=?, Tipo_negocio=?, Correo=?, Telefono=?, Direccion=?, Servicio=?, Descripcion=? WHERE ID_negocio=?',
        [Nombre_negocio, ID_usuario, Tipo_negocio, Correo, Telefono, Direccion, Servicio, Descripcion, ID_negocio],
        (err) => {
            if (err) {
                console.error('Error al actualizar el negocio', err);
                res.status(500).json({ error: 'No se pudo actualizar el negocio', detalle: err });
            } else {
                res.json({ mensaje: 'Negocio actualizado' });
            }
        }
    );
});

router.delete('/:ID_negocio', (req, res) => {
    const { ID_negocio } = req.params;
    mysqlConnection.query(
        'DELETE FROM negocio WHERE ID_negocio=?',
        [ID_negocio],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar negocio', err);
                res.status(500).json({ error: 'No se pudo eliminar el negocio', detalle: err });
            } else {
                res.json({ mensaje: 'Negocio eliminado' });
            }
        }
    );
});


module.exports = router;