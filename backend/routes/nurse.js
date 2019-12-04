const express = require('express');
let router = express.Router();

const dbConfig = require('../database/dbconfig');
let oracledb = require('oracledb');

//간호사 리스트 제공
//SELECT n.NURSE_ID, d.DEPT_NAME, n.RANK, n.NUR_NAME, n.REGIST_NUM, n.ADDRESS, n.EMAIL FROM NURSE n INNER JOIN department d on n.DEPT_ID = d.DEPT_ID order by n.dept_id asc 
router.post('/list', async function(req, res, next) {
    let connection = await oracledb.getConnection(dbConfig);

    let query = 'SELECT n.NURSE_ID, d.DEPT_NAME, n.RANK, n.NUR_NAME, n.REGIST_NUM, n.ADDRESS, n.EMAIL FROM NURSE n INNER JOIN department d on n.DEPT_ID = d.DEPT_ID order by n.dept_id asc';

    let binds = [];

    result = await connection.execute(query, binds);

    console.log('간호사 리스트 조회');

    res.send(result.rows);

});

//간호사 정보 수정
//UPDATE NURSE SET DEPT_ID = :DEPT_ID, RANK :RANK, ADDRESS = :ADDRESS, EMAIL = :EMAIL where NURESE_ID = :NURSE_ID
router.post('/change', async function(req, res, next) {
    let connection = await oracledb.getConnection(dbConfig);

    let query = 'UPDATE NURSE SET DEPT_ID = :dept_id, RANK = :rank, ADDRESS = :address, EMAIL = :email where NURSE_ID = :nurse_id';

    let binds = [
        Number(req.body.dept_id),
        req.body.rank,
        req.body.address,
        req.body.email,
        Number(req.body.nurse_id)
    ];

    connection.execute(query, binds, function(err, result) {
        if(err) {
            console.error(err.message);
            res.send(err.message);
            connection.release;
            return;
        }

        console.log('간호사 정보수정 : ' + req.body.dept_id);

        res.send('success');   
     });


});

//간호사 추가
//INSERT INTO NURSE VALUES (SEQ_NURSE.NEXTVAL, :DEPT_ID, :RANK, :NUR_NAME, :REGIST_NUM, :ADDRESS, :EMAIL);
router.post('/add', async function(req, res, next) {
    let connection = await oracledb.getConnection(dbConfig);

    let query = 'INSERT INTO NURSE VALUES (SEQ_NURSE.NEXTVAL, :DEPT_ID, :RANK, :NUR_NAME, :REGIST_NUM, :ADDRESS, :EMAIL)';

    let binds = [
        Number(req.body.dept_id),
        req.body.rank,
        req.body.nur_name,
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

        console.log('간호사 추가 : ' + req.body.dept_id);

        res.send('success');   
     });


});


//간호기록조회
//SELECT p.p_name, n.nur_name, nt.datetime, nt.note  FROM NURSING_NOTE nt INNER JOIN patient p on p.patient_id = nt.patient_id INNER JOIN nurse n on n.nurse_id = nt.nurse_id WHERE p.patient_id = :patient_id
router.post('/viewnote', async function(req, res, next) {
    let connection = await oracledb.getConnection(dbConfig);

    let query = 'SELECT p.p_name, n.nur_name, nt.datetime, nt.note FROM NURSING_NOTE nt INNER JOIN patient p on p.patient_id = nt.patient_id INNER JOIN nurse n on n.nurse_id = nt.nurse_id WHERE p.patient_id = :patient_id order by nt.datetime desc'

    let binds = [        
        Number(req.body.patient_id),
    ];

    connection.execute(query, binds, function(err, result) {
        if(err) {
            console.error(err.message);
            res.send(err.message);
            connection.release;
            return;
        }

        console.log('간호기록 조회 환자번호, 이름 : ' + req.body.patient_id + ' , ' + result.rows[0]);

        res.send(result.rows);

        connection.release;

    })
});


//간호기록 작성
router.post('/writenote', async function(req, res, next) {

    let connection = await oracledb.getConnection(dbConfig);

    let query = 'INSERT INTO NURSING_NOTE values (:patient_id, :nurese_id, :note, :datetime)'

    let datetime = new Date();
    datetime.setHours((datetime.getHours() + 9));


    let binds = [        
        Number(req.body.patient_id),
        Number(req.body.nurse_id),
        req.body.note,
        datetime,  
    ];

    connection.execute(query, binds, function(err, result) {
        if(err) {
            console.error(err.message);
            res.send(err.message);
            connection.release;
            return;
        }

        console.log(result);

        res.send('success');

        connection.release;

    })

});

module.exports = router;