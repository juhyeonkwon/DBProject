/*
* 환자의 정보를 추가하는 코드
*/

const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');

const dbconfig = require('../database/dbconfig.js');

oracledb.autoCommit = true;


router.post('/', async function(req, res, next) {


    //동기를 위하여 await를 사용한 connection 부분입니다..
    connection = await oracledb.getConnection(dbconfig);
    sql = 'SELECT SEQ_PATIENT.NEXTVAL FROM dual';
    binds = {};
    result_seq = await connection.execute(sql, binds);-
    console.log(result_seq);
    connection.release;
    let seq_num = parseInt(result_seq.rows[0]);
    console.log(seq_num);
    //seq의 값을 불러오는것 끝..



    //INSERT 쿼리 실행..
    oracledb.getConnection(dbconfig, async function(err, connection) {
        if(err) {
            console.error(err.message);
            res.send(err.message);
            return;
        } 


        let query = "INSERT INTO PATIENT VALUES (:p_id, :p_name, :regist_num, :call_num, :address, :gender, :height, :weight, :blood_type)";

        let bindData = [
            seq_num,
            req.body.name,
            req.body.regist_num,
            req.body.call_num,
            req.body.address,
            req.body.gender,
            Number(req.body.height),
            Number(req.body.weight),
            req.body.blood_type
        ];


        connection.execute(query, bindData, function(err, result) {
                if(err) {
                    console.error(err.message);
                    res.send(err.message);
                    return;
                }

                console.log(result)
                connection.release;
                res.send('success');
            });     
            
            
    });                    
});

module.exports = router;

