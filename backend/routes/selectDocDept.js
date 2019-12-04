//SELECT D.DOCTOR_ID, D.DOC_NAME, DP.DEPT_NAME FROM DOCTOR D, DEPARTMENT DP WHERE d.dept_id = dp.dept_id WHERE DP.DEPT_NAME;

const express = require('express');
let router = express.Router();


const oracledb = require('oracledb');
const dbconfig = require('../database/dbconfig.js');

oracledb.autoCommit = true;

router.post('/', async function(req, res, next) {

    let connection = await oracledb.getConnection(dbconfig);

    let query = 'SELECT D.DOCTOR_ID, DP.DEPT_ID FROM DOCTOR D, DEPARTMENT DP WHERE d.dept_id = dp.dept_id AND D.DOC_NAME = :DOC_NAME AND DP.DEPT_NAME = :DEPT_NAME';

    let binds = [
        req.body.doc_name,
        req.body.dept_name
    ]

    let results = await connection.execute(query, binds, []);

    console.log(results.rows);
    res.send(results.rows);

});

router.post('/patient', async function(req, res, next) {

    let connection = await oracledb.getConnection(dbconfig);

    let query = 'SELECT patient_id from patient where p_name = :p_name and regist_num like :regist_num'

    let binds = [
        req.body.p_name,
        (req.body.regist_num +'%')
    ]

    let results = await connection.execute(query, binds, []);

    console.log(results.rows);
    res.send(results.rows[0]);

    connection.release;

});

router.post('/nurse', async function(req, res, next) {
    
    console.log(req.body.dept_name);

    let connection = await oracledb.getConnection(dbconfig);

    let query = 'SELECT n.nurse_ID, n.nur_name FROM nurse n, DEPARTMENT DP WHERE n.dept_id = dp.dept_id and DP.dept_name = :dept_name'

    let binds = [
        req.body.dept_name
    ]

    let results = await connection.execute(query, binds, []);

    console.log(results.rows);
    res.send(results.rows);

    connection.release;

});

module.exports = router;
