<template>
  <div class="min-h-screen flex flex-col">
    <Navbar :currentUser="user" @toggleSidebar="toggleSidebar" />
    <div class="flex flex-1">
      <Sidebar v-if="showSidebar" />
      <main class="flex-1 bg-white dark:bg-gray-900 p-1 ml-0 md:ml-64">
        <router-view />
      </main>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '@/components/navbar.vue'
import Sidebar from '@/components/sidebar.vue'
import Footer from '@/components/footer.vue'
import { ref, onMounted } from 'vue'

const showSidebar = ref(true)
const user = ref(null)

function toggleSidebar() {
  showSidebar.value = !showSidebar.value
}

onMounted(() => {
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    user.value = JSON.parse(savedUser)
  }
})
</script>
