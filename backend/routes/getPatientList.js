const express = require('express');
let router = express.Router();

const oracledb = require('oracledb');
const dbConfig = require('../database/dbconfig');


oracledb.autoCommit = true;

router.post('/', async function(req, res, next) {
    
    let connection = await oracledb.getConnection(dbConfig);

    let query = 'SELECT * FROM PATIENT order by patient_id asc';

    let result = await connection.execute(query, []);

    res.send(result.rows);

    connection.release;

});

router.post('/detail', async function(req, res, next) {

    let connection = await oracledb.getConnection(dbConfig);

    let query = 'SELECT p.patient_id, p.p_name, d.doc_name,  c.chart_id, c.disease_code, c.datetime FROM charts c INNER JOIN doctor d on c.doctor_id = d.doctor_id INNER JOIN patient p on c.patient_id = p.patient_id WHERE p.patient_id = :patient_id';

    let binds = [
        Number(req.body.patient_id)
    ]

    let result = await connection.execute(query, binds);

    console.log('환자 차트 조회'  + result.rows[0]);

    res.send(result.rows);

    connection.release;

});

//SELECT p.patient_id, p.p_name, h.hospitalization_id, h.datetime, h.discharge_date, h.chart_id from patient p, hospitalization h where p.patient_id = h.patient_id and p.patient_id = :patient_id
//입원경력 확인
router.post('/gethospitalization', async function(req, res, next) {

    let connection = await oracledb.getConnection(dbConfig);

    let query = 'SELECT p.patient_id, p.p_name, h.hospitalization_id, h.datetime, h.discharge_date, h.chart_id from patient p, hospitalization h where p.patient_id = h.patient_id and p.patient_id = :patient_id';

    let binds = [
        Number(req.body.patient_id)
    ]

    let result = await connection.execute(query, binds);

    console.log('환자 입원기록 조회' + result.rows[0]);

    res.send(result.rows);

    connection.release;

});

module.exports = router;