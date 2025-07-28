<template>
  <aside
    class="fixed top-0 left-0 z-40 w-64 h-screen bg-white border-r border-gray-200 shadow transition-transform -translate-x-full sm:translate-x-0"
    aria-label="Sidebar"
  >
    <div class="flex flex-col h-full justify-between">
      <!-- 🔷 Judul Sistem -->
      <div>
        <div class="py-6 px-6 bg-blue-50 rounded-br-3xl">
          <h2 class="text-xl font-bold text-blue-700 text-center tracking-wide">
            Sistem Pendaftaran
          </h2>
        </div>

        <!-- 🔻 Batas Visual -->
        <div class="border-b border-gray-300 mx-6 mt-4 mb-2"></div>

        <!-- 📁 Menu Navigasi -->
        <ul class="space-y-2 px-6 mt-4">
          <li>
            <router-link
              to="/siswa"
              class="flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
              :class="{ 'bg-blue-100 text-blue-700': $route.path === '/siswa' }"
            >
              <i class="ri-user-line text-lg"></i>
              <span>Siswa</span>
            </router-link>
          </li>

          <li>
            <router-link
              to="/mapel"
              class="flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
              :class="{ 'bg-blue-100 text-blue-700': $route.path === '/mapel' }"
            >
              <i class="ri-book-2-line text-lg"></i>
              <span>Mapel</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 🚪 Logout -->
      <div class="px-6 py-6">
        <button
          @click="showModal = true"
          class="flex items-center justify-center w-full gap-2 px-4 py-2 text-red-700 border border-red-600 rounded-lg hover:bg-red-100 hover:text-red-700 transition"
        >
          <i class="ri-logout-box-line text-lg"></i>
          <span class="text-base font-semibold">Logout</span>
        </button>
      </div>
    </div>
  </aside>

  <!-- 🔔 Modal Logout -->
  <div
    v-if="showModal"
    class="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-2xl shadow-xl w-[90%] max-w-md p-6">
      <h3 class="text-xl font-bold text-gray-800 mb-4 text-center">
        Konfirmasi Logout
      </h3>
      <p class="text-gray-600 text-center mb-6">
        Apakah kamu yakin ingin keluar dari sistem?
      </p>
      <div class="flex justify-center gap-4">
        <button
          @click="logout"
          class="bg-red-700 text-white px-6 py-2 rounded-xl hover:bg-red-800 transition"
        >
          Ya, Logout
        </button>
        <button
          @click="showModal = false"
          class="border border-gray-300 px-6 py-2 rounded-xl hover:bg-gray-100 transition text-gray-700"
        >
          Batal
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showModal = ref(false)

const logout = () => {
  localStorage.removeItem('user')
  router.push('/')
}
</script>
