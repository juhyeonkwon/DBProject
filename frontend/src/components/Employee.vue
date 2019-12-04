<template>
<div class = 'container'>
    <b-button variant='info' v-on:click="doctorList">의사</b-button> &nbsp;&nbsp;
    <b-button variant='info' v-on:click="nurseList">간호사</b-button> &nbsp;&nbsp;
    <!--Todo 직원등록 금요일 -->
    <b-button variant='info' v-on:click="addEmp">직원 등록</b-button>

    <br />
    <br />

    <div id='doctor' v-show="doctorShow" class="table1">
         <b-table 
        selectable
        :select-mode="selectMode" 
        :items="doctorListData" 
        @row-selected="onDoctorSelected" 
        responsive="sm" >       
        
        </b-table>

    </div>

    <div id='nurse' v-show="nurseShow" class="table1">
         <b-table 
        selectable
        :select-mode="selectMode" 
        :items="nurseListData" 
        @row-selected="onNurseSelected" 
        responsive="sm" >       
          
        </b-table>

    </div>


    <div id='doctorModal' v-show="doctorModalShow">
        No <b-form-input type="text" readonly v-model="docNo" ></b-form-input> <br />
        부서 <b-form-select id="deptSelect" v-model="docDept" v-on:change='requestDoc'> 
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
        </b-form-select><br/> <!-- <b-form-input type="text" v-model="docDept"></b-form-input> <br /> -->
        전공 <b-form-input type="text" v-model="docMajor"></b-form-input> <br />
        직급 <b-form-input type="text" v-model="docRank"></b-form-input> <br />
        이름 <b-form-input type="text" v-model="docName" readonly></b-form-input> <br />
        주민번호 <b-form-input type="text" v-model="docRegist" readonly></b-form-input> <br />
        주소 <b-form-input type="text" v-model="docAddr"></b-form-input> <br />
        이메일 <b-form-input type="text" v-model="docEmail"></b-form-input> <br />
        <br />
        <b-button variant='primary' v-on:click="docSubmit">수정</b-button>
        <b-button variant='primary' v-on:click="docClose">닫기</b-button> <br />
    </div>

    <div id='nurseModal' v-show="nurseModalShow">
        No <b-form-input type="text" readonly v-model="nurNo" ></b-form-input> <br />
        부서 <b-form-select id="deptSelectnur" v-model="nurDept" v-on:change='requestNur'> 
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
        </b-form-select><br/> <!-- <b-form-input type="text" v-model="docDept"></b-form-input> <br /> -->
        직급 <b-form-input type="text" v-model="nurRank"></b-form-input> <br />
        이름 <b-form-input type="text" v-model="nurName" readonly></b-form-input> <br />
        주민번호 <b-form-input type="text" v-model="nurRegist" readonly></b-form-input> <br />
        주소 <b-form-input type="text" v-model="nurAddr"></b-form-input> <br />
        이메일 <b-form-input type="text" v-model="nurEmail"></b-form-input> <br />
        <br />
        <b-button variant='primary' v-on:click="nurSubmit">수정</b-button>
        <b-button variant='primary' v-on:click="nurClose">닫기</b-button> <br />




    </div>

    <div id="addEmp" v-show="addEmpshow">
        <br/>직원 등록 <br/> <br/>
        분류 선택 <b-form-select id="deptSelect" v-model="docNurse" v-on:change='showMajor'> 
           <option disabled value="">의사, 간호사</option>
           <option>의사</option>
           <option>간호사</option>
        </b-form-select> <br />
        부서 <b-form-select id="deptSelectnur" v-model="empDept" v-on:change='requestEmp'> 
           <option disabled value="">부서</option>
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
        <div v-show="ifdoc" >전공 <b-form-input type="text" v-model="empMajor"></b-form-input> <br />
        </div>
        직급 <b-form-input type="text" v-model="empRank"></b-form-input> <br />
        이름 <b-form-input type="text" v-model="empName"></b-form-input> <br />
        주민번호 <b-form-input type="text" v-model="empRegist"></b-form-input> <br />
        주소 <b-form-input type="text" v-model="empAddr"></b-form-input> <br />
        이메일 <b-form-input type="text" v-model="empEmail"></b-form-input> <br />
       
        <b-button variant='primary' v-on:click="empSubmit">등록</b-button>
        <b-button variant='primary' v-on:click="closeEmp">닫기</b-button>
        
    </div>



</div>
    
</template>

<style>

.table1 {
        border : 1px solid #4d4d4d4b;
}

#doctorModal {
    border : 2px #eee solid;
    position : absolute;
    width : 350px;
    top : 20%;
    left : 25%;
    width : 50%;
    background-color : white;
    padding : 3px
}

