<template>

<div id="container">
    입원 등록 <br /> <br />
    <div class='formHos'>
        <br />
        입원 날짜<b-form-input type="date" v-model="datetime" class="block1"></b-form-input> <br />
        퇴원 날짜 <b-form-input type="text" v-model="discharge_date" class="block1" readonly></b-form-input> <br />

        <div id="inlineHos">
            환자 번호 <b-form-input type="text" v-model="patient_id" class="inlineHos">  </b-form-input> 
            &nbsp;  <b-button variant="outline-primary" v-on:click="openPatModal"  >환자번호 찾기</b-button> <br />
        </div>

        <br />

        <div id="inlineHos">
            차트번호 <b-form-input type="text" v-model="chart_id" class="inlineHos">  </b-form-input> 
            &nbsp;  <b-button variant="outline-primary" v-on:click="findChart" >차트번호 찾기</b-button> <br />
        </div>

        <br />
        <div id="inlineHos">
            담당 간호사 <b-form-input type="text" v-model="nurse_id" class="inlineHos" > </b-form-input> 
            &nbsp;  <b-button variant="outline-primary" v-on:click="find_nurse" > 담당 간호사 지정</b-button> <br />
        </div>

        <br />
        <div id="inlineHos">
            입원실 <b-form-input type="text" v-model="sick_room_id" class="inlineHos" > </b-form-input> 
            &nbsp;  <b-button variant="outline-primary" v-on:click="findSickRoom" > 입원실 지정</b-button> <br />
        </div>

        <br/>
        <b-button variant="primary" v-on:click="submit" > 저장 </b-button> <br /> <br />
        
    </div>


<!-- 환자번호찾기 모달 -->


    <div id="patModal" v-show="modalPatOpen">
        찾으시는 환자의 이름, 생년월일을 입력해주세요<br/><br/>
        이름 
        <b-form-input type="text" v-model="patient_name" class="input1"></b-form-input> <br />
        생년월일
         <b-form-input type="text" v-model="patient_regist" class="input1"></b-form-input> <br />
        <b-button variant="primary" v-on:click="modalPatSubmit">찾기</b-button>

    </div>


    <!-- 차트찾기 모달 -->
    <div id="modalChart" v-show="modalChartOpen" >
        환자 차트정보
        <b-table 
        selectable
        striped hover 
        :items="modalData"
        :select-mode="selectMode" 
        @row-selected="onRowSelected" 
        responsive="sm"
        >
        </b-table>

        <b-button variant="primary" v-on:click="closeModal"> 확인 </b-button> 
    </div>


    <!-- 간호사 모달 -->
    <div id="modalNurse" v-show="modalNurseOpen"> 
        소속부서
        <b-form-select id="deptSelect" v-model="deptSelect" v-on:change='requestNurse'> 
           <option disabled value="">소속 부서</option>
           <option>내과</option>
           <option>일반외과</option>
           <option>이비인후과</option>
           <option>영상의학과</option>
           <option>가정의학과</option>
           <option>방사선과</option>
           <option>정형외과</option>
           <option>병리과</option>
           <option>응급의학과</option>
           <option>산부인과</option>
           <option>마취통증의학과</option>
           <option>비뇨기과</option>
           <option>신경과</option>
           <option>신경외과</option>
           <option>피부과</option>
           <option>흉부외과</option>
        </b-form-select>
        <br />        <br />

        간호사
        <b-form-select v-model="nurSelect" id="nurSelect">
            <option disabled value="">간호사</option>
            <option v-for="nurName in nurNames" v-bind:key = "nurName">
                {{nurName}}</option>
        </b-form-select>

        <br />
        <br />

        <b-button variant="primary" v-on:click="closeNurModal"> 지정 </b-button> 


    </div>

    <!-- 입원실 모달 -->
    <div id="modalSickRoom" v-show="modalSickRoomOpen"> 
        
        <b-form-select id="deptSelectSick" v-model="deptSelectSick" v-on:change='requestSickRoom'> 
           <option disabled value="">입원 병동</option>
           <option>내과</option>
           <option>일반외과</option>
           <option>이비인후과</option>           
           <option>정형외과</option>
           <option>응급의학과</option>
           <option>산부인과</option>
           <option>비뇨기과</option>
           <option>신경과</option>
           <option>신경외과</option>
           <option>피부과</option>
           <option>흉부외과</option>
        </b-form-select>

        입원실
        <b-form-select v-model="sickRoomSelect" id="sickRoomSelect">
            <option disabled value="">입원실</option>
            <option v-for="sickRoom in sickRooms" v-bind:key = "sickRoom">
                {{sickRoom}}</option>
        </b-form-select>

        <b-button variant="primary" v-on:click="closeSickModal"> 지정 </b-button> 


    </div>
</div>

    
</template>

<style>

.formHos {
    margin-left : 15%;
    width : 70%;
    border : 1px solid #4d4d4d4b;
}

.block1 {
    width : 50%;
    margin : 0 auto;
}

.inlineHos {
    display : inline;
    width : 30%;
}

