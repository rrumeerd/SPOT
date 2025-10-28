const {Router} = require('express');
const router = Router();
const mysqlConnection = require('../db');

router.get('/:id', (req, res) =>{
    const {id} = req.params;
    mysqlConnection.query(`SELECT * FROM vehiculo WHERE id=?`, [id], (err, rows, fields) => {
        if (err) {
            console.error('Error en la consulta', err);
            res.status(500).json({error: 'Hubo un error al mostrar el vehiculo', detalle:err});
        }else {
            res.json(rows);
        }
    });
});

router.get('/user/:ID_user', (req, res) =>{
    const {ID_user} = req.params;
    mysqlConnection.query(`SELECT * FROM vehiculo WHERE ID_usuario=?`, [ID_user], (err, rows, fields) => {
        if (err) {
            console.error('Error en la consulta', err);
            res.status(500).json({error: 'Hubo un error al mostrar el vehiculo', detalle:err});
        }else {
            res.json(rows);
        }
    });
});

router.post('/', (req, res) => {
    const { ID_usuario, Matricula, Modelo, Tipo_vehiculo, year, alias, marca} = req.body;
    mysqlConnection.query(
        'INSERT INTO vehiculo (ID_usuario, Matricula, Modelo, Tipo_vehiculo, year, alias) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [ID_usuario, Matricula, Modelo, Tipo_vehiculo, year, alias, marca],
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

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {Matricula, Modelo, Tipo_vehiculo, year, alias, marca} = req.body;
    mysqlConnection.query(
        'UPDATE vehiculo SET Modelo=?, Tipo_vehiculo=?, year=?, alias=?, marca=?, Matricula=? WHERE id=?',
        [Modelo, Tipo_vehiculo, year, id],
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

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query(
        'DELETE FROM vehiculo WHERE id=?',
        [id],
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