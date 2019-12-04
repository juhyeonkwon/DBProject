<template>
    <!-- 
        발견된 버그 : 날짜가 제대로 되지가 않습니다..


    -->
    
    <div id="form">
        <br />
    예약 날짜 <b-form-input type="date" v-model="form.date" class="input1"><label> 예약날짜 </label></b-form-input> <br />
    예약 시간 <b-form-input type="time" v-model="form.time" step="1200" class="input1"></b-form-input>  <br />
    <b-button variant="outline-primary" v-on:click="openDocModal" >진료부서, 의사번호 찾기</b-button> <br /><br />
    의사 번호 <b-form-input type="text" v-model="form.doctor_id" class="input1"></b-form-input> <br />
    진료 부서 <b-form-input type="text" v-model="form.dept_id" class="input1"></b-form-input> <br />
    
    
    <b-button variant="outline-primary" v-on:click="openPatModal" >환자번호 찾기</b-button> <br /><br />

    환자 번호 <b-form-input type="text" v-model="form.patient_id" class="input1"></b-form-input> <br />    
    <b-button variant="primary" v-on:click="submit" >예약하기</b-button>

    <br /> <br />






    <!-- 모달창 정의를 위한것,, -->
    <div id='docModal' v-show="modalDocOpen">
           <b-badge variant="dark">진료부서</b-badge> <br/>
           <b-form-select id="deptSelect" v-model="deptSelect" v-on:change='requestDoc'> 
           <option disabled value="">진료부서</option>
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
        </b-form-select><br/>

        <b-badge variant="dark">의사</b-badge><br/>
        <b-form-select v-model="docSelect" id="docSelect">
            <option disabled value="">의사</option>
            <option v-for="doctorName in doctorNames" v-bind:key = "doctorName">
                {{doctorName}}</option>

        </b-form-select>

        <br />
        <br />


        <b-button variant="primary" v-on:click="modalSubmit">선택</b-button>   

        <br />

        </div>



    
    <div id="patModal" v-show="modalPatOpen">
        찾으시는 환자의 이름, 생년월일을 입력해주세요<br/><br/>
        이름 
        <b-form-input type="text" v-model="patient_name" class="input1"></b-form-input> <br />
        생년월일
         <b-form-input type="text" v-model="patient_regist" class="input1"></b-form-input> <br />
        <b-button variant="primary" v-on:click="modalPatSubmit">찾기</b-button>


    </div>

</div>



</template>

<style>

#form {
    margin-left : 10%;
    width : 80%;
    border : 1px solid #4d4d4d4b;
}

.input1 {    
    
    width:   40%;
    margin : 0 auto;
    }

#docModal {
    border : 2px #eee solid;
    position : absolute;
    width : 350px;
    top : 20%;
    left : 40%;
    width : 20%;
    background-color : white;
    padding : 3px
}

#patModal {
    border : 2px #eee solid;
    position : absolute;
    top : 20%;
    left : 50%;
    width : 25%;
    background-color : white;
    padding : 3px
}



</style>

<script>

const date = new Date();

console.log(date);

const today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

console.log(today);


export default {
    components: {
    },
    created(){
       /* this.$http.get('/api/getSeqReserv').then(response => {
            console.log(response)
            this.reserv_seq = response.data[0];
       })*/
    },
    data () {
        return {
            form: {
                date : today,
                time : '09:00',
                doctor_id : '',
                patient_id : '',
                dept_id : '',
                
            },
            reserv_seq : '',

            //의사,진료부서의 값을 전달 하기위하여 사용하는 데이터들
            modalDocOpen: false,
            doctorNames: [],
            doc_deptName : [],
            deptSelect: '',
            docSelect: '',          
            
            //환자 번호의 값을 전달하기 위하여 사용하는 데이터
            modalPatOpen: false,
            patient_name: '',
            patient_regist: '',
        }
    },
    methods: {
        //Input의 값들을 전달합니다.
        submit: function () {
            this.$http.post('/api/reservation', { reserv_id : this.reserv_seq, doctor_id : this.form.doctor_id, 
                                            patient_id : this.form.patient_id, dept_id : this.form.dept_id, 
                                            date:this.form.date, time: this.form.time }).then(response => {
                console.log(response)
                this.result = response.date
                this.no = response.data.no

                if(response.data === 'success') {
                   alert("예약 되었습니다");
                } else {
                    alert("정보를 다시 확인해 주세요");
                }
               
            }).catch((ex) => {
                console.warn("error occured, ex")
            });
        },
        //의사, 진료부서 선택을 위한 모달 함수 정의들
        openDocModal: function () {
            this.modalDocOpen = !this.modalDocOpen;

        },
        requestDoc: function() {
            this.$http.post('/api/reservViewDocList', { dept_name : this.deptSelect }).then(response => {
                this.doctorNames = [];
                var i = 0;
                for(i; i < response.data.length; i++) {
                    this.doctorNames.push(response.data[i][0]);
                }
            })
        },
        modalSubmit: function() {
            this.$http.post('/api/selectDocDept', {dept_name : this.deptSelect, doc_name : this.docSelect}).then(response => {
                    console.log(response.data);
                    this.form.doctor_id = response.data[0][0];
                    this.form.dept_id = response.data[0][1];                   
            })            
            this.modalDocOpen = !this.modalDocOpen;

        },
        //환자번호를 찾기위한 함수 정의들
        openPatModal: function() {
            this.modalPatOpen = !this.modalPatOpen;

        },
        modalPatSubmit: function() {
            this.$http.post('/api/selectDocDept/patient', {p_name : this.patient_name, regist_num : this.patient_regist}).then(response => {
                console.log(response.data[0]);
                this.form.patient_id = response.data[0];
            })


            this.modalPatOpen = !this.modalPatOpen;

        },

    }

};
</script>