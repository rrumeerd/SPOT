const {Router} = require('express');
const router = Router();
const mysqlConnection = require('../db');

router.get('/todos-los-servicios', (req, res) =>{
    mysqlConnection.query(`SELECT * FROM tipo_servicio`, (err, rows, fields) => {
        if (err) {
            res.status(500).json({error: 'Hubo un error al mostrar los servicios'});
        }else {
            res.json(rows);
        }
    });
});

router.get('/:ID_servicio', (req, res) =>{
    const {ID_servicio} = req.params;
    mysqlConnection.query(`SELECT * FROM tipo_servicio WHERE ID_servicio=?`, [ID_servicio], (err, rows, fields) => {
        if (err) {
            console.error('Error en la consulta', err);
            res.status(500).json({error: 'Hubo un error al mostrar el servicio', detalle:err});
        }else {
            res.json(rows);
        }
    });
});

router.post('/', (req, res) => {
    const {ID_servicio, Nombre_servicio, Tarifa} = req.body;
    mysqlConnection.query(
        'INSERT INTO tipo_servicio (Nombre_servicio, Tarifa) VALUES (?, ?)',
        [ID_servicio, Nombre_servicio, Tarifa],
        (err) => {
            if (err) {
                console.error('Error al agregar el servicio', err);
                res.status(500).json({ error: 'No se pudo agregar el servicio', detalle: err });
            } else {
                res.json({ mensaje: 'Servicio agregado', ID_servicio: ID_servicio });
            }
        }
    );
});

router.put('/Servicios', (req, res) => {
    const { ID_servicio } = req.params;
    const {Nombre_servicio, Tarifa } = req.body;
    mysqlConnection.query(
        'UPDATE tipo_servicio SET Nombre_servicio=?, Tarifa=? WHERE Matricula=?',
        [Nombre_servicio, Tarifa, ID_servicio],
        (err) => {
            if (err) {
                console.error('Error al actualizar el servicio', err);
                res.status(500).json({ error: 'No se pudo actualizar el servicio', detalle: err });
            } else {
                res.json({ mensaje: 'Servicio actualizado' });
            }
        }
    );
});

router.delete('/:ID_servicio', (req, res) => {
    const { ID_servicio } = req.params;
    mysqlConnection.query(
        'DELETE FROM tipo_servicio WHERE ID_servicio=?',
        [ID_servicio],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar el servicio', err);
                res.status(500).json({ error: 'No se pudo eliminar el servicio', detalle: err });
            } else {
                res.json({ mensaje: 'Servicio eliminado' });
            }
        }
    );
});

module.exports = router;