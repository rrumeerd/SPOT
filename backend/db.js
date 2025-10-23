const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    host: 'b1hukuz0kz2dwd5s0iiv-mysql.services.clever-cloud.com',
    user: 'ui1kb6yusr15p6xe',
    database: 'b1hukuz0kz2dwd5s0iiv',
    password: 'sFxhFXXCdKEcbmB5TPrc',
    multipleStatements: true
});

mysqlConnection.connect(function(err){
    if(err){
        console.error(err);
    }else {
        console.log('Base de datos conectada.');
    }
})

module.exports = mysqlConnection;