const express = require('express');
let router = express.Router();


const oracledb = require('oracledb');
const dbconfig = require('../database/dbconfig.js');

oracledb.autoCommit = true;

//SELECT OPERATING_ROOM_ID, doctor_NAME, patient_id, time FROM OPERATING_ROOM
router.post('/', async function(req, res, next) {
    let connection = await oracledb.getConnection(dbconfig);

    let query = 'SELECT OPERATING_ROOM_ID, doctor_name, patient_name, datetime FROM OPERATING_ROOM'

    let binds = [];

    let result = await connection.execute(query, binds)

    console.log('오퍼..레이팅..룸...제공...');

    res.send(result.rows);

    connection.release;

    
});

//UPDATE OPERATING_ROOM set DOCTOR_ID = NULL, PATIENT_ID= NULL, TIME = NULL where operating_room_id = :operating_room_id
router.post('/clearoper', async function(req, res, next) {

    let connection = await oracledb.getConnection(dbconfig);


    let query = 'UPDATE OPERATING_ROOM set DOCTOR_NAME = NULL, PATIENT_NAME= NULL, DATETIME = NULL where operating_room_id = :operating_room_id'

    let binds = [
        Number(req.body.operating_room_id)
    ];

    connection.execute(query, binds, function(err, result) {
        if(err) {
            console.error(err.message);
            res.send(err.message);
            connection.release;
            return;
        }
        
        console.log('오퍼..레이팅..룸...클리..어.....');

        res.send('success');

        connection.release;

    });

    
});

//UPDATE OPERATING_ROOM set DOCTOR_ID = :doctor_id, PATIENT_ID= :patient_id, TIME = :datetime where operating_room_id = :operating_room_id
router.post('/setoper', async function(req, res, next) {

    let connection = await oracledb.getConnection(dbconfig);


    let query = 'UPDATE OPERATING_ROOM set DOCTOR_NAME = :doctor_name, PATIENT_NAME= :patient_name, DATETIME = :datetime where operating_room_id = :operating_room_id'


    let binds = [
        req.body.doctor_name,
        req.body.patient_name,
        req.body.datetime,
        Number(req.body.operating_room_id),
    ];

    connection.execute(query, binds, function(err, result) {
        if(err) {
            console.error(err.message);
            res.send(err.message);
            connection.release;
            return;
        }
        
        console.log('오퍼..레이팅..룸 셋..');

        res.send('success');

        connection.release;

    });

    
});


module.exports = router;