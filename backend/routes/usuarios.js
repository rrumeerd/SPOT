const {Router} = require('express');
const router = Router();
const mysqlConnection = require('../db');

router.get('/todos-los-usuarios', (req, res) =>{
    mysqlConnection.query(`SELECT * FROM usuario`, (err, rows, fields) => {
        if (err) {
            res.status(500).json({error: 'Hubo un error al mostrar los usuarios'});
        }else {
            res.json(rows);
        }
    });
});

router.get('/:ID_usuario', (req, res) =>{
    const {ID_usuario} = req.params;
    mysqlConnection.query(`SELECT * FROM usuario WHERE ID_usuario=?`, [ID_usuario], (err, rows, fields) => {
        if (err) {
            console.error('Error en la consulta', err);
            res.status(500).json({error: 'Hubo un error al mostrar el usuario', detalle:err});
        }else {
            res.json(rows);
        }
    });
});

router.post('/', (req, res) => {
    const { ID_usuario, Tipo_identificacion, Nombre, Contraseña, Tipo_usuario, Correo, Telefono} = req.body;
    mysqlConnection.query(
        'INSERT INTO usuario (ID_usuario, Tipo_identificacion, Nombre, Contraseña, Tipo_usuario, Correo, Telefono) VALUES (?, ?, ?, ?, ?, ?,?)',
        [ID_usuario, Tipo_identificacion, Nombre, Contraseña, Tipo_usuario, Correo, Telefono],
        (err) => {
            if (err) {
                console.error('Error al agregar usuario', err);
                res.status(500).json({ error: 'No se pudo agregar el usuario', detalle: err });
            } else {
                res.json({ mensaje: 'Usuario agregado', ID_usuario: ID_usuario });
            }
        }
    );
});

router.put('/:ID_usuario', (req, res) => {
    const { ID_usuario } = req.params;
    const { Tipo_identificacion, Nombre, Contraseña, Tipo_usuario, Correo, Telefono } = req.body;
    mysqlConnection.query(
        'UPDATE usuario SET Tipo_identificacion=?, Nombre=?, Contraseña=?, Tipo_usuario=?, Correo=?, Telefono=? WHERE ID_usuario=?',
        [Tipo_identificacion, Nombre, Contraseña, Tipo_usuario, Correo, Telefono, ID_usuario],
        (err) => {
            if (err) {
                console.error('Error al actualizar usuario', err);
                res.status(500).json({ error: 'No se pudo actualizar el usuario', detalle: err });
            } else {
                res.json({ mensaje: 'Usuario actualizado' });
            }
        }
    );
});

router.delete('/:ID_usuario', (req, res) => {
    const { ID_usuario } = req.params;
    mysqlConnection.query(
        'DELETE FROM usuario WHERE ID_usuario=?',
        [ID_usuario],
        (err, result) => {
            if (err) {
                console.error('Error al eliminar usuario', err);
                res.status(500).json({ error: 'No se pudo eliminar el usuario', detalle: err });
            } else {
                res.json({ mensaje: 'Usuario eliminado' });
            }
        }
    );
});


module.exports = router;