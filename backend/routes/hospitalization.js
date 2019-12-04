const express = require('express');
let router = express.Router();

const dbConfig = require('../database/dbconfig');
let oracledb = require('oracledb');



//INSERT INTO hospitalization values (seq_hospital.nextval, :datetime, '' , :patient_id, :chart_id, nurse_id, sick_room_id);
router.post('/', async function(req, res, next) {

    let connection = await oracledb.getConnection(dbConfig);

    let query = 'INSERT INTO hospitalization values (SEQ_HOSPITAL.NEXTVAL, :datetime, NULL, :patient_id, :chart_id, :nurse_id, :sick_room_id, 0 )'

    let datetime = new Date();


    let binds = [
        datetime,
        Number(req.body.patient_id),
        Number(req.body.chart_id),
        Number(req.body.nurse_id),
        Number(req.body.sick_room_id),        
    ];

    connection.execute(query, binds, function(err, result) {
        if(err) {
            console.error(err.message);
            res.send(err.message);
            connection.release;
            return;
        }

        console.log('입원등록 환자번호: ' + req.body.patient_id + ',' + result);

        res.send('success');

        connection.release;

    })

});


//get sickroom List
//SELECT s.sick_room_id from sick_room s, department dp where s.dept_id = dp.dept_id and dp.dept_name = :dept_name;
router.post('/sickroom', async function(req, res, next) {

    let connection = await oracledb.getConnection(dbConfig);

    let query = 'SELECT s.sick_room_id from sick_room s, department dp where s.dept_id = dp.dept_id and dp.dept_name = :dept_name'


    let binds = [
        req.body.dept_name
    ];

    connection.execute(query, binds, function(err, result) {
        if(err) {
            console.error(err.message);
            res.send(err.message);
            connection.release;
            return;
        }

        console.log('병실 조회 : ' + result.rows);

        res.send(result.rows);

        connection.release;

    })
});


//view hospitalization
/*SELECT h.hospitalization_id, h.datetime, p.p_name, h.chart_id, n.nur_name, h.sick_room_id from hospitalization h 
                                                                INNER JOIN patient p on p.patient_id = h.patient_id
                                                                INNER JOIN nurse n on n.nurse_id = h.nurse_id
                                                                where h.hospitalization_id = :hospitalization_id;
                                                                */
router.post('/view', async function(req, res, next) {

    let connection = await oracledb.getConnection(dbConfig);

    let query = 'SELECT h.hospitalization_id, h.datetime, p.patient_id, p.p_name, h.chart_id, n.nurse_id, n.nur_name, h.sick_room_id from hospitalization h INNER JOIN patient p on p.patient_id = h.patient_id INNER JOIN nurse n on n.nurse_id = h.nurse_id where h.sick_room_id = :sick_room_id and ISDISCHARGE = \'0\'';


    let binds = [
        Number(req.body.sick_room_id)
    ];

    let result = await connection.execute(query, binds);

    console.log('입원환자 리스트 확인 ' + result.rows);
    res.send(result.rows)

    connection.release;
});

//update hospitalization set isdischarge = '1' where hosptalization_id = :hosptalization_id 
router.post('/discharge', async function(req, res, next) {
    let connection = await oracledb.getConnection(dbConfig);

    
    console.log('퇴원');
    let query = 'update hospitalization set isdischarge = \'1\' , DISCHARGE_DATE = sysdate where HOSPITALIZATION_ID = :hosptalization_id'

    let binds = [
        Number(req.body.hosptalization_id)
    ];

    let result = await connection.execute(query, binds);

    console.log('퇴원처리 id : ' + req.body.hosptalization_id + ',' + result);
    res.send('success');

    connection.release;

});

//UPDATE HOSPITALIZATION set NURSE_ID = :nurse_id where hospitalization_id = :hospitalization_id 담당 간호사 변경
router.post('/changenurse', async function(req, res, next) {
    let connection = await oracledb.getConnection(dbConfig);

    let query = 'UPDATE HOSPITALIZATION set NURSE_ID = :nurse_id where hospitalization_id = :hospitalization_id'

    let binds = [
        Number(req.body.nurse_id),
        Number(req.body.hosptalization_id)
    ];

    let result = await connection.execute(query, binds);

    console.log('간호사 변경 id : ' + req.body.nurse_id + ',' + result);
    res.send('success');

    connection.release;
} )

module.exports = router;