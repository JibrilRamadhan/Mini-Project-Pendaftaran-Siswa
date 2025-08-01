<template>
  <form @submit.prevent="submitForm" class="mb-4 p-4 border rounded bg-gray-100 space-y-2">
    <h3 class="font-semibold text-lg">Tambah Siswa</h3>
    <div class="flex flex-col sm:flex-row gap-2">
      <input v-model="nama" placeholder="Nama" class="p-2 border rounded w-full sm:w-1/3" />
      <input v-model="nisn" placeholder="NISN" class="p-2 border rounded w-full sm:w-1/3" />
      <select v-model="status" class="p-2 border rounded w-full sm:w-1/3">
        <option value="Hadir">Hadir</option>
        <option value="Izin">Izin</option>
        <option value="Sakit">Sakit</option>
        <option value="Alpha">Alpha</option>
      </select>
    </div>
    <button type="submit" class="mt-2 px-4 py-1 bg-green-500 text-white rounded">Tambah</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['tambah-siswa'])

const nama = ref('')
const nisn = ref('')
const status = ref('Hadir')

function submitForm() {
  if (!nama.value || !nisn.value) {
    alert('Nama dan NISN wajib diisi.')
    return
  }

  emit('tambah-siswa', {
    nama: nama.value,
    nisn: nisn.value,
    status: status.value
  })

  // reset form
  nama.value = ''
  nisn.value = ''
  status.value = 'Hadir'
}
</script>
