<template>
  <div class="p-4 max-w-3xl mx-auto">
    <h2 class="text-xl font-bold mb-4">Absensi Kelas {{ kodeKelas }} ({{ tanggal }})</h2>
    <div class="flex gap-2 mb-4">
  <select v-model="kodeKelas" class="border p-2 rounded">
    <option value="KLS001">KLS001</option>
    <option value="KLS002">KLS002</option>
  </select>
  <input type="date" v-model="tanggal" class="border p-2 rounded" />
  <button @click="loadData" class="bg-blue-500 text-white px-3 py-1 rounded">
    Tampilkan
  </button>
</div>

    <AbsensiTable
      :items="absen"
      @update-status="updateStatus"
      @hapus-murid="hapusMurid"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AbsensiTable from '../components/AbsensiTable.vue'

const kodeKelas = ref('KLS001')
const tanggal = ref('2025-07-28')

onMounted(loadData)


const absen = ref([])

// onMounted(async () => {
//   const res = await fetch('/absen.json')
//   const data = await res.json()

//   const record = data.find(d =>
//     d.kode_kelas === kodeKelas && d.tanggal === tanggal
//   )

//   absen.value = record ? record.absen : []
// })

async function loadData() {
  const res = await fetch('/absen.json')
  const data = await res.json()

  const record = data.find(d =>
    d.kode_kelas === kodeKelas.value && d.tanggal === tanggal.value
  )

  absen.value = record ? record.absen : []
}


function updateStatus(nisn, status) {
  const item = absen.value.find(i => i.nisn === nisn)
  if (item) {
    item.status = status
    console.log(`Status ${item.nama} diubah ke ${status}`)
  }
}

function hapusMurid(nisn) {
  absen.value = absen.value.filter(i => i.nisn !== nisn)
}
</script>
