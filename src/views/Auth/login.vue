<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 overflow-hidden relative p-4"
  >
    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        v-for="i in 15"
        :key="i"
        class="absolute rounded-full bg-white/5 backdrop-blur-sm"
        :class="`bubble-${i}`"
      ></div>
    </div>

    <!-- Glassmorphic Card -->
    <div
      ref="card"
      class="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-white/20 group"
    >
      <!-- Card glow effect -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      ></div>

      <!-- Card inner glow -->
      <div class="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none"></div>

      <!-- Card content -->
      <div class="p-8 relative z-10">
        <!-- Animated logo with gradient -->
        <div class="flex justify-center mb-6">
          <div class="relative">
            <div
              class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-md opacity-60 animate-pulse"
            ></div>
            <div
              class="relative bg-gradient-to-br from-gray-900 to-gray-800 p-3 rounded-full shadow-xl border border-white/10 flex items-center justify-center w-16 h-16"
            >
              <svg
                class="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 11c0 1.104-.896 2-2 2s-2-.896-2-2 2-2 2-2 2 .896 2 2zm6 0c0 1.104-.896 2-2 2s-2-.896-2-2 2-2 2-2 2 .896 2 2zm-3 8h-6a4 4 0 01-4-4v-2a4 4 0 014-4h6a4 4 0 014 4v2a4 4 0 01-4 4z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- Animated title -->
        <h2 class="text-3xl font-bold text-center text-white mb-2">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-300"
            >Welcome Back</span
          >
        </h2>
        <p class="text-center text-white/60 mb-8">Sign in to access your dashboard</p>

        <!-- Form with floating labels -->
        <form @submit.prevent="login" class="space-y-6">
          <div class="relative">
            <input
              v-model="username"
              id="username"
              type="text"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:border-white/30 focus:ring-2 focus:ring-white/20 outline-none transition-all duration-300 peer"
              placeholder=" "
              @focus="focusInput('username')"
              @blur="blurInput('username')"
            />
            <label
              for="username"
              class="absolute left-3 -top-2.5 px-1.5 text-xs text-white/80 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/50 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-white/80"
            >
              Username
            </label>
            <div
              class="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500 peer-focus:w-full"
            ></div>
          </div>

          <div class="relative">
            <input
              v-model="password"
              id="password"
              type="password"
              class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-transparent focus:border-white/30 focus:ring-2 focus:ring-white/20 outline-none transition-all duration-300 peer"
              placeholder=" "
              @focus="focusInput('password')"
              @blur="blurInput('password')"
            />
            <label
              for="password"
              class="absolute left-3 -top-2.5 px-1.5 text-xs text-white/80 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-white/50 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-white/80"
            >
              Password
            </label>
            <div
              class="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500 peer-focus:w-full"
            ></div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                class="h-4 w-4 rounded border-white/20 bg-white/5 checked:bg-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
              />
              <label for="remember-me" class="ml-2 text-sm text-white/70">Remember me</label>
            </div>
            <a href="#" class="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >Forgot password?</a
            >
          </div>

          <button
            type="submit"
            class="w-full relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 group"
            :disabled="loading"
          >
            <span class="relative z-10 flex items-center justify-center">
              <span v-if="!loading">Sign In</span>
              <span v-else class="flex items-center">
                <svg
                  class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing in...
              </span>
            </span>
            <span
              class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></span>
          </button>
        </form>

        <div
          v-if="error"
          class="mt-4 p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-200 text-sm flex items-center animate-shake"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {{ error }}
        </div>

        <div class="mt-6 text-center text-sm text-white/50">
          Don't have an account?
          <a href="#" class="text-blue-400 hover:text-blue-300 transition-colors">Sign up</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const card = ref(null)

const users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'user', password: 'user123', role: 'user' },
  { username: ' ', password: ' ', role: 'user' },
]

function login() {
  loading.value = true
  error.value = ''

  // Simulate API call
  setTimeout(() => {
    const found = users.find((u) => u.username === username.value && u.password === password.value)
    if (found) {
      // Success animation
      gsap.to(card.value, {
        scale: 0.95,
        opacity: 0,
        duration: 0.5,
        onComplete: () => router.push('/siswa'),
      })

      // Particle explosion effect
      for (let i = 1; i <= 20; i++) {
        const particle = document.createElement('div')
        particle.className = 'absolute rounded-full bg-white pointer-events-none'
        particle.style.width = `${Math.random() * 10 + 5}px`
        particle.style.height = particle.style.width
        particle.style.left = '50%'
        particle.style.top = '50%'
        card.value.appendChild(particle)

        gsap.to(particle, {
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          opacity: 0,
          scale: Math.random() + 0.5,
          duration: 1,
          onComplete: () => particle.remove(),
        })
      }
    } else {
      error.value = 'Invalid username or password'
      // Error shake animation
      gsap.to(card.value, {
        x: -10,
        duration: 0.1,
        repeat: 5,
        yoyo: true,
        ease: 'power1.inOut',
      })
    }
    loading.value = false
  }, 1500)
}

function focusInput(field) {
  gsap.to(`#${field}`, {
    y: -2,
    duration: 0.2,
  })
}

function blurInput(field) {
  gsap.to(`#${field}`, {
    y: 0,
    duration: 0.2,
  })
}

onMounted(() => {
  // Background bubbles animation
  for (let i = 1; i <= 15; i++) {
    gsap.to(`.bubble-${i}`, {
      x: Math.random() * 400 - 200,
      y: Math.random() * 400 - 200,
      width: Math.random() * 300 + 100,
      height: Math.random() * 300 + 100,
      duration: Math.random() * 30 + 20,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }

  // Card entry animation
  gsap.from(card.value, {
    y: 80,
    opacity: 0,
    scale: 0.9,
    duration: 1.2,
    ease: 'elastic.out(1, 0.5)',
  })

  // Floating label initialization
  if (username.value) {
    document
      .querySelector('label[for="username"]')
      .classList.remove(
        'peer-placeholder-shown:top-3',
        'peer-placeholder-shown:text-sm',
        'peer-placeholder-shown:text-white/50',
      )
  }
  if (password.value) {
    document
      .querySelector('label[for="password"]')
      .classList.remove(
        'peer-placeholder-shown:top-3',
        'peer-placeholder-shown:text-sm',
        'peer-placeholder-shown:text-white/50',
      )
  }
})
</script>

<style scoped>
/* Bubble base styles */
.bubble-1,
.bubble-2,
.bubble-3,
.bubble-4,
.bubble-5,
.bubble-6,
.bubble-7,
.bubble-8,
.bubble-9,
.bubble-10,
.bubble-11,
.bubble-12,
.bubble-13,
.bubble-14,
.bubble-15 {
  filter: blur(40px);
}

/* Shake animation for error */
@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-5px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(5px);
  }
}

.animate-shake {
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
