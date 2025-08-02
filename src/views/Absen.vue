<template>
  <div class="p-4 max-w-3xl mx-auto">
<h2 class="text-xl font-bold mb-4">Absensi {{ namaKelasAktif }} ({{ displayTanggal }})</h2>
    <p class="text-sm text-gray-600">Wali Kelas: {{ namaWaliKelas }}</p>
    <div class="flex gap-2 mb-4">
  <select v-model="kodeKelas" class="border p-2 rounded">
  <option
    v-for="kelas in daftarKelas"
    :key="kelas.kode_kelas"
    :value="kelas.kode_kelas"
  >
    {{ kelas.nama_kelas }}
  </option>
</select>
  <input type="date" v-model="tanggal" class="border p-2 rounded" />
  <button @click="loadData(kodeKelas, tanggal)" class="bg-blue-500 text-white px-3 py-1 rounded">
    Tampilkan
  </button>
  <select v-model="filterStatus" class="border p-2 rounded">
    <option value="">Semua</option>
    <option value="Hadir">Hadir</option>
    <option value="Izin">Izin</option>
    <option value="Sakit">Sakit</option>
    <option value="Alpha">Alpha</option>
  </select>
    <input
    type="text"
    v-model="searchKeyword"
    placeholder="Cari nama murid..."
    class="border p-2 rounded w-full sm:w-64"
  />

</div>
    <TambahSiswaForm @tambah-siswa="tambahMurid" />


    <AbsensiTable
      :items="sortedItems"
      @sort-by="toggleSort"
      @update-status="updateStatus"
      @update-keterangan="updateKeterangan"
      @hapus-murid="hapusMurid"
    />

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAbsensi } from '../composables/useAbsensi.js'
import AbsensiTable from '../components/AbsensiTable.vue'
import TambahSiswaForm from '../components/TambahSiswaForm.vue'

const filterStatus = ref('')
const searchKeyword = ref('')

const filteredAbsen = computed(() =>
  absen.value.filter(a => {
    const cocokStatus = filterStatus.value ? a.status === filterStatus.value : true
    const cocokNama = a.nama.toLowerCase().includes(searchKeyword.value.toLowerCase())
    return cocokStatus && cocokNama
  })
) 

const sortedItems = computed(() => {
  const sorted = [...filteredAbsen.value] // asumsi kamu sudah pakai filter
  sorted.sort((a, b) => {
    const valA = a[sortKey.value]?.toString().toLowerCase() || ''
    const valB = b[sortKey.value]?.toString().toLowerCase() || ''
    if (valA < valB) return sortOrder.value === 'asc' ? -1 : 1
    if (valA > valB) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })
  return sorted
})

const { absen, namaKelasAktif, namaWaliKelas, kodeKelas, daftarKelas, displayKodeKelas, tanggal, displayTanggal, sortKey, sortOrder, loadData, loadKelas, loadGuru, updateStatus, hapusMurid, toggleSort, tambahMurid, updateKeterangan } = useAbsensi()

onMounted(() => {
  loadKelas()
  loadData(kodeKelas.value, tanggal.value)
  loadGuru()
})

</script>
