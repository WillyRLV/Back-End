const mysql = require('mysql')

const mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'db_colegio'

});

mysqlConnection.connect(function(e){
    if (e) {
        console.error(e)
    } else {
        console.log('conectado a la base de datos')
    }
});

module.exports = mysqlConnection;