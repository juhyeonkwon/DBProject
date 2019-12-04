const express = require('express');
let router = express.Router();

const dbConfig = require('../database/dbconfig');
let oracledb = require('oracledb');

oracledb.autoCommit = true;

router.post('/', async function(req, res, next) {

    let connection = await oracledb.getConnection(dbConfig);

    let query = "INSERT INTO CHARTS VALUES (SEQ_CHARTS.NEXTVAL, :DOCTOR_ID, :PATIENT_ID, :DISEASE_CODE, :PRESCRIPTION, :DIAGNOSIS, :DATETIME)"

    let date = new Date(req.body.datetime);
    console.log(date);

    let binds = [
        Number(req.body.doctor_id),
        Number(req.body.patient_id),
        req.body.disease_code,
        req.body.prescription,
        req.body.diagnosis,
        date
    ]

    connection.execute(query, binds, function(err, result){
        if(err) {
            console.error(err.message);
            res.send(err.message);
            return;
        }

        console.log(result);
        res.send('success');

        connection.release;
    });

});


//차트번호, 환자번호, 이름, 날짜 질병코드리스트를 보여줌 환자 이름, 생년월일 검색시...
router.post('/summary', async function(req, res, next) {

    let connection = await oracledb.getConnection(dbConfig);

    let query = 'SELECT c.chart_id, p.patient_id, p.p_name, c.datetime, c.disease_code from charts c, patient p where c.patient_id = p.patient_id and p.p_name = :p_name and p.regist_num like :regist_num'

    let binds = [
        req.body.p_name,
        (req.body.regist_num + '%')
    ];

    connection.execute(query, binds, function(err, result) {
        if(err) {
            console.error(err.message);
            res.send('error');
            return;
        }
        console.log(result);

        res.send(result.rows);

        connection.release;

    })

});

//차트의 세부사항을 보여줌..
router.post('/detail', async function(req, res, next) {
    
    let connection = await oracledb.getConnection(dbConfig);

    let query = "SELECT c.chart_id, c.datetime, d.doc_name, p.p_name, c.disease_code, c.diagnosis, c.prescription  from charts c inner join doctor d on c.doctor_id = d.doctor_id inner join patient p on c.patient_id = p.patient_id where c.chart_id = :chart_id";

    let binds = [
        Number(req.body.chart_id)
    ]

    connection.execute(query, binds, function(err, result) {
        if(err) {
            console.error(err.message);
            res.send('error');
            return;
        }
        console.log(result);

        res.send(result.rows);

        connection.release;
    })

});



module.exports = router;