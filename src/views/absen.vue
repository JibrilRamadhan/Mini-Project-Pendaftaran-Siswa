<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-blue-100 dark:from-gray-900 dark:via-slate-900 dark:to-blue-950 p-6"
  >
    <div class="max-w-7xl mx-auto">
      <!-- HEADER SECTION WITH GLASS EFFECT -->
      <div
        class="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-8 mb-8"
      >
        <div class="flex justify-between items-center mb-6">
          <div class="space-y-2">
            <h1
              class="text-4xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              Absensi Siswa 
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-lg">
              Kelola kehadiran siswa dengan sistem yang akurat dan efisien
            </p>
          </div>

          <div class="flex space-x-3">
            <button
              @click="resetFilter()"
              class="group relative px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
            >
              <div class="relative flex items-center space-x-2">
                <i class="ri-refresh-line text-lg"></i>
                <span>Reset</span>
              </div>
            </button>
            
            <button
              @click="bukaForm()"
              :disabled="!selectedKelasId || !selectedTanggal"
              :class="[
                'group relative px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg',
                selectedKelasId && selectedTanggal
                  ? 'bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              <div
                v-if="selectedKelasId && selectedTanggal"
                class="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"
              ></div>
              <div class="relative flex items-center space-x-2">
                <i class="ri-user-add-line mr-2"></i> 
                <span>Tambah Siswa</span>
              </div>
            </button>
          </div>
        </div>

        <!-- Enhanced Filter Section -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Date Filter -->
          <div class="space-y-2">
            <label
              class="flex items-center text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider"
            >
              <i class="ri-calendar-line text-sky-600 mr-2"></i>
              Tanggal Absensi
            </label>
            <div class="relative">
              <input
                type="date"
                v-model="selectedTanggal"
                class="w-full px-4 py-3 bg-white/80 dark:bg-gray-800 dark:text-white   border border-sky-200 dark:border-sky-700 rounded-xl shadow-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
              />
              <div
                class="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-blue-500/10 rounded-xl pointer-events-none"
              ></div>
            </div>
          </div>

          <!-- Class Filter -->
          <div class="space-y-2">
            <label
              class="flex items-center text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider"
            >
              <i class="ri-school-line text-sky-600 mr-2"></i>
              Pilih Kelas
            </label>
            <div class="relative">
              <select
                v-model="selectedKelasId"
                class="w-full px-4 py-3 bg-white/80 dark:bg-gray-800 dark:text-white border border-sky-200 dark:border-sky-700 rounded-xl shadow-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300 appearance-none"
              >
                <option disabled value="">-- Pilih Kelas --</option>
                <option v-for="kelas in kelasList" :key="kelas.id" :value="kelas.id">
                  {{ kelas.nama_kelas }}
                </option>
              </select>
              <i
                class="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-600 pointer-events-none"
              ></i>
            </div>
          </div>

          <!-- Stats Display -->
          <div class="space-y-2">
            <label
              class="flex items-center text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider"
            >
              <i class="ri-bar-chart-line text-sky-600 mr-2"></i>
              Total Siswa
            </label>
            <div class="bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl p-3 text-white">
              <div class="flex items-center justify-between">
                <div>
                  <!-- <p class="text-sky-100 text-sm">Siswa Terdaftar</p> -->
                  <p class="text-2xl font-bold">{{ tableData.length }} Siswa</p>
                </div>
                <i class="ri-user-check-line text-3xl text-sky-200"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CLASS INFO CARD LAMA--> 
      <!-- <div
        v-if="selectedKelasId && selectedTanggal"
        class="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl border border-white/30 dark:border-gray-700/30 p-6 mb-8"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div
              class="w-16 h-16 bg-gradient-to-r from-sky-400 to-blue-500 rounded-2xl flex items-center justify-center"
            >
              <i class="ri-school-line text-3xl text-white"></i>
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {{ getNamaKelas(selectedKelasId) }}
              </h3>
              <p class="text-gray-600 dark:text-gray-400 flex items-center">
                <i class="ri-user-star-line mr-2"></i>
                Wali Kelas: {{ getNamaGuru(getWaliKelas(selectedKelasId)) }}
              </p>
            </div>
            <div class="text-left">
              <p class="text-sm text-gray-500 dark:text-gray-400">Tanggal Absensi</p>
              <p class="text-lg font-bold text-gray-900 dark:text-gray-100">{{ formatTanggal(selectedTanggal) }}</p>
            </div>
          </div>
          
          <div class="flex space-x-3">
            <button
              v-if="tableData.length > 0 && !hasCompleteAbsensi"
              @click="generateAbsensiAwal()"
              class="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
            >
              <i class="ri-check-double-line mr-2"></i>
              Generate Absensi
            </button>

            <button
              v-if="hasCompleteAbsensi"
              @click="exportAbsensi()"
              class="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
            >
              <i class="ri-file-download-line mr-2"></i>
              Export Data
            </button>
          </div>
        </div>
      </div> -->
      <div
  v-if="selectedKelasId && selectedTanggal"
  class="backdrop-blur-xl bg-white/90 dark:bg-gray-900/80 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8"
