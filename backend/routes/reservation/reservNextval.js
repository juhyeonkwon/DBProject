var express = require('express');
var router = express.Router();
const dbconfig = require('../../database/dbconfig.js');

let oracleDB = require('oracledb');

oracleDB.autoCommit = true;



router.get('/', async function(req, res, next) {
    connection = await oracleDB.getConnection(dbconfig);
  
    sql = ' SELECT SEQ_RESERV.NEXTVAL FROM DUAL';
  
  
    binds = {};
  
    result = await connection.execute(sql, binds);
  
    console.log(result.rows[0]);
    res.send('seq is increased');
  
    connection.release;

  });
  
  module.exports = router;