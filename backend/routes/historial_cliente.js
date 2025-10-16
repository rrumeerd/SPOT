const {Router} = require('express');
const router = Router();
const mysqlConnection = require('../db');

router.get('/todos-los-historiales', (req, res) =>{
    mysqlConnection.query(`SELECT * FROM historial_cliente`, (err, rows, fields) => {
        if (err) {
            res.status(500).json({error: 'Hubo un error al mostrar los historiales'});
        }else {
            res.json(rows);
        }
    });
});

router.get('/:ID_historial_Cliente', (req, res) =>{
    const {ID_historial_Cliente} = req.params;
    mysqlConnection.query(`SELECT * FROM historial_cliente WHERE ID_historial_Cliente=?`, [ID_historial_Cliente], (err, rows, fields) => {
        if (err) {
            console.error('Error en la consulta', err);
            res.status(500).json({error: 'Hubo un error al mostrar el historial', detalle:err});
        }else {
            res.json(rows);
        }
    });
});

router.get('/usuario/:ID_usuario', (req, res) =>{
    const {ID_usuario} = req.params;
    mysqlConnection.query(`
        SELECT 
            hc.*,
            v.Modelo as Vehiculo_Modelo,
            v.Matricula as Vehiculo_Matricula,
            v.Tipo_vehiculo as Vehiculo_Tipo,
            n.Nombre as Negocio_Nombre,
            n.Tipo_negocio as Negocio_Tipo,
            ts.Nombre_servicio as Servicio_Nombre,
            ts.Tarifa as Servicio_Tarifa
        FROM historial_cliente hc
        LEFT JOIN vehiculo v ON hc.ID_vehiculo = v.ID_vehiculo
        LEFT JOIN negocio n ON hc.ID_negocio = n.ID_negocio
        LEFT JOIN tipo_servicio ts ON hc.ID_servicio = ts.ID_servicio
        WHERE hc.ID_usuario = ? 
        ORDER BY hc.Hora_entrada DESC
    `, [ID_usuario], (err, rows, fields) => {
        if (err) {
            console.error('Error en la consulta', err);
            res.status(500).json({error: 'Hubo un error al mostrar el historial del usuario', detalle:err});
        }else {
            res.json(rows);
        }
    });
});

router.post('/', (req, res) => {
    const { ID_historial_Cliente, ID_negocio, Hora_entrada, Hora_salida} = req.body;
    mysqlConnection.query(
        'INSERT INTO usuario (ID_negocio, Hora_entrada, Hora_salida) VALUES (?, ?, ?)',
        [ID_historial_Cliente, ID_negocio, Hora_entrada, Hora_salida],
        (err) => {
            if (err) {
                console.error('Error al agregar el registro', err);
                res.status(500).json({ error: 'No se pudo agregar el registro', detalle: err });
            } else {
                res.json({ mensaje: 'Registro agregado', ID_historial_Cliente: ID_historial_Cliente });
            }
        }
    );
});

router.delete('/:ID_historial_Cliente', (req, res) => {
    const { ID_historial_Cliente } = req.params;
    mysqlConnection.query(
        'DELETE FROM historial_cliente WHERE ID_historial_Cliente=?',
        [ID_historial_Cliente],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar registro', err);
                res.status(500).json({ error: 'No se pudo eliminar el registro', detalle: err });
            } else {
                res.json({ mensaje: 'Registro eliminado' });
            }
        }
    );
});

module.exports = router;