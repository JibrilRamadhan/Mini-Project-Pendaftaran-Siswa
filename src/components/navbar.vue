<template>
  <header
    class="bg-white border-b border-gray-200 fixed w-full z-10 flex items-center justify-between px-4 py-3 shadow-sm"
  >
    <button class="md:hidden" @click="$emit('toggleSidebar')">☰</button>
    <h1 class="text-lg font-semibold text-blue-800">Sistem Pendaftaran Siswa</h1>
    <div class="text-sm text-gray-600">{{ currentUser?.username }} ({{ currentUser?.role }})</div>
  </header>
</template>

<script setup>
const props = defineProps({
  currentUser: Object,
})
</script>
