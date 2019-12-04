<template>
    <div id='container'>

        <b-table 
        selectable
        :select-mode="selectMode" 
        :items="patients" 
        @row-selected="onRowSelected" 
        responsive="sm" >       
        
        </b-table>



        <!-- 환자의 상세정보를 모달창을 통해서 확인합니다 -->
        <div id="modal" :fields="fields" v-show="modalOpen" >
            환자 상세정보
            <b-table striped hover :items="modalData">
            </b-table>

            <br />
            환자 입원기록
            <b-table striped hover :items="modalhosData">
            </b-table>

            <br />
            <b-button variant="primary" v-on:click="closeModal"> 확인 </b-button> 
        </div>


    </div>

</template>

<style>
#modal {
    border : 2px #eee solid;
    position : absolute;
    top : 20%;
    left : 25%;
    width : 50%;
    background-color : white;
    padding : 3px
}
</style>

<script>
export default {
    created() {
        this.$http.post('/api/getPatientList').then(response => {
            var i = 0;
            for(i; i < response.data.length; i++) {
                this.patients.push({
                    ID : response.data[i][0],
                    Name : response.data[i][1],
                    RegistNumber : response.data[i][2],
                    CallNumber : response.data[i][3],
                    Address : response.data[i][4],
                    Gender : response.data[i][5],
                    height : response.data[i][6],
                    weight : response.data[i][7],
                    BloodType : response.data[i][8],
                })
            }
        });
    },
    data() {
        return {
            patients: [],
            selectMode: 'single',
            selected: [],

            //modal
            modalOpen : false,
            fields: ['환자번호', '이름', '차트번호', '담당의사', '질병코드'],
            modalData : [],

            modalhosData : [],

        }
    },
    methods: {
         onRowSelected(items) {
         this.modalOpen = !this.modalOpen;   
         this.modalData = [];
         this.modalhosData = [];

         this.$http.post('/api/getPatientList/detail', {patient_id : items[0].ID}).then(response => {
    
            var i = 0;
            for(i; i < response.data.length; i++) {
                this.modalData.push({
                    환자번호 : response.data[i][0],
                    이름 : response.data[i][1],
                    담당의사 : response.data[i][2],
                    차트번호 : response.data[i][3],
                    질병코드 : response.data[i][4],
                    날짜 : response.data[i][5].substring(0, 10) + '  ' + response.data[i][5].substring(11, 16)
                })
            }
         });

         this.$http.post('/api/getPatientList/gethospitalization', {patient_id : items[0].ID}).then(response => {
            var i = 0;
            for(i; i < response.data.length; i++) {
                this.modalhosData.push({
                    환자번호 : response.data[i][0],
                    이름 : response.data[i][1],
                    입원번호 : response.data[i][2],
                    입원날짜 : response.data[i][3].substring(0, 10) + '  ' + response.data[i][3].substring(11, 16),
                    퇴원날짜 : response.data[i][4].substring(0, 10) + '  ' + response.data[i][4].substring(11, 16),
                    차트번호 : response.data[i][5]
                });
            }
        });
         
      },
      
      closeModal : function() {
        this.modalData = [];
        this.modalOpen = !this.modalOpen;   
      },
            
    },   
}
</script>