<template>
<div id="cont">
    예약 확인 <br/><br/>
    <div id = 'ResrvView'>
        <br/> 
        진료부서 <b-form-select id="deptSelect" v-model="deptSelect" v-on:change='requestDoc'>
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
        </b-form-select>
        
        <br/>
        <br/>
        
        의&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;사 <b-form-select v-model="docSelect" id="docSelect">
            <option disabled value="">의사</option>
            <option v-for="doctorName in doctorNames" v-bind:key = "doctorName">
                {{doctorName}}</option>

        </b-form-select>

        <br />
        <br />
        <b-button variant="primary" v-on:click="submit">검색</b-button>
        
        <br/>
        <br/>

        <b-table striped hover :items="reservLists">
            

        </b-table>
    </div>
</div>
    
</template>

<style>

#ResrvView {
    margin-left : 15%;
    width : 70%;
    border : 1px solid #4d4d4d4b;
}

#deptSelect, #docSelect {
    padding-top: 2px;
    padding-bottom : 5px;
    width:50%;
}

</style>


<script>
export default {
    created () {
        

    },
    data () {
        return {
            deptSelect: '',
            docSelect: '',
            doctorNames: [],
            reservLists : [],

        }
    },
    methods: {
        requestDoc: function() {
            this.$http.post('/api/reservViewDocList', { dept_name : this.deptSelect }).then(response => {
                this.doctorNames = [];
                var i = 0;
                for(i; i < response.data.length; i++) {
                    this.doctorNames.push(response.data[i][0]);
                }
            })
        },
        submit: function() {
            this.reservLists = [];
            this.$http.post('/api/reservView', { doc_name : this.docSelect, dept_name : this.deptSelect}).then(response => {
                console.log(response.data);
                //this.reservLists = response.data;

                var i = 0;
                for(i; i < response.data[i].length; i++) {
                    this.reservLists.push({
                        No : response.data[i][0],
                        Doctor : response.data[i][1],
                        Patient : response.data[i][2],
                        Dept : response.data[i][3],
                        Time : response.data[i][4].substring(0, 10) + '  ' + response.data[i][4].substring(11, 16),
                    })
                }

                console.log(response.data[0])
                console.log(this.reservLists);


            })

        }

    }
}
</script>