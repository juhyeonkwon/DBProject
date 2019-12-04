<template>
<div class="conconhos">
    입원목록 <br /> <br />
    <div class="containerHos">
        <br />
        <b-form-select id="deptSelectSick" v-model="deptSelectSick" v-on:change='requestSickRoom' class="formhos"> 
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

        <b-form-select v-model="sickRoomSelect" id="sickRoomSelect" class="formhos">
            <option disabled value="">입원실</option>
            <option v-for="sickRoom in sickRooms" v-bind:key = "sickRoom">
                {{sickRoom}}</option>
        </b-form-select>&nbsp;

        <b-button variant="primary" v-on:click="submit">  조회 </b-button> 

        <br />
        <br />
        <b-table 
        selectable
        :select-mode="selectMode" 
        :items="lists" 
        @row-selected="onRowSelected" 
        responsive="sm" >       
        
        </b-table>



        <div class="modalHosp" v-show="modalhospView">
            입원 상세
            <b-table            
            :items="Notelists"            
            responsive="sm" >

            </b-table>
            <b-button variant="primary" v-on:click="changeNurse"> 담당간호사 변경 </b-button> &nbsp;
            <b-button variant="primary" v-on:click="writeNote"> 간호기록 작성 </b-button> &nbsp;
            <b-button variant="primary" v-on:click="closeHosp"> 닫기 </b-button>  &nbsp;
            <b-button variant="danger" v-on:click="doDischarge" position="right"> 퇴원처리 </b-button>

        </div>

        <div class="modalwritenote" v-show="modalNoteview">
            환자번호 <b-form-input type="text" v-model="notePatient" > </b-form-input> <br />
            담당 간호사 <b-form-input type="text" v-model="noteNurse" > </b-form-input> <br />
            날짜<b-form-input type="date" v-model="noteDateTime" > </b-form-input> <br />
            간호 내용<b-form-textarea type="text" v-model="note" rows="3" > </b-form-textarea>  <br />
            <b-button variant="primary" v-on:click="noteSubmit"> 작성 </b-button>
            <b-button variant="primary" v-on:click="closenote"> 취소 </b-button>            
        </div>

        <div class="modalchagnenurse" v-show="modalChangeNurseView">
            간호사 번호<br /> <b-form-input type="text" v-model="changeNurseNum"> </b-form-input> <br />
            <b-button variant="primary" v-on:click="changeNurseSubmit"> 담당간호사 변경 </b-button>
        </div>

    </div>
</div>
</template>

<style>
.containerHos {
    margin-left : 15%;
    width : 70%;
    border : 1px solid #4d4d4d4b;

}

.formhos {
    display : inline;
    width : 30%;
}

.modalHosp {
    border : 2px #eee solid;
    position : absolute;
    top : 10%;
    left : 10%;
    width : 80%;
    background-color : white;
    padding : 3px
}

.modalwritenote {
    width : 50%;
    border : 2px #eee solid;
    position : absolute;
    top : 10%;
    left : 25%;
    width : 50%;
    background-color : white;
    padding : 3px
}

.modalchagnenurse {
    width : 50%;
    border : 2px #eee solid;
    position : absolute;
    top : 10%;
    left : 40%;
    width : 20%;
    background-color : white;
    padding : 3px
}


</style>

<script>
const todays = new Date();


export default {
    created() {
        console.log(todays);
    },
    data() {
        return {
            deptSelectSick : '',
            sickRoomSelect : '',
            sickRooms : '',


            selectMode : 'single',
            lists : [],

            modalhospView : false,
            modalNoteview : false,

            //간호기록
            Notelists : [],
            notePatient : '',
            noteNurse : '',
            noteDateTime : todays.getFullYear() + '-' + (todays.getMonth() + 1) + '-' + todays.getDate(),
            note :'',

            //퇴원및 간호사 변경시 입원번호 찾기
            hos_num : '',
            

            //간호사 변경 모달
            modalChangeNurseView : false,
            changeNurseNum : '',

        }
    },
    methods : {
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
        submit: function() {
            this.$http.post('/api//hospitalization/view', {sick_room_id : this.sickRoomSelect}).then(response => {
                this.lists = [];
                console.log(response.data);

                var i = 0;
                for(i; i < response.data.length; i++) {
                    this.lists.push({
                        입원번호 : response.data[i][0],
                        입원일 : response.data[i][1].substring(0, 10) + '  ' + response.data[i][1].substring(11, 16),
                        환자번호 : response.data[i][2],
                        환자명 : response.data[i][3],
                        차트번호 : response.data[i][4],
                        간호사번호 : response.data[i][5],
                        담당간호사 : response.data[i][6],
                        입원실 : response.data[i][7]
                    });
                }
                

            });
        },        
        onRowSelected(item) {        
            this.$http.post('/api/nurse/viewnote', {patient_id : item[0].환자번호}).then(response => {
                this.modalhospView = !this.modalhospView;
                this.Notelists = [];
                this.patient_id = '';
                this.noteNurse = '';
                this.hos_num = '';

                console.log(response.data);
                var i = 0;
                for(i; i < response.data.length; i++) {
                    this.Notelists.push({
                        환자명 : response.data[i][0],
                        담당간호사 : response.data[i][1],
                        작성일자 : response.data[i][2].substring(0, 10) + '  ' + response.data[i][2].substring(11, 16),
                        노트 : response.data[i][3],
                    });
                }
                this.notePatient = item[0].환자번호;
                this.noteNurse = item[0].간호사번호;
                this.hos_num = item[0].입원번호;

            });
        },
        writeNote : function() {
            this.modalNoteview = !this.modalNoteview;
        },
        noteSubmit : function() {
            let today = new Date();
            this.$http.post('/api/nurse/writenote', {patient_id : this.notePatient, nurse_id : this.noteNurse, note : this.note, datetime : this.today}).then(response => {
                console.log(response);
                if(response.data === 'success') {
                    alert('작성완료 했습니다.');
                    //todo...모달창다 닫게 강제...
                    this.modalhospView = false;
                    this.modalNoteview = !this.modalNoteview;

                }
            })
        },
        closeHosp : function() {
            this.modalhospView = false;
        },
        closenote : function() {
            this.modalNoteview = !this.modalNoteview;
        },
        doDischarge : function() {
            var alt = confirm("정말로 퇴원처리를 하시겠습니까?");
            if(alt) {
                console.log(this.hos_num);
                this.$http.post('/api//hospitalization/discharge', {hosptalization_id : this.hos_num}).then(response => {
                    if(response.data = 'success'){
                        alert('퇴원 처리완료');
                        this.modalhospView = false;
                    }                
                });
            }            
        }, 
        //담당간호사 변경 function...
        changeNurse : function() {
            this.modalChangeNurseView = !this.modalChangeNurseView;
        },
        changeNurseSubmit : function() {
            this.$http.post('/api/hospitalization/changenurse', {hosptalization_id : this.hos_num, nurse_id : this.changeNurseNum}).then(response => {
                if(response.data === 'success') {
                    alert('변경이 완료되었습니다');    
                    this.modalChangeNurseView = !this.modalChangeNurseView;              
                } else {
                    alert('정보를 다시 확인해 주세요')
                }
            });
        },       
    },    
}
</script>