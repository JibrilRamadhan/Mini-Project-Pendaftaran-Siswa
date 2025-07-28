<template>
  <div class="p-4 max-w-3xl mx-auto">
    <h2 class="text-xl font-bold mb-4">Absensi Kelas {{ kodeKelas }} ({{ tanggal }})</h2>
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

const kodeKelas = 'KLS001'
const tanggal = '2025-07-28'

const absen = ref([])

onMounted(async () => {
  const res = await fetch('/absen.json')
  const data = await res.json()

  const record = data.find(d =>
    d.kode_kelas === kodeKelas && d.tanggal === tanggal
  )

  absen.value = record ? record.absen : []
})

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
