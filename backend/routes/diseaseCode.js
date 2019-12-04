const express = require('express');
let router = express.Router();

const oracledb = require('oracledb');
const dbConfig = require('../database/dbconfig');


oracledb.autoCommit = true;

router.post('/', async function(req, res, next) {
    
    let connection = await oracledb.getConnection(dbConfig);

    let query = 'SELECT DISEASE_CODE FROM DISEASE';

    let result = await connection.execute(query, []);

    res.send(result.rows);

    connection.release;

});

module.exports = router;