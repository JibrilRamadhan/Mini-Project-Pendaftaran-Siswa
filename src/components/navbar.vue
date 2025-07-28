<template>
  <header
    class="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700"
  >
    <div
      class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
    >
      <div class="flex items-center gap-3">
        <img src="../assets/logo.svg" alt="Logo" class="h-8 w-8" />
        <h1 class="text-lg font-semibold text-gray-800 dark:text-white">Pendaftaran Siswa</h1>
      </div>
      <div class="flex items-center gap-4">
        <!-- Mode Gelap -->
        <button
          @click="toggleDark"
          class="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition"
        >
          <i class="ri-moon-line text-xl"></i>
        </button>

        <!-- User -->
        <div class="relative group">
          <button
            class="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-white focus:outline-none"
          >
            <i class="ri-user-line text-xl"></i>
            <span>User</span>
          </button>
          <!-- Dropdown Placeholder -->
          <div
            class="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg p-2 text-sm hidden group-hover:block"
          >
            <a
              href="#"
              class="block px-3 py-1 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >Profil</a
            >
            <a
              @click="logout"
              class="block px-3 py-1 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >Keluar</a
            >
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

  const router = useRouter()

  const logout = () => {
    localStorage.removeItem('user')
    router.push('/')
  }

const toggleDark = () => {
  document.documentElement.classList.toggle('dark')
}

</script>
