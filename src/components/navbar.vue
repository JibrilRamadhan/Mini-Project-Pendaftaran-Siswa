```vue
<template>
  <header
    class="sticky top-0 z-50  dark:from-gray-900 dark:to-gray-800 backdrop-blur-md bg-opacity-80 shadow-lg border-b border-gray-200/50 dark:border-gray-800/50 transition-all duration-500"
  >
    <div
      class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
    >
      <!-- Logo & Judul -->
      <div class="flex items-center gap-4">
        <div class="flex gap-3 items-center">
          <img
            src="../components/icons/claude.png"
            alt="Claude Logo"
            class="h-11 w-11  p-1 transform hover:scale-110 hover:rotate-12 transition-all duration-300"
          />
          <img
            src="../components/icons/deepseek.svg"
            alt="Deepseek Logo"
            class="h-11 w-11  p-1 transform hover:scale-110 hover:-rotate-12 transition-all duration-300"
          />
          <img
            src="../components/icons/gpt-removebg-preview.png"
            alt="GPT Logo"
            class="h-11 w-11  p-1 dark:hidden transform hover:scale-110 hover:rotate-12 transition-all duration-300"
          />
          <img
            src="../components/icons/logogpt23-removebg-preview.png"
            alt="GPT Dark Logo"
            class="h-12 w-10 p-1 hidden dark:block transform hover:scale-110 hover:-rotate-12 transition-all duration-300"
          />
        </div>
        <h1
          class="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 tracking-tight animate-pulse-subtle"
        >
          Pendaftaran Siswa
        </h1>
      </div>

      <!-- Aksi Kanan (Desktop) -->
      <div class="hidden md:flex items-center gap-6">
        <!-- Toggle Dark Mode -->
        <button
          @click="toggleDark"
          class="relative group text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 p-2 rounded-full hover:bg-white/30 dark:hover:bg-gray-700/30 backdrop-blur-sm"
          title="Toggle Dark Mode"
        >
          <i
            class="ri-moon-line text-2xl group-hover:scale-125 transition-transform duration-300"
          ></i>
          <span
            class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            Dark Mode
          </span>
        </button>

        <!-- User Dropdown -->
        <div class="relative" ref="dropdownRef">
          <button
            @click="toggleDropdown"
            class="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 bg-white/20 dark:bg-gray-700/20 backdrop-blur-sm rounded-lg px-3 py-2"
          >
            <i class="ri-user-line text-xl"></i>
            <span class="hidden lg:inline">User</span>
            <i
              class="ri-arrow-down-s-line text-lg transition-transform duration-300"
              :class="{ 'rotate-180': isDropdownOpen }"
            ></i>
          </button>
          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-3 w-52 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-2xl p-3 transform origin-top-right transition-all duration-300 scale-95 opacity-0"
            :class="{ 'scale-100 opacity-100': isDropdownOpen }"
          >
            <a
              href="#"
              class="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-100/50 dark:hover:bg-blue-900/50 rounded-lg transition-all duration-200"
            >
              <i class="ri-profile-line"></i>
              Profil
            </a>
            <a
              @click="logout"
              class="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-100/50 dark:hover:bg-red-900/50 rounded-lg transition-all duration-200 cursor-pointer"
            >
              <i class="ri-logout-box-line"></i>
              Keluar
            </a>
          </div>
        </div>
      </div>

      <!-- Hamburger Menu (Mobile) -->
      <button
        class="md:hidden text-gray-600 dark:text-gray-300 p-2 rounded-full hover:bg-white/30 dark:hover:bg-gray-700/30 transition-colors duration-200"
        @click="toggleMobileMenu"
      >
        <i
          class="ri-menu-line text-2xl"
          :class="{ 'ri-close-line': isMobileMenuOpen }"
        ></i>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-800/50 px-4 py-4 transition-all duration-300"
    >
      <div class="flex flex-col gap-2">
        <button
          @click="toggleDark"
          class="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-100/50 dark:hover:bg-blue-900/50 rounded-lg transition-all duration-200"
        >
          <i class="ri-moon-line text-xl"></i>
          Toggle Dark Mode
        </button>
        <a
          href="#"
          class="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-blue-100/50 dark:hover:bg-blue-900/50 rounded-lg transition-all duration-200"
        >
          <i class="ri-profile-line text-xl"></i>
          Profil
        </a>
        <a
          @click="logout"
          class="flex items-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-100/50 dark:hover:bg-red-900/50 rounded-lg transition-all duration-200 cursor-pointer"
        >
          <i class="ri-logout-box-line text-xl"></i>
          Keluar
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'

const router = useRouter()
const isDropdownOpen = ref(false)
const isMobileMenuOpen = ref(false)
const dropdownRef = ref(null)

// Toggle dropdown
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
  if (isDropdownOpen.value) isMobileMenuOpen.value = false
}

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  if (isMobileMenuOpen.value) isDropdownOpen.value = false
}

// Close dropdown when clicking outside
onClickOutside(dropdownRef, () => {
  isDropdownOpen.value = false
})

const logout = () => {
  localStorage.removeItem('user')
  router.push('/')
  isMobileMenuOpen.value = false
  isDropdownOpen.value = false
}

const toggleDark = () => {
  document.documentElement.classList.toggle('dark')
}
</script>

<style scoped>
/* Subtle pulse animation for title */
@keyframes pulse-subtle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.9;
  }
}
.animate-pulse-subtle {
  animation: pulse-subtle 2s ease-in-out infinite;
}

/* Smooth dropdown animation */
.scale-95 {
  transform: scale(0.95);
}
.scale-100 {
  transform: scale(1);
}
.opacity-0 {
  opacity: 0;
}
.opacity-100 {
  opacity: 100;
}
</style>
```