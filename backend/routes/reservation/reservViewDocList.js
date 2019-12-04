/*
* 예약확인단계에서 의사들의 리스트를 보여주기 위한 라우터입니다.. 악 짜증나!!
*/

const express = require('express');
let router = express.Router();

const dbconfig = require('../../database/dbconfig.js');
let oracledb = require('oracledb');
oracledb.autoCommit = true;


router.post('/', async function(req, res, next){

    let connection = await oracledb.getConnection(dbconfig);

    let query = "SELECT D.doc_name from doctor d, department dp where d.dept_id = dp.dept_id and dp.dept_name = :dept_name";

    let bindData = [req.body.dept_name];

    let results = await connection.execute(query, bindData);

    res.send(results.rows);

    connection.release;

});

module.exports = router;
