const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'workshop_grupal'
});

mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
        return;
    }
    else{
        console.log('La base se encuetra conectada');
    }
});

module.exports = mysqlConnection;