const express = require('express');
let router = express.Router();
const dbconfig = require('../../database/dbconfig.js');
let oracledb = require('oracledb');

oracledb.autoCommit = true;

router.post('/', async function(req, res, next) {
   
   
   
    let connection = await oracledb.getConnection(dbconfig);

    let bindData = [
        req.body.doc_name,
        req.body.dept_name
    ]

    console.log(bindData);

    // WHERE D.DOC_NAME = :doc_name AND DP.DEPT_NAME = :dept_name
    
    //SELECT
    let query = "SELECT R.RESERVATION_ID, D.DOC_NAME, P.P_NAME, DP.DEPT_NAME, R.RESERVATION_DATETIME FROM RESERVATION R INNER JOIN DOCTOR D ON R.doctor_id = D.doctor_id  INNER JOIN PATIENT P ON R.PATIENT_ID = P.PATIENT_ID INNER JOIN department DP ON R.DEPT_ID = DP.DEPT_ID WHERE D.DOC_NAME = :doc_name AND DP.DEPT_NAME = :dept_name AND R.RESERVATION_DATETIME > SYSDATE"

    connection.execute(query, bindData, function(err, result) {
        if(err) {
            console.error(err.message);
            res.send(err.message);
            return;
        }

        console.log(result);
              

        connection.release;
        res.send(result.rows);
    })

});


module.exports = router;