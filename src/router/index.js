import Vue from 'vue'
import VueRouter from 'vue-router'
import BoardList from '../components/BoardList.vue'
import BoardForm from '../components/BoardForm.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/list'
    },
    {
      path: '/list',
      name: 'BoardList',
      component: BoardList
    },
    {
      path: '/form/:id',
      name: 'BoardForm',
      component: BoardForm,
    }
  ]
})

export default router
