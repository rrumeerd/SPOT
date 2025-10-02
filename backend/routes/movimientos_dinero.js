const {Router} = require('express');
const router = Router();
const mysqlConnection = require('../db');

router.get('/todos-los-movimientos', (req, res) =>{
    mysqlConnection.query(`SELECT * FROM movimientos_dinero`, (err, rows, fields) => {
        if (err) {
            res.status(500).json({error: 'Hubo un error al mostrar los movimientos'});
        }else {
            res.json(rows);
        }
    });
});

router.get('/:movimientos', (req, res) =>{
    const {ID_movimiento} = req.params;
    mysqlConnection.query(`SELECT * FROM movimientos_dinero WHERE ID_movimiento=?`, [ID_movimiento], (err, rows, fields) => {
        if (err) {
            console.error('Error en la consulta', err);
            res.status(500).json({error: 'Hubo un error al mostrar el movimiento', detalle:err});
        }else {
            res.json(rows);
        }
    });
});

router.post('/', (req, res) => {
    const { ID_movimiento, ID_usuario_origen, ID_usuario_destino, Monto, Fecha, Notas} = req.body;
    mysqlConnection.query(
        'INSERT INTO usuario ( ID_usuario_origen, ID_usuario_destino, Monto, Fecha, Notas) VALUES (?, ?, ?, ?, ?)',
        [ID_movimiento, ID_usuario_origen, ID_usuario_destino, Monto, Fecha, Notas],
        (err) => {
            if (err) {
                console.error('Error al guardar movimiento', err);
                res.status(500).json({ error: 'No se pudo guardar el movimiento', detalle: err });
            } else {
                res.json({ mensaje: 'Movimiento agregado', ID_usuario: ID_usuario });
            }
        }
    );
});

router.delete('/:ID_movimiento', (req, res) => {
    const { ID_movimiento } = req.params;
    mysqlConnection.query(
        'DELETE FROM movimientos_dinero WHERE ID_movimiento=?',
        [ID_movimiento],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar movimiento', err);
                res.status(500).json({ error: 'No se pudo eliminar el movimiento', detalle: err });
            } else {
                res.json({ mensaje: 'Movimiento eliminado' });
            }
        }
    );
});

module.exports = router;