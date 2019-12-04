var express = require('express');
var router = express.Router();
const dbconfig = require('../database/dbconfig.js');

let oracleDB = require('oracledb');

oracleDB.autoCommit = true;


router.post('/', async function(req, res, next) {
  
  /*oracleDB.getConnection(dbconfig, function(err, connection) {
    if(err) {
      console.error(err.message);
      return;
    }
    connection.execute(
        "select * from study_db", [], function(err, result) {
          if(err) {
            console.error(err.message);
            connection.release;
            return;
          }


          console.log(result.rows.length);
          connection.release;

          res.send(result.rows);
     })
  });*/

/*
  connection = await oracleDB.getConnection(dbconfig);

  sql = 'SELECT * FROM DOCTOR';

  binds = {};

  result = await connection.execute(sql, binds);

  console.log(result.rows);
  res.send(result.rows);

*/
  let date = req.body.date;
  let time = req.body.time;

  console.log(date, time);

});


module.exports = router;
