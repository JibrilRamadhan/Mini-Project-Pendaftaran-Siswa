<template>
  <aside
    id="default-sidebar"
    class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 bg-white dark:bg-[#1e1e2f] shadow-md"
    aria-label="Sidebar"
  >
    <div class="h-full px-4 py-6 overflow-y-auto">
      <h2 class="text-xl font-semibold text-white dark:text-gray-800 mb-6 px-2 tracking-wide">
        Menu Utama
      </h2>
      <ul class="space-y-2 text-sm font-medium mt-8">
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
          <router-link
            to="/absen"
            class="flex items-center gap-3 p-2 rounded-lg text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <i class="fas fa-calendar-check text-indigo-500"></i>
            <span>Absen</span>
          </router-link>
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
import Swal from 'sweetalert2'

const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
const router = useRouter()

const logout = () => {
  Swal.fire({
    title: 'Yakin ingin logout?',
    text: 'Sesi kamu akan diakhiri.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e3342f',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Ya, Logout',
    cancelButtonText: 'Batal',
    background: isDark ? '#1e1e2f' : '#ffffff',
    color: isDark ? '#f1f5f9' : '#1f2937',
    iconColor: isDark ? '#facc15' : '#f59e0b',
    showClass: {
      popup: 'animate__animated animate__zoomIn',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
    },
    customClass: {
      popup: 'rounded-xl shadow-md',
      confirmButton: 'px-4 py-2 text-sm',
      cancelButton: 'px-4 py-2 text-sm',
    },
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('user')
      Swal.fire({
        title: 'Logout berhasil!',
        text: 'Sampai jumpa 👋',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: isDark ? '#1e1e2f' : '#ffffff',
        color: isDark ? '#f1f5f9' : '#1f2937',
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp',
        },
      }).then(() => {
        router.push('/')
      })
    }
  })
}
</script>

<style scoped>
/* Optional tambahan styling bisa ditambahkan di sini */
</style>
