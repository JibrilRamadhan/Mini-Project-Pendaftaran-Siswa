<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-6">
    <div class="bg-white p-14 rounded-3xl shadow-xl w-full max-w-2xl">
      <h2 class="text-4xl font-bold mb-10 text-center text-gray-800">
        Login
      </h2>

      <form @submit.prevent="login" class="space-y-8">
        <!-- Username -->
        <div>
          <label class="block mb-2 text-lg text-gray-700">Username</label>
          <input
            v-model="username"
            type="text"
            placeholder="Masukkan username kamu"
            class="w-full px-5 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block mb-2 text-lg text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            placeholder="Masukkan password"
            class="w-full px-5 py-4 border border-gray-300 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <!-- Tombol Login -->
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-4 text-lg rounded-xl font-semibold hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>

        <!-- Pesan Error -->
        <p v-if="error" class="text-red-600 mt-4 text-center text-base font-medium">
          {{ error }}
        </p>
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

// Data pengguna
const users = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'user', password: 'user123', role: 'user' }
]

// Fungsi login
function login() {
  const found = users.find(
    (u) => u.username === username.value && u.password === password.value
  )

  if (found) {
    router.push('/siswa') // Ganti sesuai tujuan halaman
  } else {
    error.value = 'Username atau password salah'
  }
}

// Hapus error saat user mengetik ulang
watch([username, password], () => {
  error.value = ''
})
</script>
