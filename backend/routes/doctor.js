const express = require('express');
let router = express.Router();

const dbConfig = require('../database/dbconfig');
let oracledb = require('oracledb');

//의사 리스트 제공
//SELECT d.doctor_ID, dp.DEPT_NAME, d.major,d.RANK, d.DOC_NAME, d.REGIST_NUM, d.ADDRESS, d.EMAIL FROM DOCTOR d INNER JOIN department dp on d.DEPT_ID = dp.DEPT_ID order by d.doctor_id, d.dept_id asc 
router.post('/list', async function(req, res, next) {
    let connection = await oracledb.getConnection(dbConfig);

    let query = 'SELECT d.doctor_ID, dp.DEPT_NAME, d.major,d.RANK, d.DOC_NAME, d.REGIST_NUM, d.ADDRESS, d.EMAIL FROM DOCTOR d INNER JOIN department dp on d.DEPT_ID = dp.DEPT_ID order by d.doctor_id, d.dept_id asc ';

    let binds = [];

    result = await connection.execute(query, binds);

    console.log('의사 리스트 조회');

    res.send(result.rows);

});

//의사 정보 수정
//UPDATE DOCTOR set dept_id = :dept_id, major=:major, rank=:rank, address=:address, email=:email where doctor_id = :doctor_id
router.post('/change', async function(req, res, next) {
    let connection = await oracledb.getConnection(dbConfig);

    let query = 'UPDATE DOCTOR set dept_id = :dept_id, major=:major, rank=:rank, address=:address, email=:email where doctor_id = :doctor_id';

    let binds = [
        Number(req.body.dept_id),
        req.body.major,
        req.body.rank,
        req.body.address,
        req.body.email,
        Number(req.body.doctor_id)
    ];

    connection.execute(query, binds, function(err, result) {
        if(err) {
            console.error(err.message);
            res.send(err.message);
            connection.release;
            return;
        }

        console.log('의사 정보수정 : ' + req.body.dept_id);

        res.send('success');   
     });


});

//의사 추가
//INSERT INTO DOCTOR VALUES (SEQ.DOCTOR.NEXTVAL, :DEPT_ID, :MAJOR, :RANK, :DOC_NAME, :REGIST_NUM, :ADDRESS, EMAIL);
router.post('/add', async function(req, res, next) {
    let connection = await oracledb.getConnection(dbConfig);

    let query = 'INSERT INTO DOCTOR VALUES (SEQ_DOCTOR.NEXTVAL, :DEPT_ID, :MAJOR, :RANK, :DOC_NAME, :REGIST_NUM, :ADDRESS, :EMAIL)';

    let binds = [
        Number(req.body.dept_id),
        req.body.major,
        req.body.rank,
        req.body.doc_name,
        req.body.regist_num,
        req.body.address,
        req.body.email,
    ];

    connection.execute(query, binds, function(err, result) {
        if(err) {
            console.error(err.message);
            res.send(err.message);
            connection.release;
            return;
        }

        console.log('의사 추가 : ' + req.body.dept_id);

        res.send('success');   
     });

});


module.exports = router;