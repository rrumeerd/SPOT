const {Router} = require('express');
const router = Router();
const mysqlConnection = require('../db');

router.get('/:ID_vehiculo', (req, res) =>{
    const {ID_vehiculo} = req.params;
    mysqlConnection.query(`SELECT * FROM vehiculo WHERE ID_vehiculo=?`, [ID_vehiculo], (err, rows, fields) => {
        if (err) {
            console.error('Error en la consulta', err);
            res.status(500).json({error: 'Hubo un error al mostrar el vehiculo', detalle:err});
        }else {
            res.json(rows);
        }
    });
});

router.post('/', (req, res) => {
    const { ID_usuario, Matricula, Modelo, Tipo_vehiculo, Historial_cliente} = req.body;
    mysqlConnection.query(
        'INSERT INTO vehiculo (ID_usuario, Matricula, Modelo, Tipo_vehiculo, Historial_cliente) VALUES (?, ?, ?, ?, ?)',
        [ID_usuario, Matricula, Modelo, Tipo_vehiculo, Historial_cliente],
        (err) => {
            if (err) {
                console.error('Error al agregar vehiculo', err);
                res.status(500).json({ error: 'No se pudo agregar el vehiculo', detalle: err });
            } else {
                res.json({ mensaje: 'Usuario agregado', Matricula: Matricula });
            }
        }
    );
});

router.put('/Matricula', (req, res) => {
    const { Matricula } = req.params;
    const {Modelo, Tipo_vehiculo, Historial_cliente } = req.body;
    mysqlConnection.query(
        'UPDATE vehiculo SET Tipo_identificacion=?, Nombre=?, Contraseña=?, Tipo_usuario=?, Correo=?, Telefono=? WHERE Matricula=?',
        [Modelo, Tipo_vehiculo, Historial_cliente, Matricula],
        (err) => {
            if (err) {
                console.error('Error al actualizar vehiculo', err);
                res.status(500).json({ error: 'No se pudo actualizar el vehiculo', detalle: err });
            } else {
                res.json({ mensaje: 'Vehiculo actualizado' });
            }
        }
    );
});

router.delete('/:Matricula', (req, res) => {
    const { Matricula } = req.params;
    mysqlConnection.query(
        'DELETE FROM vehiculo WHERE Matricula=?',
        [Matricula],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar vehiculo', err);
                res.status(500).json({ error: 'No se pudo eliminar el vehiculo', detalle: err });
            } else {
                res.json({ mensaje: 'Vehiculo eliminado' });
            }
        }
    );
});

module.exports = router;