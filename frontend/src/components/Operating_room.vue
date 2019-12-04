<template>
<div id = "containerOper">
     <b-table 
        selectable
        :select-mode="selectMode" 
        :items="oper_rooms" 
        @row-selected="onRowSelected" 
        responsive="sm" >       
        
        </b-table>

        <div id="modaloper" v-show="modalopen">
                수술실 <b-form-input type="text" readonly v-model="operating_room"> </b-form-input> <br />
                의사 <b-form-input type="text"  v-model="doctor_name"> </b-form-input> <br />
                환자명 <b-form-input type="text"  v-model="patient_name"> </b-form-input> <br />
                시작시간 <b-form-input type="text"  readonly v-model="datetime"> </b-form-input> <br />
                <br />
                <b-button variant="primary" v-on:click="cleaerRoom" > 수술 종료 </b-button> &nbsp;
                <b-button variant="primary" v-on:click="setRoom" > 정보 저장 </b-button>  &nbsp;
                <b-button variant="primary" v-on:click="close" > 닫기 </b-button> <br />

                

        </div>

</div>
</template>

<style>

#containerOper {
    margin-left : 10%;
    padding : 1%;
    width : 80%;
    border : 1px solid #4d4d4d4b;
}

#modaloper {
    border : 2px #eee solid;
    position : absolute;
    top : 10%;
    left : 25%;
    width : 50%;
    background-color : white;
    padding : 3px
}

</style>

<script>
const todays = new Date();

let min;
if(todays.getMinutes() < 10) {
    min = '0' + todays.getMinutes()
} else {
    min = todays.getMinutes();
}

export default {
    created() {
        this.$http.post('/api/operatingRoom').then(response => {
            this.oper_rooms = [];
            var i = 0;
            for(i; i < response.data.length; i++) {
                this.oper_rooms.push( {
                    수술실 : response.data[i][0],
                    담당의사 : response.data[i][1],
                    환자명 : response.data[i][2],
                    시작시간 : response.data[i][3],
                })
            } 
        });
    },
    data() {
        return {
            selectMode : 'single',
            oper_rooms : [],

            modalopen : false,

            operating_room : '',
            doctor_name : '',
            patient_name : '',
            datetime : todays.getFullYear() + '-' + (todays.getMonth() + 1) + '-' + todays.getDate() + '  ' + todays.getHours() + ":" + min,
        }
    },
    methods : {
        onRowSelected(item) {
            this.modalopen = true;
            this.operating_room = item[0].수술실;
            this.patient_name = item[0].환자명;
            this.doctor_name = item[0].담당의사;
        },

        cleaerRoom : function () {
            console.log(this.operating_room);
            this.$http.post('/api/operatingRoom/clearoper', { operating_room_id : this.operating_room}).then(response => {
                if(response.data === 'success') {
                    alert('수술 종료 되었습니다');
                    this.modalopen = false;

                } else {
                    alert('error');
                }
            });
        },
        setRoom : function () {
            this.$http.post('/api/operatingRoom/setoper', { operating_room_id : this.operating_room, doctor_name : this.doctor_name, patient_name : this.patient_name, datetime: this.datetime}).then(response => {
                if(response.data === 'success') {
                    alert('저장 완료 되었습니다');
                    this.modalopen = false;
                    

                } else {
                    alert('error');
                }
            });
        },
        close : function () {
            this.modalopen = false;

        }
    },
}
</script>