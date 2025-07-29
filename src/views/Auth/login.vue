<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-blue-100">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-2">Masuk</h2>
      <p class="text-sm text-center text-gray-500 mb-6">Silakan login untuk melanjutkan</p>

      <form @submit.prevent="login" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            v-model="username"
            type="text"
            placeholder="Masukkan username"
            class="w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Masukkan password"
            class="w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p v-if="error" class="text-sm text-center text-red-500 mt-1">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')

const users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'user', password: 'user123', role: 'user' },
]

function login() {
  const found = users.find((u) => u.username === username.value && u.password === password.value)
  if (found) {
    router.push('/siswa')
  } else {
    error.value = 'Username atau password salah'
  }
}

watch([username, password], () => {
  error.value = ''
})
</script>
