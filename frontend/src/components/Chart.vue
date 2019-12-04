<template>
    <div id="container">
        <p> 차트 작성 </p>
        
        <div id="form">
            <br />
            날짜 <b-form-input type="date" v-model="datetime" class="form1"> </b-form-input> <br />

            <div id="inline1" display="inline">
                담당 의사 <b-form-input type="text" v-model="doctor_id" class="inline"> </b-form-input> 
                &nbsp;&nbsp;&nbsp;환자 번호 <b-form-input type="text" v-model="patient_id" class="inline"> </b-form-input>&nbsp;&nbsp;
                <b-button variant="outline-primary" v-on:click="openPatModal" size="sm">환자번호 찾기</b-button>
            </div>
            <br />

            <div id="inline2" display="inline">
            질병 코드 <b-form-select type="text" v-model="disease_code" id="disease_code" class="inline2"> 
                <option disabled="질병코드"> </option>
                <option v-for="disease_code in disease_codes" v-bind:key="disease_code"> {{disease_code}} </option>
                
            </b-form-select>&nbsp;&nbsp;&nbsp;
            환자 이름 <b-form-input type="text" v-model="patient_name" class="inline"> </b-form-input> 
            </div>
            <br />
            진료 내용 <b-form-textarea type="text" v-model="diagnosis" rows="3" class="block1"> </b-form-textarea> <br />
            처방 내용 <b-form-textarea type="text" v-model="prescription" rows="3" class="block1"> </b-form-textarea>
            <br />
            <br />
            <b-button variant="primary" v-on:click="submit">작성</b-button>  <br /> <br />

        </div>




        <!-- 모달 정의 -->
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

.form1 {
    width: 50%;
    margin : 0 auto;
}

.inline {
    display: inline;
    width: 10%;
}

.inline2 {
    display: inline;
    width: 22%;
}

.block1 {
    width: 50%;
    margin : 0 auto;
}

.input1 {    
    
    width:   40%;
    margin : 0 auto;
    }

#patModal {
    border : 2px #eee solid;
    position : absolute;
    top : 20%;
    left : 40%;
    background-color : white;
    padding : 3px
}


</style>

<script>

export default {    
    created() {
        this.$http.post('/api/diseaseCode').then(response => {

            var i = 0;
            for(i; i < response.data.length; i++)
                this.disease_codes.push(response.data[i][0]);
        })

    },
    data() {
        return {
            datetime : '2019-12-12',
            doctor_id : '',
            patient_id : '',
            disease_code : '',
            patient_name: '',
            diagnosis : '',
            prescription : '',

            disease_codes : [],


            //환자 번호의 값을 전달하기 위하여 사용하는 데이터
            modalPatOpen: false,
            patient_regist: '',
        }
    },
    methods : {
        submit : function() {
            this.$http.post('/api/chart', {doctor_id : this.doctor_id, patient_id : this.patient_id, disease_code: this.disease_code, prescription : this.prescription,
                                         diagnosis : this.diagnosis, datetime : this.datetime 
                            }).then(response => {
                                if(response.data === 'success') {
                                    alert('작성완료');
                                } else {
                                    alert('정보를 다시 확인해 주세요');
                                }
                    
                            });
        },

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

        },
    },
}
</script>