import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/Auth/login.vue'
import Layout from '../views/layouts/default-layout.vue'
import Siswa from '../views/Siswa.vue'
import Mapel from '../views/mapel.vue'

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
          path: '/mapel',
          name: 'Mapel',
          component: Mapel,
        },
      ]
    },
  ],
})  

export default router
