<template>
  <aside
    id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-white dark:bg-[#1e1e2f] shadow-md"
    aria-label="Sidebar"
  >
    <div class="h-full px-4 py-6 overflow-y-auto">
      <h2 class="text-xl font-semibold text-gray-700 dark:text-gray-100 mb-6 px-2 tracking-wide">
        Menu Utama
      </h2>
      <ul class="space-y-2 text-sm font-medium">
        <li>
          <router-link
            to="/siswa"
            class="flex items-center gap-3 p-2 rounded-lg text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            active-class="bg-gray-100 dark:bg-gray-800 font-semibold"
          >
            <i class="fas fa-user text-pink-500"></i>
            <span>Siswa</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/guru"
            class="flex items-center gap-3 p-2 rounded-lg text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <i class="fas fa-chalkboard-teacher text-green-500"></i>
            <span>Guru</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/kelas"
            class="flex items-center gap-3 p-2 rounded-lg text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <i class="fas fa-door-open text-yellow-500"></i>
            <span>Kelas</span>
          </router-link>
        </li>
        <li>
          <a
            href="#"
            class="flex items-center gap-3 p-2 rounded-lg text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <i class="fas fa-calendar-check text-indigo-500"></i>
            <span>Absen</span>
          </a>
        </li>
        <li>
          <router-link
            to="/mapel"
            class="flex items-center gap-3 p-2 rounded-lg text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <i class="fas fa-book text-orange-500"></i>
            <span>Mapel</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/jadwal"
            class="flex items-center gap-3 p-2 rounded-lg text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            active-class="bg-gray-100 dark:bg-gray-800 font-semibold"
          >
            <i class="fas fa-clock text-teal-500"></i>
            <span>Jam Pelajaran</span>
          </router-link>
        </li>
        <li class="pt-6">
          <a
            @click="logout"
            class="flex items-center gap-3 p-2 rounded-lg text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-800 transition cursor-pointer"
          >
            <i class="fas fa-sign-out-alt"></i>
            <span>Log out</span>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('user')
  router.push('/')
}
</script>

<style scoped>
/* Optional tambahan styling bisa ditambahkan di sini */
</style>