#patModal {
    border : 2px #eee solid;
    position : absolute;
    top : 20%;
    left : 40%;
    width : 20%;
    background-color : white;
    padding : 3px
}

#modalChart {
    border : 2px #eee solid;
    position : absolute;
    top : 20%;
    left : 30%;
    width : 40%;
    background-color : white;
    padding : 3px
}

#modalNurse {
    border : 2px #eee solid;
    position : absolute;
    top : 20%;
    left : 30%;
    width : 40%;
    background-color : white;
    padding : 3px
}

#nurSelect {
    width:45%
}


#modalSickRoom {
    border : 2px #eee solid;
    position : absolute;
    top : 20%;
    left : 30%;
    width : 40%;
    background-color : white;
    padding : 3px
}

</style>

<script>
export default {
    created() {

    },
    data() {
        return {
            //폼입력을 받기위해 사용하는 데이터
            datetime : '2019-12-12',
            discharge_date : '',
            patient_id : '',
            chart_id : '',
            nurse_id : '',
            sick_room_id : '',

            //환자 번호의 값을 전달하기 위하여 사용하는 데이터
            modalPatOpen: false,
            patient_name: '',
            patient_regist: '',

            //차트 번호의 값을 전달하기 위하여 사용하는 데이터
            modalChartOpen: false,
            modalData: [],
            selectMode : 'single',


            //간호사 선택을 위하여 사용하는 데이터
            modalNurseOpen : false,
            deptSelect : '',
            nurSelect : '',
            nurNames : [],
            nurInfos : [],

            //입원실 선택을 위하여 사용하는 데이터
            modalSickRoomOpen : false,
            deptSelectSick : '',
            sickRoomSelect : '',
            sickRooms : [],
        }
    },
    methods : {

        //환자번호를 찾기위한 함수 정의들
        openPatModal: function() {
            this.modalPatOpen = !this.modalPatOpen;

        },
        modalPatSubmit: function() {
            this.$http.post('/api/selectDocDept/patient', {p_name : this.patient_name, regist_num : this.patient_regist}).then(response => {
                console.log(response.data[0]);
                this.patient_id = response.data[0];
            })


            this.modalPatOpen = !this.modalPatOpen;

        }, //환자 찾기 끝

        //차트를 찾기위해 사용
        findChart : function() {
            this.modalChartOpen = !this.modalChartOpen;   
            this.modalData = [];
    

            this.$http.post('/api/getPatientList/detail', {patient_id : this.patient_id}).then(response => {
        
                var i = 0;
                for(i; i < response.data.length; i++) {
                    this.modalData.push({
                        환자번호 : response.data[i][0],
                        이름 : response.data[i][1],
                        담당의사 : response.data[i][2],
                        차트번호 : response.data[i][3],
                        질병코드 : response.data[i][4],
                        날짜 : response.data[i][5]
                    })
                }
            })
        },       
        closeModal : function() {
            this.modalData = [];
            this.modalChartOpen = !this.modalChartOpen;   
        },
        onRowSelected(items) {
            this.chart_id = items[0].차트번호;
            this.modalChartOpen = !this.modalChartOpen;   

        }, //차트번호 찾기 끝

      //간호사 지정
      find_nurse : function() {
          this.modalNurseOpen = !this.modalNurseOpen; 
      },

      requestNurse : function() {
          this.$http.post('/api/selectDocDept/nurse', {dept_name : this.deptSelect}).then(response => {
            this.nurInfos = [];
            this.nurNames = [];
            var i = 0;
            for(i; i < response.data.length; i++) {
                this.nurNames.push(response.data[i][1]);
                this.nurInfos.push({
                    id : response.data[i][0],
                    name : response.data[i][1]
                });
            }
          })
      },      
      closeNurModal : function() {
        this.nurse_id = '';
        var j = 0;
        for(j; j < this.nurInfos.length; j++) {
            if(this.nurInfos[j].name === this.nurSelect) {
                this.nurse_id = this.nurInfos[j].id;
            }                        
        }
        this.modalNurseOpen = !this.modalNurseOpen; 
      },//간호사 지정 끝

      //입원실 지정
      findSickRoom : function() {
          this.modalSickRoomOpen = !this.modalSickRoomOpen;
      },
      requestSickRoom : function() {
          this.$http.post('/api//hospitalization/sickroom', {dept_name : this.deptSelectSick}).then(response => {
            this.sickRooms = [];
            console.log(response);
            var i = 0;
            for(i; i < response.data.length; i++) {
                this.sickRooms.push(response.data[i][0]);
            }
          });
      },
      closeSickModal : function() {
          this.modalSickRoomOpen = !this.modalSickRoomOpen;
          this.sick_room_id = this.sickRoomSelect;
      }, //입원실 지정 끝

      //저장
      submit : function() {
           this.$http.post('/api//hospitalization', {datetime : this.datetime, patient_id : this.patient_id, chart_id : this.chart_id, nurse_id : this.nurse_id, sick_room_id : this.sick_room_id}).then(response => {
               if(response.data === 'success') {
                   alert('저장을 완료했습니다');
               } else {
                   alert('정보를 다시 확인해 주세요');
               }
           });
      },
    },
}
</script>