#nurseModal {
    border : 2px #eee solid;
    position : absolute;
    width : 350px;
    top : 20%;
    left : 25%;
    width : 50%;
    background-color : white;
    padding : 3px
}

#addEmp {
    border : 2px #eee solid;
    position : absolute;
    width : 350px;
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

    },
    data () {
        return {
            doctorListData : [],
            doctorShow : true,

            nurseListData : [],
            nurseShow : true,

            selectMode : 'single',



            //modal
            doctorModalShow : false,
            docNo : '',
            docDept : '',
            docMajor : '',
            docRank : '',
            docName : '',
            docRegist : '',
            docAddr : '',
            docEmail : '',
            docdeptNum : '',


            //nursemodal
            nurseModalShow : false,
            nurNo : '',
            nurDept : '',
            nurRank : '',
            nurName : '',
            nurRegist : '',
            nurAddr : '',
            nurEmail : '',
            nurdeptNum : '',

            //addemployee
            addEmpshow : false,
            docNurse : '',
            ifdoc : false, //분류가 의사로 선택돼었으면 표시가 되게 합니다...
            empDept : '',
            empDeptNum : '',
            empMajor : '',
            empRank : '',
            empName : '',
            empRegist : '',
            empAddr : '',
            empEmail : '',

        }
    },
    methods : {
        //의사 function
        doctorList : function() {
            this.$http.post('/api/doctor/list').then(response => {
                this.doctorShow = true;
                this.nurseShow = false;
                this.doctorListData = [];

                console.log(response)

                var i = 0;
                for(i ; i < response.data.length; i++) { 
                    this.doctorListData.push( {
                        No : response.data[i][0],
                        부서 : response.data[i][1],
                        전공 : response.data[i][2],
                        직급 : response.data[i][3],
                        이름 : response.data[i][4],
                        주민번호 : response.data[i][5],
                        주소 : response.data[i][6],
                        이메일 : response.data[i][7],
                    });
                }
            })

        },       
        onDoctorSelected(item) {
            this.doctorModalShow = true;

            this.docNo = item[0].No;
            this.docDept = item[0].부서;
            this.docMajor = item[0].전공;
            this.docRank = item[0].직급;
            this.docName = item[0].이름;
            this.docRegist = item[0].주민번호;
            this.docAddr = item[0].주소;
            this.docEmail = item[0].이메일;

            this.requestDoc();
        },
        docSubmit : function() {
            var alt = confirm("정보를 수정 하시겠습니까?");

            if(alt) {
                this.$http.post('/api/doctor/change',{dept_id : this.docdeptNum, major : this.docMajor, rank : this.docRank, address : this.docAddr, email : this.docEmail, doctor_id : this.docNo}).then(response => {
                    if(response.data === 'success') {
                        alert('정보를 수정했습니다');
                        this.doctorModalShow = false;
                    } else {
                        alert('정보를 다시 확인해 주세요');
                    }
                });
            }

        },
        docClose : function() {
            this.doctorModalShow = false;
        },
        requestDoc : function() {
            switch(this.docDept) {
                case '내과' : this.docdeptNum = '101'; break;
                case '일반외과' : this.docdeptNum = '102'; break;
                case '이비인후과' : this.docdeptNum = '103'; break;
                case '영상의학과' : this.docdeptNum = '104'; break;
                case '가정의학과' : this.docdeptNum = '105'; break;
                case '방사선과' : this.docdeptNum = '106'; break;
                case '정형외과' : this.docdeptNum = '107'; break;
                case '병리과' : this.docdeptNum = '108'; break;
                case '응급의학과' : this.docdeptNum = '109'; break;
                case '산부인과' : this.docdeptNum = '201'; break;
                case '마취통증의학과' : this.docdeptNum = '202';
                case '비뇨기과' : this.docdeptNum = '203'; break;
                case '신경과' : this.docdeptNum = '204';  break;
                case '신경외과' : this.docdeptNum = '205'; break;
                case '피부과' : this.docdeptNum = '206'; break;
                case '흉부외과' : this.docdeptNum = '207'; break;
                default : break;
            }

            console.log(this.docdeptNum);
        },
        //간호사 function
        nurseList : function() {
            this.$http.post('/api/nurse/list').then(response => {
                this.doctorShow = false;
                this.nurseShow = true;

                this.nurseListData = [];
                console.log(response)

                var i = 0;
                for(i ; i < response.data.length; i++) { 
                    this.nurseListData.push( {
                        No : response.data[i][0],
                        부서 : response.data[i][1],    
                        직급 : response.data[i][2],
                        이름 : response.data[i][3],
                        주민번호 : response.data[i][4],
                        주소 : response.data[i][5],
                        이메일 : response.data[i][6],
                    });
                }

            })
        },
        requestNur : function() {
            switch(this.nurDept) {
                case '내과' : this.nurdeptNum = '101'; break;
                case '일반외과' : this.nurdeptNum = '102'; break;
                case '이비인후과' : this.nurdeptNum = '103'; break;
                case '영상의학과' : this.nurdeptNum = '104'; break;
                case '가정의학과' : this.nurdeptNum = '105'; break;
                case '방사선과' : this.nurdeptNum = '106'; break;
                case '정형외과' : this.nurdeptNum = '107'; break;
                case '병리과' : this.nurdeptNum = '108'; break;
                case '응급의학과' : this.nurdeptNum = '109'; break;
                case '산부인과' : this.nurdeptNum = '201'; break;
                case '마취통증의학과' : this.nurdeptNum = '202';
                case '비뇨기과' : this.nurdeptNum = '203'; break;
                case '신경과' : this.nurdeptNum = '204';  break;
                case '신경외과' : this.nurdeptNum = '205'; break;
                case '피부과' : this.nurdeptNum = '206'; break;
                case '흉부외과' : this.nurdeptNum = '207'; break;
                default : break;
            }

            console.log(this.docdeptNum);
        },
        onNurseSelected(item) {
            this.nurseModalShow = true;

            this.nurNo = item[0].No;
            this.nurDept = item[0].부서;
            this.nurRank = item[0].직급;
            this.nurName = item[0].이름;
            this.nurRegist = item[0].주민번호;
            this.nurAddr = item[0].주소;
            this.nurEmail = item[0].이메일;

            this.requestNur();

        },
        nurSubmit : function() {
            var alt = confirm("정보를 수정 하시겠습니까?");

            if(alt) {
                this.$http.post('/api/nurse/change',{dept_id : this.nurdeptNum,  rank : this.nurRank, address : this.nurAddr, email : this.nurEmail, nurse_id : this.nurNo}).then(response => {
                    if(response.data === 'success') {
                        alert('정보를 수정했습니다');
                        this.nurseModalShow = false;
                    } else {
                        alert('정보를 다시 확인해 주세요');
                    }
                });
            }
        },
        nurClose : function() {
            this.nurseModalShow = false;
        },
        //employee
        addEmp : function() {
            this.addEmpshow = !this.addEmpshow;
        },
        showMajor : function() {
            if(this.docNurse === '의사') {
                this.ifdoc = true;
            } else {
                this.ifdoc = false;
            }
        },
        requestEmp : function() {
            switch(this.empDept) {
                case '내과' : this.empDeptNum = '101'; break;
                case '일반외과' : this.empDeptNum = '102'; break;
                case '이비인후과' : this.empDeptNum = '103'; break;
                case '영상의학과' : this.empDeptNum = '104'; break;
                case '가정의학과' : this.empDeptNum = '105'; break;
                case '방사선과' : this.empDeptNum = '106'; break;
                case '정형외과' : this.empDeptNum = '107'; break;
                case '병리과' : this.empDeptNum = '108'; break;
                case '응급의학과' : this.empDeptNum = '109'; break;
                case '산부인과' : this.empDeptNum = '201'; break;
                case '마취통증의학과' : this.empDeptNum = '202';
                case '비뇨기과' : this.empDeptNum = '203'; break;
                case '신경과' : this.empDeptNum = '204';  break;
                case '신경외과' : this.empDeptNum = '205'; break;
                case '피부과' : this.empDeptNum = '206'; break;
                case '흉부외과' : this.empDeptNum = '207'; break;
                default : break;
            }
        },
        empSubmit : function() {
            if(this.docNurse === '의사') {
                this.$http.post('/api/doctor/add',{dept_id : this.empDeptNum, major : this.empMajor, rank : this.empRank, doc_name : this.empName, regist_num: this.empRegist, address : this.empAddr, email : this.empEmail}).then(response => {
                    if(response.data === 'success') {
                        alert('등록 완료 했습니다');
                        this.addEmpshow = false;
                    } else {
                        alert('정보를 다시 확인해 주세요');
                    }
                });
            } else if(this.docNurse === '간호사') {
                this.$http.post('/api/nurse/add',{dept_id : this.empDeptNum,  rank : this.empRank, nur_name : this.empName, regist_num: this.empRegist, address : this.empAddr, email : this.empEmail}).then(response => {
                    if(response.data === 'success') {
                        alert('등록 완료 했습니다');
                        this.addEmpshow = false;
                    } else {
                        alert('정보를 다시 확인해 주세요');
                    }
                });
            }
        },
        closeEmp : function() {
            this.addEmpshow = false;
        }


        

    },
}
</script>