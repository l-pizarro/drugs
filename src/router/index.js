import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '../views/Test.vue'
import Medicine from '../views/Medicine.vue'
import Alert from '../views/Alert.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'medicine',
    component: Medicine
  },
  {
    path: '/alertas',
    name: 'alert',
    component: Alert
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
]

const router = new VueRouter({
  routes
})

export default router
