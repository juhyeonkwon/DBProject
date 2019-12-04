let express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const app = express();

let dbdb = require('./routes/dbdb');

//환자 관련 라우팅
let addPatient = require('./routes/addPatient');
let getPatientList = require('./routes/getPatientList');
//환자 끝

//예약 라우팅 정의
let getSeqReserv = require('./routes/reservation/getSeqReserv');
let reservation = require('./routes/reservation/reservation');
let reservNextval = require('./routes/reservation/reservNextval');
let reservView = require('./routes/reservation/reservationView');
let reservViewDocList = require('./routes/reservation/reservViewDocList');
//예약 끝

//의사,부서 모달을 위한 라우팅
let selectDocDept = require('./routes/selectDocDept');

//차트 라우팅
let chart = require('./routes/chart');

//질병코드
let diseaseCode = require('./routes/diseaseCode');

//입원 라우팅
let hospitalization = require('./routes/hospitalization');

//간호쪽 라우팅
let nurse = require('./routes/nurse');

//의사쪽 라우팅
let doctor = require('./routes/doctor')

//수술실 라우팅
let operatingRoom = require('./routes/operatingRoom');

app.listen(3000, () => console.log("hello! this port 3000!"));
app.set('view engine', 'jade');



//cross 도메인 요청을 처리하기 위한것
app.use(function(req, res, next) {
    
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//roueting
app.use('/dbdb', dbdb );

//환자추가 라우팅
app.use('/addPatient', addPatient);
app.use('/getPatientList', getPatientList);

//예약 라우팅
app.use('/reservation', reservation);
app.use('/getSeqReserv', getSeqReserv);
app.use('/reservNextval', reservNextval);
app.use('/reservView', reservView);
app.use('/reservViewDocList', reservViewDocList);

//예약 라우팅 끝

//모달 라우팅
app.use('/selectDocDept', selectDocDept);

//차트 라우팅
app.use('/chart', chart);


//질병코드
app.use('/diseaseCode', diseaseCode);

//입원 라우팅
app.use('/hospitalization', hospitalization);

//간호 라우팅
app.use('/nurse', nurse);

//의사 라우팅
app.use('/doctor', doctor);

//수술실
app.use('/operatingRoom', operatingRoom);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});