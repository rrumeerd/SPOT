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
    const { Tipo_identificacion, Documento, Nombre, Contrasena, Tipo_usuario, Correo, Telefono} = req.body;
    console.log(req.body)
    mysqlConnection.query(
        'INSERT INTO usuario ( Tipo_identificacion, Documento, Nombre, Contrasena, Tipo_usuario, Correo, Telefono) VALUES (?, ?, ?, ?, ?, ?,?)',
        [ Tipo_identificacion, Documento, Nombre, Contrasena, Tipo_usuario, Correo, Telefono],
        (err,  result) => {
            if (err) {
                console.error('Error al agregar usuario', err);
                res.status(500).json({ error: 'No se pudo agregar el usuario', detalle: err });
            } else {
                res.json({ mensaje: 'Usuario agregado' , userID: result.insertId});
            }
        }
    );
});

router.put('/:ID_usuario', (req, res) => {
    const { ID_usuario } = req.params;
    const { Tipo_identificacion, Nombre, Contrasena, Tipo_usuario, Correo, Telefono } = req.body;
    mysqlConnection.query(
        'UPDATE usuario SET Tipo_identificacion=?, Nombre=?, Contrasena=?, Tipo_usuario=?, Correo=?, Telefono=? WHERE ID_usuario=?',
        [Tipo_identificacion, Nombre, Contrasena, Tipo_usuario, Correo, Telefono, ID_usuario],
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

// Validar login
router.post('/login', (req, res) => {
    const { Correo, Contrasena } = req.body;

    if (!Correo || !Contrasena) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Primero verificar si el correo existe
    mysqlConnection.query(
        'SELECT * FROM usuario WHERE Correo = ?',
        [Correo],
        (err, rows) => {
            if (err) {
                console.error('Error en la consulta', err);
                return res.status(500).json({ error: 'Error en el servidor', detalle: err });
            }

            if (rows.length === 0) {
                // El correo no existe
                return res.status(401).json({ 
                    error: 'correo_no_existe',
                    mensaje: 'Este correo no está alojado en nuestros servidores.'
                });
            }

            // El correo existe, ahora verificar la contrasena
            mysqlConnection.query(
                'SELECT * FROM usuario WHERE Correo = ? AND Contrasena = ?',
                [Correo, Contrasena],
                (err, rows) => {
                    if (err) {
                        console.error('Error en la consulta', err);
                        return res.status(500).json({ error: 'Error en el servidor', detalle: err });
                    }

                    if (rows.length > 0) {
                        // Usuario válido
                        res.json({
                            mensaje: 'Login exitoso',
                            usuario: rows[0]
                        });
                    } else {
                        // Contrasena incorrecta
                        res.status(401).json({ 
                            error: 'contrasena_incorrecta',
                            mensaje: 'Contrasena incorrecta.'
                        });
                    }
                }
            );
        }
    );
});


module.exports = router;