>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
    <!-- Info Kelas -->
    <div class="flex items-center space-x-4">
      <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center">
        <i class="ri-school-line text-2xl text-white"></i>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
          {{ getNamaKelas(selectedKelasId) }}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 flex items-center">
          <i class="ri-user-star-line mr-1"></i>
          Wali Kelas: {{ getNamaGuru(getWaliKelas(selectedKelasId)) }}
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
          <i class="ri-calendar-line mr-1"></i>
          Tanggal Absensi:
          <span class="font-semibold ml-1 text-gray-800 dark:text-gray-100">{{ formatTanggal(selectedTanggal) }}</span>
        </p>
      </div>
    </div>

    <!-- Aksi -->
    <div class="flex justify-end space-x-3">
      <button
        v-if="tableData.length > 0 && !hasCompleteAbsensi"
        @click="generateAbsensiAwal()"
        class="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-lg font-medium shadow-md transition-transform transform hover:scale-105"
      >
        <i class="ri-check-double-line mr-2"></i>
        Generate Absensi
      </button>

      <button
        v-if="hasCompleteAbsensi"
        @click="exportAbsensi()"
        class="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg font-medium shadow-md transition-transform transform hover:scale-105"
      >
        <i class="ri-file-download-line mr-2"></i>
        Export Data
      </button>
    </div>
  </div>
</div>

<!-- Summary Cards -->
      <div v-if="tableData.length > 0" class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8 mb-8">
  <!-- Card Hadir -->
  <div class="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30 p-6">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600 dark:text-gray-400 text-sm">Hadir</p>
        <p class="text-2xl font-bold text-green-600">{{ getStatusCount('Hadir') }}</p>
      </div>
      <i class="ri-checkbox-circle-fill text-3xl text-green-500"></i>
    </div>
  </div>

  <!-- Card Izin -->
  <div class="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30 p-6">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600 dark:text-gray-400 text-sm">Izin</p>
        <p class="text-2xl font-bold text-yellow-600">{{ getStatusCount('Izin') }}</p>
      </div>
      <i class="ri-information-fill text-3xl text-yellow-500"></i>
    </div>
  </div>

  <!-- Card Sakit -->
  <div class="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30 p-6">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600 dark:text-gray-400 text-sm">Sakit</p>
        <p class="text-2xl font-bold text-blue-600">{{ getStatusCount('Sakit') }}</p>
      </div>
      <i class="ri-heart-pulse-fill text-3xl text-blue-500"></i>
    </div>
  </div>

  <!-- Card Alpha -->
  <div class="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30 p-6">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-gray-600 dark:text-gray-400 text-sm">Alpha</p>
        <p class="text-2xl font-bold text-red-600">{{ getStatusCount('Alpha') }}</p>
      </div>
      <i class="ri-close-circle-fill text-3xl text-red-500"></i>
    </div>
  </div>
