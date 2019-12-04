<template>
    <div id="viewChart">
        <div id="formChartview">
            환자 이름 <b-form-input type="text" v-model="patient_name" class="input3"></b-form-input> &nbsp;&nbsp;&nbsp;
            생년 월일 <b-form-input type="text" v-model="patient_regist" class="input3"></b-form-input> 
            <b-button variant="primary" v-on:click="submit">선택</b-button>             <br />
             <br />

        </div>  


         <b-table 
         selectable
          
         :items="chart_summary"
         :select-mode="selectMode" 
         @row-selected="onRowSelected" 
         responsive="sm"
         >        

         </b-table>

             <br />
             <br />



        <!-- 모달 -->
        <div id="chartModal" v-show="modalOpen">             
            <br />
            차트 상세
            <br />
            <br />

            <div id="inlineChart1" >
                차트 번호 <b-form-input type="text" v-model="chart_num" class="inlineChart" readonly> </b-form-input>
                날짜 <b-form-input type="text" v-model="datetime" class="inlineChart" readonly > </b-form-input> <br />
            </div>
            <br />

            <div id="inlineChart2"> 
           
            담당 의사 <b-form-input type="text" v-model="doctor_name" class="inlineChart" readonly> </b-form-input> 
            환자 이름 <b-form-input type="text" v-model="patient_name" class="inlineChart" readonly> </b-form-input> 
            </div>
             <br />

             질병 코드 <b-form-input type="text" v-model="disease_code" id="disease_code" class="inlineChart" readonly> </b-form-input>
             <br />           
             <br />

            진료 내용 <b-form-textarea type="text" v-model="diagnosis" rows="3" class="block1" readonly> </b-form-textarea> <br />
            처방 내용 <b-form-textarea type="text" v-model="prescription" rows="3" class="block1" readonly> </b-form-textarea>
            <br />

            <b-button variant="primary" v-on:click="close"> 확인 </b-button>


        </div>



    </div>

   

</template>

<style>

#chartModal {
    border : 2px #eee solid;
    position : absolute;
    width : 80%;
    margin : 0 auto;
    top : 20%;
    left : 10%;
    width : 80%;
    background-color : white;
}

.inlineChart {
    display: inline;
    width: 22%;
}

.input3 {
    display : inline;
    width : 10%;
}

</style>

<script>
export default {
    created() {

    },
    data() {
        return {
            patient_name : '',
            patient_regist : '',
            chart_summary : [],

            //select
            selectMode: 'single',
            selected_id : '',


            //modal
            modalOpen : false,

            chart_num : '',
            datetime : '',
            doctor_name : '',
            disease_code : '',
            diagnosis : '',
            prescription : '',

        }
    },
    methods: {
        submit : function() {
            this.$http.post('/api/chart/summary', {p_name : this.patient_name, regist_num : this.patient_regist}).then(response => {
                this.chart_summary = [];
                if(response.data.length === 0) {
                    alert('정보를 다시 입력해 주세요.')
                } else {
                    var i = 0;
                    for(i; i < response.data.length; i++) {
                        this.chart_summary.push({
                            No : response.data[i][0],
                            '환자 번호' : response.data[i][1],
                            이름 : response.data[i][2],
                            날짜 : response.data[i][3].substring(0, 10) + '  ' + response.data[i][3].substring(11, 16),
                            질병코드 : response.data[i][4]
                        })
                    }
                }
            })
        },
        onRowSelected(items) {
            this.selected_id = items[0].No;            
            this.modalOpen = !this.modalOpen;
            console.log(this.selected_id);

            //서버요청
            this.$http.post('api/chart/detail', {chart_id : this.selected_id}).then(response => {
                this.chart_num = response.data[0][0];
                this.datetime = response.data[0][1].substring(0, 10) + '  ' + response.data[0][1].substring(11, 16) ;
                this.doctor_name = response.data[0][2];
                this.patient_name = response.data[0][3];
                this.disease_code = response.data[0][4];
                this.diagnosis = response.data[0][5];
                this.prescription = response.data[0][6];
            })
       },
       close : function() {
            this.modalOpen = !this.modalOpen;

       }

    },
}
</script>