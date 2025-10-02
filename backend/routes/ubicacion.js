const {Router} = require('express');
const router = Router();
const mysqlConnection = require('../db');

router.get('/todas-las-ubicaciones', (req, res) =>{
    mysqlConnection.query(`SELECT * FROM ubicacion`, (err, rows, fields) => {
        if (err) {
            res.status(500).json({error: 'Hubo un error al mostrar las ubicaciones'});
        }else {
            res.json(rows);
        }
    });
});

router.get('/:ID_ubicacion', (req, res) =>{
    const {ID_ubicacion} = req.params;
    mysqlConnection.query(`SELECT * FROM ubicacion WHERE ID_ubicacion=?`, [ID_ubicacion], (err, rows, fields) => {
        if (err) {
            console.error('Error en la consulta', err);
            res.status(500).json({error: 'Hubo un error al mostrar la ubicación', detalle:err});
        }else {
            res.json(rows);
        }
    });
});

router.post('/', (req, res) => {
    const {ID_ubicacion, ID_negocio, Latitud, Longitud} = req.body;
    mysqlConnection.query(
        'INSERT INTO ubicacion (ID_negocio, Latitud, Longitud) VALUES (?, ?, ?, ?)',
        [ID_ubicacion, ID_negocio, Latitud, Longitud],
        (err) => {
            if (err) {
                console.error('Error al agregar la ubicación', err);
                res.status(500).json({ error: 'No se pudo agregar la ubicacion', detalle: err });
            } else {
                res.json({ mensaje: 'Ubicación agregada', ID_ubicacion: ID_ubicacion });
            }
        }
    );
});

router.put('/Ubicacion', (req, res) => {
    const { ID_ubicacion } = req.params;
    const {ID_negocio, Latitud, Longitud } = req.body;
    mysqlConnection.query(
        'UPDATE ubicacion SET ID_negocio=?, Latitud=?, Longitud=? WHERE ID_ubicacion=?',
        [ID_negocio, Latitud, Longitud, ID_ubicacion],
        (err) => {
            if (err) {
                console.error('Error al actualizar ubicación', err);
                res.status(500).json({ error: 'No se pudo actualizar la ubicacion', detalle: err });
            } else {
                res.json({ mensaje: 'Ubicacion actualizada' });
            }
        }
    );
});

router.delete('/:ID_ubicacion', (req, res) => {
    const { ID_ubicacion } = req.params;
    mysqlConnection.query(
        'DELETE FROM ubicacion WHERE ID_ubicacion=?',
        [ID_ubicacion],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar ubicacion', err);
                res.status(500).json({ error: 'No se pudo eliminar la ubicacion', detalle: err });
            } else {
                res.json({ mensaje: 'Ubicacion eliminada' });
            }
        }
    );
});

module.exports = router;