</div>


      <!-- TABLE CONTAINER -->
      <div
        v-if="selectedKelasId && selectedTanggal"
        class="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden"
      >
        <!-- Table Header -->
        <div class="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 p-6">
          <div class="flex items-center justify-between">
            <h3 class="text-2xl font-bold text-white flex items-center">
              <i class="ri-file-list-line mr-3"></i>
              Daftar Kehadiran Siswa - {{ getNamaKelas(selectedKelasId) }}
            </h3>
            <div class="text-white text-sm">
              <i class="ri-calendar-check-line mr-1"></i>
              {{ formatTanggal(selectedTanggal) }}
            </div>
          </div>
        </div>

        <!-- Enhanced Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gradient-to-r from-slate-100 to-gray-100 dark:from-gray-800 dark:to-slate-800">
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-sky-200 dark:border-sky-800">
                  <div class="flex items-center space-x-2">
                    <i class="ri-hashtag text-sky-600"></i>
                    <span>No</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-sky-200 dark:border-sky-800">
                  <div class="flex items-center space-x-2">
                    <i class="ri-user-line text-sky-600"></i>
                    <span>Nama Siswa</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-sky-200 dark:border-sky-800">
                  <div class="flex items-center space-x-2">
                    <i class="ri-id-card-line text-sky-600"></i>
                    <span>NISN</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-center text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-sky-200 dark:border-sky-800">
                  <div class="flex items-center justify-center space-x-2">
                    <i class="ri-checkbox-circle-line text-sky-600"></i>
                    <span>Status Kehadiran</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-center text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-sky-200 dark:border-sky-800">
                  <div class="flex items-center justify-center space-x-2">
                    <i class="ri-settings-line text-sky-600"></i>
                    <span>Aksi</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr
                v-for="(data, i) in tableData"
                :key="data.id_siswa"
                class="hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 dark:hover:from-sky-900/20 dark:hover:to-blue-900/20 transition-all duration-300"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center text-gray-900 dark:text-white font-bold text-lg">
                    {{ i + 1 }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {{ data.nama_siswa.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <div class="text-sm font-bold text-gray-900 dark:text-gray-100">
                        {{ data.nama_siswa }}
                      </div>
                      <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <i class="ri-user-3-line mr-1"></i>
                        Siswa
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 dark:text-gray-100 font-mono">
                    {{ data.nisn }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <div class="flex items-center justify-center space-x-2">
                    <!-- Status Buttons -->
                    <button
                      v-for="status in ['Hadir', 'Izin', 'Sakit', 'Alpha']"
                      :key="status"
                      @click="updateStatusAbsensi(data.id_siswa, status)"
                      :class="[
                        'px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 transform hover:scale-105',
                        data.status === status
                          ? getActiveStatusStyle(status)
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300'
                      ]"
                    >
                      <i :class="getStatusIcon(status)" class="mr-1"></i>
                      {{ status }}
                    </button>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-center">
                  <button
                    @click="hapusSiswaDariAbsensi(data.id_siswa)"
                    class="inline-flex items-center px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold text-xs"
                  >
                    <i class="ri-delete-bin-line mr-1"></i>
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="tableData.length === 0" class="text-center py-16">
          <div class="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-sky-100 to-blue-200 dark:from-sky-700 dark:to-blue-800 rounded-full flex items-center justify-center">
            <i class="ri-user-search-line text-6xl text-sky-500 dark:text-sky-400"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Tidak Ada Siswa di Kelas Ini
          </h3>
          <p class="text-gray-500 dark:text-gray-500 mb-6">
            Belum ada siswa yang terdaftar di kelas {{ getNamaKelas(selectedKelasId) }}
          </p>
        </div>
      </div>

      <!-- Instruction Card -->
      <div
        v-if="!selectedKelasId || !selectedTanggal"
        class="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden"
      >
        <div class="text-center py-16">
          <div class="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-amber-100 to-orange-200 dark:from-amber-700 dark:to-orange-800 rounded-full flex items-center justify-center">
            <i class="ri-information-line text-6xl text-amber-500 dark:text-amber-400"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Pilih Tanggal dan Kelas Terlebih Dahulu
          </h3>
          <p class="text-gray-500 dark:text-gray-500 mb-6">
            Untuk memulai absensi, silakan pilih tanggal dan kelas di bagian filter di atas
          </p>
        </div>
      </div>
    </div>

    <!-- Modal Form untuk menambah siswa -->
    <ModalFormAbsen
      :show="showForm"
      :form="selectedItem"
      :siswaList="siswaData"
      :kelasList="kelasList"
      :guruList="guruList"
      @cancel="tutupForm"
      @save="handleSave"
    />

    <!-- Toast Notification -->
    <div
      v-if="showToast"
      class="fixed top-4 right-4 z-50 max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transform transition-all duration-300"
      :class="toastType === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'"
    >
      <div class="p-4">
        <div class="flex items-center">
          <div :class="toastType === 'success' ? 'text-green-500' : 'text-red-500'">
            <i :class="toastType === 'success' ? 'ri-check-line' : 'ri-close-line'" class="text-xl"></i>
          </div>
          <div class="ml-3">
            <p :class="toastType === 'success' ? 'text-green-800' : 'text-red-800'" class="text-sm font-medium">
              {{ toastMessage }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, provide, watch } from 'vue'
import ModalFormAbsen from '../components/modalformabsen.vue'
import useAbsen from '../composables/useAbsen'
import Siswalist from '../stores/siswa.json'
import GuruList from '../stores/guru.json'
import Kelaslist from '../stores/kelas.json'

// Sample data - replace with your actual data imports
const siswaData = ref(Siswalist)

const kelasList = ref(Kelaslist)

const guruList = ref(GuruList)

const {
  absens,
  selectedKelasId,
  selectedTanggal,
  showForm,
  selectedItem,
  filteredAbsensi,
  tableData,
  siswaByKelas,
  bukaForm,
  tutupForm,
  simpan,
  getNamaKelas,
  getNamaGuru,
  getNamaSiswa,
  getWaliKelas,
  generateAbsensiAwal,
  updateStatusAbsensi,
  tambahSiswaKeAbsensi,
  hapusSiswaDariAbsensi,
  resetFilter
} = useAbsen()

// Toast notification
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

// Provide functions to child components
provide('tambahSiswaKeAbsensi', tambahSiswaKeAbsensi)
provide('getNamaKelas', getNamaKelas)
provide('selectedTanggal', selectedTanggal)
provide('selectedKelasId', selectedKelasId)
provide('tableData', tableData)

// Computed untuk mengecek apakah sudah ada absensi lengkap
const hasCompleteAbsensi = computed(() => {
  return tableData.value.length > 0 && tableData.value.every(data => data.has_absen && data.status)
})




// Status styling functions
const getActiveStatusStyle = (status) => {
  const styles = {
    Hadir: 'bg-green-500 hover:bg-green-600 text-white shadow-lg',
    Izin: 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg',
    Sakit: 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg',
    Alpha: 'bg-red-500 hover:bg-red-600 text-white shadow-lg',
  }
  return styles[status] || 'bg-gray-500 text-white shadow-lg'
}

const getStatusIcon = (status) => {
  const icons = {
    Hadir: 'ri-checkbox-circle-fill',
    Izin: 'ri-information-fill',
    Sakit: 'ri-heart-pulse-fill',
    Alpha: 'ri-close-circle-fill',
  }
  return icons[status] || 'ri-question-fill'
}

const getStatusCount = (status) => {
  return tableData.value.filter((item) => item.status === status).length
}

// Format tanggal untuk tampilan
const formatTanggal = (tanggal) => {
  if (!tanggal) return ''
  const date = new Date(tanggal)
  return date.toLocaleDateString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// Handle save from modal
const handleSave = (data) => {
  try {
    tambahSiswaKeAbsensi(data)
    showToastNotification('Siswa berhasil ditambahkan ke absensi!', 'success')
    tutupForm()
  } catch (error) {
    showToastNotification('Gagal menambahkan siswa!', 'error')
  }
}

// Export absensi
const exportAbsensi = () => {
  const data = tableData.value.map((item, index) => ({
    No: index + 1,
    'Nama Siswa': item.nama_siswa,
    NISN: item.nisn,
    Kelas: getNamaKelas(selectedKelasId.value),
    Status: item.status,
    Tanggal: selectedTanggal.value
  }))

  const csv = convertToCSV(data)
  downloadCSV(csv, `Absensi_${getNamaKelas(selectedKelasId.value)}_${selectedTanggal.value}.csv`)
  showToastNotification('Data absensi berhasil diexport!', 'success')
}

// Helper functions
const convertToCSV = (data) => {
  const headers = Object.keys(data[0]).join(',')
  const rows = data.map(row => Object.values(row).join(','))
  return [headers, ...rows].join('\n')
}

const downloadCSV = (csv, filename) => {
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.setAttribute('hidden', '')
  a.setAttribute('href', url)
  a.setAttribute('download', filename)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

const showToastNotification = (message, type) => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Watch for changes in status updates
watch(tableData, (newData) => {
  // Auto-save functionality could be added here
}, { deep: true })
</script>

<style scoped>
/* Custom animations */
.fade-slide-enter-active {
  transition: all 0.3s ease-out;
}

.fade-slide-leave-active {
  transition: all 0.2s ease-in;
}

.fade-slide-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.fade-slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* Smooth scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #0ea5e9, #3b82f6);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #0284c7, #2563eb);
}

/* Status buttons hover effects */
button:hover {
  transform: scale(1.05);
}

/* Toast animation */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.fixed.top-4.right-4 {
  animation: slideInRight 0.3s ease-out;
}
</style>