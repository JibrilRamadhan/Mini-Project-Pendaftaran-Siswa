<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    @click.self="onCancel"
  >
    <div
      class="w-full max-w-4xl backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden transform transition-all duration-300 scale-100"
    >
      <!-- Header with Gradient -->
      <div class="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 px-8 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <i class="ri-user-add-line text-2xl text-white"></i>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white">Tambah Siswa ke Absensi</h3>
              <p class="text-orange-100 text-sm">Pilih siswa dari semua kelas untuk ditambahkan</p>
            </div>
          </div>
          <button
            @click="onCancel"
            class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200"
          >
            <i class="ri-close-line text-xl text-white"></i>
          </button>
        </div>
      </div>

      <!-- Form Content -->
      <div class="p-8">
        <!-- Search Section -->
        <div class="mb-6">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari nama siswa atau NISN..."
              class="w-full px-4 py-3 pl-12 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400"
            />
            <i
              class="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            ></i>
          </div>
        </div>

        <!-- Filter by Class -->
        <div class="mb-6">
          <label class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Filter berdasarkan kelas (opsional)
          </label>
          <select
            v-model="selectedFilterKelas"
            class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 appearance-none"
          >
            <option value="">-- Semua Kelas --</option>
            <option v-for="kelas in kelasList" :key="kelas.id" :value="kelas.id">
              {{ kelas.nama_kelas }}
            </option>
          </select>
        </div>

        <!-- Students Table -->
        <div
          class="bg-white/30 dark:bg-gray-800/30 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
        >
          <div class="max-h-96 overflow-y-auto">
            <table class="w-full">
              <thead class="bg-gray-50/50 dark:bg-gray-700/50 sticky top-0">
                <tr>
                  <th
                    class="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    <i class="ri-user-line mr-2"></i>Nama Siswa
                  </th>
                  <th
                    class="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    <i class="ri-id-card-line mr-2"></i>NISN
                  </th>
                  <th
                    class="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    <i class="ri-school-line mr-2"></i>Kelas
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    <i class="ri-checkbox-circle-line mr-2"></i>Status
                  </th>
                  <th
                    class="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300"
                  >
                    <i class="ri-settings-line mr-2"></i>Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                <tr
                  v-for="siswa in filteredSiswa"
                  :key="siswa.id"
                  class="hover:bg-orange-50/50 dark:hover:bg-gray-700/30 transition-colors duration-200"
                >
                  <td class="px-6 py-4">
                    <div class="flex items-center">
                      <div
                        class="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold mr-3"
                      >
                        {{ siswa.nama.charAt(0).toUpperCase() }}
                      </div>
                      <div>
                        <div class="text-sm font-bold text-gray-900 dark:text-gray-100">
                          {{ siswa.nama }}
                        </div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">
                          ID: {{ siswa.id }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-gray-600 dark:text-gray-400 font-mono">
                    {{ siswa.nisn }}
                  </td>
                  <td class="px-6 py-4">
                    <span
                      class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200"
                    >
                      {{ getNamaKelas(siswa.kelas_id || siswa.id) || 'Tidak diketahui' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-center">
                    <!-- Hanya tampil tombol jika siswa berasal dari kelas yang dipilih -->
                    <template v-if="isSiswaDalamKelasDipilih(siswa)">
                      <span
                        v-if="isInCurrentAbsensi(siswa.id)"
                        class="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg font-medium flex items-center space-x-2 mx-auto cursor-not-allowed"
                      >
                        <i class="ri-check-line"></i>
                        <span>Ditambahkan</span>
                      </span>
                      <span
                      v-else
                        class="px-4 py-2 bg-gray-200 text-gray-400 rounded-lg font-medium flex items-center space-x-2 mx-auto cursor-not-allowed"
                      >
                        <i class="ri-error-warning-line"></i>
                        <span>Belum Di Tambahkan</span>
                      </span>
                      
                    </template>

                    <!-- Jika siswa tidak dalam kelas yang dipilih, disable tombol -->
                    <template v-else>
                      <span
                        class="px-4 py-2 bg-gray-200 text-gray-400 rounded-lg font-medium flex items-center space-x-2 mx-auto cursor-not-allowed"
                      >
                        <i class="ri-error-warning-line"></i>
                        <span>Bukan dari kelas ini</span>
                      </span>
                    </template>
                  </td>

                  <td class="px-6 py-4 text-center">
                    <template v-if="isSiswaDalamKelasDipilih(siswa)">
                      <!-- Siswa dari kelas absensi -->
                      <button
                        v-if="!isInCurrentAbsensi(siswa.id)"
                        @click="tambahSiswa(siswa)"
                        class="px-4 py-2 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 mx-auto"
                      >
                        <i class="ri-user-add-line"></i>
                        <span>Tambah Siswa</span>
                      </button>
                      <span
                        v-else
                        class="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg font-medium flex items-center space-x-2 mx-auto cursor-not-allowed"
                      >
                        <i class="ri-check-line"></i>
                        <span>Sudah Di Tambahkan</span>
                      </span>
                    </template>

                    <template v-else>
                      <!-- Siswa dari kelas lain -->
                      <span
                        class="px-4 py-2 bg-gray-200 text-gray-400 rounded-lg font-medium flex items-center space-x-2 mx-auto cursor-not-allowed"
                      >
                        <i class="ri-error-warning-line"></i>
                        <span>Bukan dari kelas ini</span>
                      </span>
                    </template>
                  </td>

                </tr>
                <tr v-if="Array.isArray(filteredSiswa) && filteredSiswa.length === 0">
                  <td colspan="5" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    <i class="ri-user-search-line text-4xl mb-4 block mx-auto opacity-50"></i>
                    <p class="text-lg font-medium">Siswa tidak ditemukan</p>
                    <p class="text-sm">
                      Coba gunakan kata kunci yang berbeda atau pilih kelas lain
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Action Buttons -->
        <div
          class="flex justify-end items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-x-4"
        >
          <button
            @click="onCancel"
            class="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2"
          >
            <i class="ri-close-line"></i>
            <span>Tutup</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject, watch } from 'vue'

const emit = defineEmits(['cancel', 'save'])

const props = defineProps({
  show: Boolean,
  form: Object,
  siswaList: Array,
  kelasList: Array,
  guruList: Array,
})

const tambahSiswaKeAbsensi = inject('tambahSiswaKeAbsensi')
const getNamaKelas = inject('getNamaKelas')
const selectedTanggal = inject('selectedTanggal')
const selectedKelasId = inject('selectedKelasId')
const tableData = inject('tableData')

const searchQuery = ref('')
const selectedFilterKelas = ref('')

// ✅ FIXED: Gunakan `let result = ...` bukan `filtered`
const filteredSiswa = computed(() => {
  let result = props.siswaList

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      (siswa) =>
        siswa.nama.toLowerCase().includes(query) || siswa.nisn.toLowerCase().includes(query),
    )
  }

  if (selectedFilterKelas.value) {
    result = result.filter((siswa) => siswa.kelas_id === Number(selectedFilterKelas.value))
  }

  return result
})

