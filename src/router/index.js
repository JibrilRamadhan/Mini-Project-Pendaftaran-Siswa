import { createRouter, createWebHistory } from 'vue-router'
import login from '../views/Auth/login.vue'
import Layout from '../views/layouts/default-layout.vue'
import Siswa from '../views/siswa.vue'
import Jam_pelajaran from '../views/jam_pelajaran.vue'
import Kelas from '../views/kelas.vue'
import Guru from '../views/Guru.vue'
import Mapel from '../views/mapel.vue'
import Absen from '../views/absen.vue'

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
      children: [
        {
          path: '/siswa',
          name: 'Siswa',
          component: Siswa,
        },
        {
          path: '/jadwal',
          name: 'Jadwal',
          component: Jam_pelajaran,
        },
        {
          path: '/kelas',
          name: 'Kelas',
          component: Kelas,
        },
        {
          path: '/guru',
          name: 'Guru',
          component: Guru,
        },
        {
          path: '/mapel',
          name: 'Mapel',
          component: Mapel,
        },
        {
          path: '/absen',
          name: 'Absen',
          component: Absen,
        },
      ],
    },
  ],
})

export default router
