<template>
  <aside
    id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-white border-r border-gray-200 shadow-md"
    aria-label="Sidebar"
  >
    <div class="h-full px-3 py-6 overflow-y-auto bg-white flex flex-col justify-between">
      <!-- Menu atas -->
      <div>
        <h2 class="text-xl font-bold text-center mb-6 text-blue-600">Sistem Pendaftaran</h2>
        <ul class="space-y-2">
          <li>
            <router-link
              to="/siswa"
              class="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition"
            >
              <span>Siswa</span>
            </router-link>
            <router-link
              to="/absen"
              class="flex items-center p-2 text-gray-700 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition"
            >
              <span>Absen</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- Tombol Logout -->
      <div class="mt-3">
        <button
          @click="logout"
          class="flex items-center w-full p-2 text-red-600 border border-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
        >
          <i class="ri-logout-box-r-line text-lg me-2"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  // Kosongkan token/akun (jika pakai session/localStorage)
  localStorage.removeItem('user')
  router.push('/')
}
</script>

<style scoped>
/* Styling opsional */
</style>
