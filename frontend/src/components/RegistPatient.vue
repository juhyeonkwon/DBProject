<template>
<div id='container'>
    
    <p> 환자등록 </p>
    <div  id="patiForm">
        <br />
    환자 이름 <b-form-input type="text" v-model="form.patient_name" id="input1"> </b-form-input> <br />
    주민등록번호 <b-form-input type="text" v-model="form.regist_num" id="input1"> </b-form-input> <br />
    전화 번호 <b-form-input type="text" v-model="form.call_num" id="input1"> </b-form-input> <br />
    주소<b-form-input type="text" v-model="form.address" id="input1"> </b-form-input> <br />
    성별 <b-form-input type="text" v-model="form.gender" id="input1"> </b-form-input> <br />
    키 <b-form-input type="text" v-model="form.height" id="input1"> </b-form-input> <br />
    몸무게 <b-form-input type="text" v-model="form.weight" id="input1"> </b-form-input> <br />
    혈액형 <b-form-input type="text" v-model="form.blood_type" id="input1"> </b-form-input> <br /> 
    <b-button variant="primary" v-on:click="submit" >환자 등록</b-button> <br /><br />
    </div>

</div>
    
</template>

<style>

#patiForm {
    margin-left : 15%;
    width : 70%;
    border : 1px solid #4d4d4d4b;
}

#input1 {        
    width:   25%;
    margin : 0 auto;
    }


</style>

<script>
export default {
    created() {

    },
    data () {
        return {
            form: {
                patient_name : '',
                regist_num : '',
                call_num : '',
                address : '',
                gender : '',
                height : '',
                weight : '',
                blood_type : '',
            }
        }
    },
    methods : {
        submit : function () {
            this.$http.post('api/addPatient', {name : this.form.patient_name, regist_num : this.form.regist_num, call_num : this.form.call_num, address : this.form.address, gender : this.form.gender, 
                height : this.form.height, weight : this.form.weight, blood_type : this.form.blood_type }).then(response => {
                    console.log(response.data);
                    if(response.data === 'success') {
                        alert('등록에 성공했습니다');
                    } else {
                        alert('정보를 다시 확인해 주세요');
                    }

                    
                })
        }

    }

}
</script>