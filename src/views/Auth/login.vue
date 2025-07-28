<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-6 rounded shadow-md w-80">
      <h2 class="text-xl font-semibold mb-4 text-center">Login</h2>
      <form @submit.prevent="login">
        <input
          v-model="username"
          placeholder="Username"
          class="mb-3 w-full px-3 py-2 border rounded"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="mb-3 w-full px-3 py-2 border rounded"
        />
        <button class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Login
        </button>
        <p v-if="error" class="text-red-500 mt-2 text-sm text-center">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router' // ⬅️ Tambahkan ini

const router = useRouter() // ⬅️ Inisialisasi router
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
    // ⬅️ Redirect ke dashboard setelah login berhasil
    router.push('/guru')
  } else {
    error.value = 'Username atau password salah'
  }
}

// Reset error saat mengetik ulang
watch([username, password], () => {
  error.value = ''
})
</script>
