var express = require('express');
var router = express.Router();
const dbconfig = require('../../database/dbconfig.js');

let oracleDB = require('oracledb');

oracleDB.autoCommit = true;


router.get('/', async function(req, res, next) {
  

  connection = await oracleDB.getConnection(dbconfig);

  sql = 'SELECT SEQ_RESERV.N FROM DUAL';


  binds = {};

  result = await connection.execute(sql, binds);

  let seq = Number(result.rows[0]) + 1;
  let sendseq = seq.toString();

  console.log(seq);
  console.log(result.rows[0]);

  res.send( '[ ' + sendseq + ' ]');
  connection.release;


});


module.exports = router;
