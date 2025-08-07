<template>
  <aside
    id="default-sidebar"
    class="mt-16 fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 dark:bg-gradient-to-br from-gray-900 via-[#1e1e2f] to-black shadow-[0_0_8px_rgba(76,29,149,0.5)] dark:shadow-[0_0_20px_rgba(76,29,149,0.5)] dark:border-r dark:border-purple-900"
    aria-label="Sidebar"
  >
    <div class="h-full px-4 py-6 overflow-y-auto">
      <ul class="space-y-3 text-sm font-medium">
        <li>
          <router-link
            to="/siswa"
            class="flex items-center gap-3 p-2 rounded-xl text-gray-900 dark:text-gray-200 hover:bg-purple-900/50 hover:text-white transition-all duration-300 group"
            active-class="bg-purple-800/70 text-white font-extrabold"
          >
            <i class="fas fa-user text-pink-500 text-glow group-hover:scale-110"></i>
            <span>Siswa</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/guru"
            class="flex items-center gap-3 p-2 rounded-xl text-gray-900 dark:text-gray-200 hover:bg-green-900/50 hover:text-white transition-all duration-300 group"
            active-class="bg-green-800/70 text-white font-extrabold"
          >
            <i class="fas fa-chalkboard-teacher text-green-500 text-glow group-hover:scale-110"></i>
            <span>Guru</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/kelas"
            class="flex items-center gap-3 p-2 rounded-xl text-gray-900 dark:text-gray-200 hover:bg-yellow-900/50 hover:text-white transition-all duration-300 group"
            active-class="bg-yellow-800/70 text-white font-extrabold"
          >
            <i class="fas fa-door-open text-yellow-500 text-glow group-hover:scale-110"></i>
            <span>Kelas</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/absen"
            class="flex items-center gap-3 p-2 rounded-xl text-gray-900 dark:text-gray-200 hover:bg-indigo-900/50 hover:text-white transition-all duration-300 group"
            active-class="bg-indigo-800/70 text-white font-extrabold"
          >
            <i class="fas fa-calendar-check text-indigo-500 text-glow group-hover:scale-110"></i>
            <span>Absen</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/mapel"
            class="flex items-center gap-3 p-2 rounded-xl text-gray-900 dark:text-gray-200 hover:bg-teal-900/50 hover:text-white transition-all duration-300 group"
            active-class="bg-orange-800/70 text-white font-extrabold"
          >
            <i class="fas fa-book text-teal-500 text-glow group-hover:scale-110"></i>
            <span>Mapel</span>
          </router-link>
        </li>
        <li>
          <router-link
            to="/jadwal"
            class="flex items-center gap-3 p-2 rounded-xl text-gray-900 dark:text-gray-200 hover:bg-orange-900/50 hover:text-white transition-all duration-300 group"
            active-class="bg-teal-800/70 text-white font-extrabold"
          >
            <i class="fas fa-clock text-orange-500 text-glow group-hover:scale-110"></i>
            <span>Jam Pelajaran</span>
          </router-link>
        </li>
        
        <li class="mt-6">
          <button
            @click="toggleTheme"
            class="w-full flex items-center gap-3 p-2 rounded-xl text-gray-900 dark:text-gray-200 hover:bg-gray-800/50 hover:text-blue-300 transition-all duration-300 group"
          >
            <i class="fas fa-adjust text-blue-500 text-glow group-hover:scale-110"></i>
            <span>{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
          </button>
        </li>
          <!-- Tombol Reset -->
          <li>
          <a
            @click="konfirmasiReset"
            class="flex items-center gap-3 p-2 rounded-xl text-red-600 hover:bg-red-900/50 hover:text-white transition-all duration-300 group cursor-pointer"
          >
            <i class="ri-refresh-line text-lg text-glow group-hover:scale-110"></i>
            <span>Reset Semua Data</span>
          </a>
        </li>
        <li>
          <a
            @click="logout"
            class="flex items-center gap-3 p-2 rounded-xl text-red-600 hover:bg-red-900/50 hover:text-white transition-all duration-300 group cursor-pointer"
          >
            <i class="fas fa-sign-out-alt text-glow group-hover:scale-110"></i>
            <span>Log out</span>
          </a>
        </li>
        <li>
          <button
            @click="toggleAudio"
            class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 mt-4 shadow-[0_0_10px_rgba(59,130,246,0.7)]"
          >
            🎵 {{ audioState.paused ? 'Play' : 'Pause' }} Musik
          </button>
          <audio ref="audioRef" id="bgm" loop>
            <source
              src="../assets/Budi DoReMi - 123456 (Official Music Video) [9eV1zEAPQK4].mp3"
              type="audio/mpeg"
            />
          </audio>
        </li>
        
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { ref, onMounted } from 'vue'
import useStorageReset from '@/composables/useStorageReset'

const { resetAllData } = useStorageReset()

const isDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)
const router = useRouter()
const audioRef = ref(null)
const audioState = ref({ paused: true })
const notifications = ref({ siswa: 5, guru: 10 })

function toggleAudio() {
  if (audioRef.value) {
    if (audioRef.value.paused) {
      audioRef.value.play().catch((err) => {
        console.warn('Gagal memutar audio:', err)
      })
      audioState.value.paused = false
    } else {
      audioRef.value.pause()
      audioState.value.paused = true
    }
  }
}

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

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
    background: isDark.value ? '#1e1e2f' : '#ffffff',
    color: isDark.value ? '#f1f5f9' : '#1f2937',
    iconColor: isDark.value ? '#facc15' : '#f59e0b',
    showClass: {
      popup: 'animate__animated animate__zoomIn',
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp',
    },
    customClass: {
      popup: 'rounded-xl shadow-lg',
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
        background: isDark.value ? '#1e1e2f' : '#ffffff',
        color: isDark.value ? '#f1f5f9' : '#1f2937',
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

async function konfirmasiReset() {
  const result = await Swal.fire({
    title: 'Reset Semua Data?',
    text: 'Semua data lokal akan dikembalikan ke data awal (JSON). Lanjutkan?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e11d48',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Ya, Reset!',
    cancelButtonText: 'Batal',
  })

  if (result.isConfirmed) {
    resetAllData()
    Swal.fire({
      title: 'Berhasil!',
      text: 'Semua data telah direset.',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    })

    // Refresh halaman
    window.location.reload()
  }
}


onMounted(() => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  }
  if (audioRef.value) {
    audioState.value.paused = audioRef.value.paused
  }
})
</script>

<style scoped>
/* Futuristic glowing styling */
#default-sidebar {
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

button:hover i {
  color: white;
}

.text-glow {
  text-shadow:
    0 0 10px rgba(255, 255, 255, 0.3),
    0 0 20px rgba(255, 255, 255, 0.2);
}

.router-link-active {
  position: relative;
}

.router-link-active::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #4c1d95, #d946ef);
  top: 0;
  left: 0;
  border-radius: 0 4px 4px 0;
  animation: glow 1.5s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    box-shadow: 0 0 5px #4c1d95;
  }
  to {
    box-shadow: 0 0 15px #d946ef;
  }
}

.group:hover .text-glow {
  text-shadow:
    0 0 15px rgba(255, 255, 255, 0.5),
    0 0 30px rgba(255, 255, 255, 0.3);
}

.animate-bounce {
  animation: bounce 0.5s infinite alternate;
}

@keyframes bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-5px);
  }
}
</style>