const getSelectedKelasId = () => {
  return Number(selectedFilterKelas.value || selectedKelasId.value)
}

const isInCurrentAbsensi = (siswaId) => {
  const kelasId = getSelectedKelasId()
  return tableData.value.some((data) => data.id_siswa === siswaId && data.id_kelas === kelasId)
}

const tambahSiswa = (siswa) => {
  console.log(siswa.id)
  const kelasId = getSelectedKelasId()

  if (!isInCurrentAbsensi(siswa.id)) {
    // Update langsung relasi siswa → kelas
    const siswaObj = props.siswaList.find((s) => s.id === siswa.id)
    if (siswaObj) siswaObj.kelas_id = kelasId

    tambahSiswaKeAbsensi({
      id_siswa: siswa.id,
      id_kelas: kelasId,
      id_wali: props.kelasList.find((k) => k.kelas_id === kelasId)?.wali_kelas_id || null,
      tanggal: selectedTanggal.value,
      status: null,
    })
  }
}

const isSiswaDalamKelasDipilih = (siswa) => {
  const kelasAbsensi = Number(selectedKelasId.value) // fix: selalu patok ke absensi
  return siswa.kelas_id === kelasAbsensi
}

// ✅ Update filter otomatis jika kelas diganti
watch(selectedKelasId, (newVal) => {
  selectedFilterKelas.value = newVal
})

// ✅ Tombol batal
function onCancel() {
  searchQuery.value = ''
  selectedFilterKelas.value = ''
  emit('cancel')
}

// ✅ Tombol simpan
function onSave() {
  emit('save')
}
</script>

<style scoped>
/* Custom scrollbar for table */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #ea580c, #dc2626);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #c2410c, #b91c1c);
}

/* Remove default select arrow in some browsers */
select::-ms-expand {
  display: none;
}

/* Animation for modal */
@keyframes modalSlide {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.modal-enter-active {
  animation: modalSlide 0.3s ease-out;
}

/* Hover effects */
.transform:hover {
  transform: scale(1.05);
}

/* Status badges animation */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
