import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateEQR from '../views/CreateEQR.vue'
import SuccessEQR from '../views/SuccessEQR.vue'
import EmergencyEQR from '../views/EmergencyEQR.vue'
import CreateQRForResidents from '../views/CreateQRForResidents.vue'
import CreateQRForResidentscopy from '../views/CreateQRForResidentscopy.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create',
    name: 'CreateEQR',
    component: CreateEQR
  },
  {
    path: '/success/:id',
    name: 'SuccessEQR',
    component: SuccessEQR
  },
  {
    path: '/emergency/:id',
    name: 'EmergencyEQR',
    component: EmergencyEQR
  },
  {
    path: '/createqrforresidents',
    name: 'CreateQRForResidents',
    component: CreateQRForResidents
  },
  {
    path: '/createqrforresidentscopy',
    name: 'CreateQRForResidentscopy',
    component: CreateQRForResidentscopy
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
