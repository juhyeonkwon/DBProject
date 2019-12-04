<template>
  <div id="app">
    <div class="menu">
      <i class="xi-bars xi-2x" id="menubar"></i>  
      <ul>
      <li><a href=".#/Main"><i class="xi-home-o xi-2x"></i>Home</a></li>
      <li><a href=".#/RegistPatient"><i class="xi-user-plus-o xi-2x"></i>환자등록</a></li>
      <li><a href=".#/PatientList"><i class="xi-users-o xi-2x"></i>환자목록</a></li>
      <li><a href=".#/Reservation"><i class="xi-time-o xi-2x"></i>예약</a></li>
      <li><a href=".#/ReservationView"><i class="xi-calendar-check xi-2x"></i>예약확인</a></li>
      <li><a href=".#/Chart"><i class="xi-pen-o xi-2x"></i>차트작성</a></li>
      <li><a href=".#/viewChart"><i class="xi-book-o xi-2x"></i>차트목록</a></li>
      <li><a href=".#/Hospitalization"><i class="xi-medicine xi-2x"></i>입원등록</a></li>
      <li><a href=".#/HospitalizationView"><i class="xi-hotel xi-2x"></i>입원목록</a></li>
      <li><a href=".#/Operating_room"><i class="xi-hospital xi-2x"></i>수술실정보</a></li>
      <li><a href=".#/Employee"><i class="xi-group xi-2x"></i>직원 관리</a></li>
    </ul>
    </div>
       <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

#menubar {
  display : none;
}

.menu {
    margin-bottom: 15px;
    background-color: #2a98e9;
    border: 1px solid #2a98e9;
}

ul {
  width: 90%;
  list-style-type: none;
  margin: 0 auto;
  padding: 0;
  overflow: hidden;
  background-color: #2a98e9;
}

li {
  float: left;
}

li a {
  display: block;
  color: #fff;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  transition: background-color 100ms ease, box-shadow 150ms ease;
                transition-timing-function: cubic-bezier(0.57, 0.21, 0.69, 3.25);
}

li a:hover {
    background: #fff;
    color: #2a98e9;
  text-decoration: none;

}

@media screen and (max-width: 480px) {
        #menubar {
          display : block;
          background-color: #2a98e9;
          color: #fff;
        }
        .menu {
            margin-bottom: 15px;
            background-color: #2a98e9;
            border: 1px solid #2a98e9;
        }

        ul {
          width: 80%;
          list-style-type: none;
          margin: 0 auto;
          padding: 0;
          overflow: hidden;
          background-color: #2a98e9;

        }

        li {
          display: none;
          width : 100%
        }

        li a {
          display: block;
          color: #fff;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
          transition: background-color 100ms ease, box-shadow 150ms ease;
                        transition-timing-function: cubic-bezier(0.57, 0.21, 0.69, 3.25);
        }

        li a:hover {
            background: #fff;
            color: #2a98e9;
          text-decoration: none;
        }

        .menu:hover li {
          display: block;          
        }
}


</style>
<style src="./assets/XEIcon-2.2.0/xeicon.min.css">
</style>