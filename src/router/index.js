import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/Auth/login.vue'
import Layout from '../views/layouts/default-layout.vue'
import Siswa from '../views/Siswa.vue'
import Absen from '../views/Absen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: login,
    },
    {
      path: '/layout',
      name: 'Layout',
      component: Layout,
      children : [
        {
          path: '/siswa',
          name: 'Siswa',
          component: Siswa,
        },
        {
          path: '/absen',
          name: 'Absen',
          component: Absen,
        }
      ]
    },
  ],
})  

export default router
