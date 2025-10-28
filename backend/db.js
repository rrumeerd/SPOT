const mysql = require('mysql');

// Usar un pool para evitar errores tipo PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR
const pool = mysql.createPool({
    host: 'b1hukuz0kz2dwd5s0iiv-mysql.services.clever-cloud.com',
    user: 'ui1kb6yusr15p6xe',
    database: 'b1hukuz0kz2dwd5s0iiv',
    password: 'sFxhFXXCdKEcbmB5TPrc',
    multipleStatements: true,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0,
});

// Verificar una conexión inicial y liberar
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar al pool de MySQL:', err);
        return;
    }
    console.log('Pool de MySQL inicializado correctamente.');
    connection.release();
});

module.exports = pool;