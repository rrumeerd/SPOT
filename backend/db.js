const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'spot',
});

mysqlConnection.connect(function(err){
    if(err){
        console.error(err);
    }else {
        console.log('Base de datos conectada.');
    }
})

module.exports = mysqlConnection;