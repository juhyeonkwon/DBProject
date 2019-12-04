import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Reservation from '@/components/Reservation'
import ReservationView from '@/components/ReservationView'
import FindDocNumModal from '@/components/FindDocNumModal'
import RegistPatient from '@/components/RegistPatient'
import PatientList from '@/components/PatientList'
import Chart from '@/components/Chart'
import ViewChart from '@/components/viewChart'
import Hospitalization from '@/components/Hospitalization'
import HospitalizationView from '@/components/HospitalizationView';
import Operating_room from '@/components/Operating_room';
import Employee from '@/components/Employee';
import Main from '@/components/Main';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/db',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Reservation',
      name: 'Reservation',
      component: Reservation
    },
    {
      path: '/ReservationView',
      name: 'ReservationView',
      component: ReservationView
    },
    {
      path: '/FindDocNumModal',
      name: 'FindDocNumModal',
      component: FindDocNumModal
    },
    {
      path: '/RegistPatient',
      name: 'RegistPatient',
      component: RegistPatient
    },
    {
      path: '/PatientList',
      name: 'PatientList',
      component: PatientList
    },
    {
      path: '/Chart',
      name: 'Chart',
      component: Chart
    },
    {
      path: '/ViewChart',
      name: 'ViewChart',
      component: ViewChart
    },
    {
      path: '/Hospitalization',
      name: 'Hospitalization',
      component: Hospitalization
    },
    {
      path: '/HospitalizationView',
      name: 'HospitalizationView',
      component: HospitalizationView
    },
    {
      path: '/Operating_room',
      name: 'Operating_room',
      component: Operating_room
    },
    {
      path: '/Employee',
      name: 'Employee',
      component: Employee
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main
    },
  ]
})
