var express = require('express');
var router = express.Router();
const dbconfig = require('../../database/dbconfig.js');

let oracledb = require('oracledb');

oracledb.autoCommit = true;


router.post('/', async function(req, res, next) {

    //INSERT 쿼리 실행..
    oracledb.getConnection(dbconfig, async function(err, connection) {
      if(err) {
          console.error(err.message);
          res.send(err.message);
          return;
      } 


      /* 시간 설정을 합니다ㅏㅏㅏㅏㅏㅏㅏㅏ */
      let date1 = req.body.date;
      let time1 = req.body.time;

      let year = Number(date1.substring(0,4));
      let month = Number(date1.substring(5,7)) - 1;
      let day = Number(date1.substring(8,10));
      let hour = Number(time1.substring(0,2)) + 9;
      let min = Number(time1.substring(3,5));
      //시간 설정 끝....



      //동기를 위하여 await를 사용한 connection 부분입니다..
      connection = await oracledb.getConnection(dbconfig);
      sql = 'SELECT SEQ_RESERV.NEXTVAL FROM dual';
      binds = {};
      result_seq = await connection.execute(sql, binds);
      console.log(result_seq);
      connection.release;
      let seq_num = parseInt(result_seq.rows[0]);
      console.log(seq_num);
      //seq의 값을 불러오는것 끝..
      
      
      //새로운 쿼리를 실행합니다ㅏㅏㅏㅏㅏ
      let query = "INSERT INTO reservation VALUES (:reserv_id, :doctor_id, :patient_id, :dept_id, :datetime)";

      let dateti = new Date(year, month, day, hour, min);

      let bindData = [
          seq_num,
          Number(req.body.doctor_id),
          Number(req.body.patient_id),
          Number(req.body.dept_id),
          dateti      
      ];

      console.log(bindData);


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
