var mysql = require('mysql');
// Configuracion de la base de datos en MySQL
var pool = mysql.createPool({
    host: 'localhost', 
    user: 'root',
    password: 'DreamOperator',
    database: 'tpathos'
})
/*
var pool = mysql.createPool({
    host: 'localhost', 
    user: 'pathwjzs_allegue',
    password: 'sHGEZ5[Yb8=b',
    database: 'pathwjzs_tpathos'
})*/
module.exports.pool = pool; // Objeto que quiero exportar o hacer publico fuera de este archivo