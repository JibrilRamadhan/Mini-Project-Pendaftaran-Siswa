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

          <button
            @click="bukaForm()"
            class="group relative px-8 py-4 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg"
          >
            <div
              class="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"
            ></div>
            <div class="relative flex items-center space-x-2">
              <i class="ri-add-line text-xl"></i>
              <span>Tambah Absen</span>
            </div>
          </button>
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
                class="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-sky-200 dark:border-sky-700 rounded-xl shadow-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300"
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
                class="w-full px-4 py-3 bg-white/80 dark:bg-gray-800/80 border border-sky-200 dark:border-sky-700 rounded-xl shadow-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all duration-300 appearance-none"
              >
                <option disabled value="">-- Pilih Kelas --</option>
                <option v-for="kelas in kelasList" :key="kelas.id" :value="kelas.id">
                  {{ kelas.nama_kelas }}
                </option>
              </select>
              <i
                class="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 text-sky-600 pointer-events-none"
              ></i>
              <div
                class="absolute inset-0 bg-gradient-to-r from-sky-500/10 to-blue-500/10 rounded-xl pointer-events-none"
              ></div>
            </div>
          </div>

          <!-- Stats Display -->
          <div class="space-y-2">
            <label
              class="flex items-center text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider"
            >
              <i class="ri-bar-chart-line text-sky-600 mr-2"></i>
              Total Absensi
            </label>
            <div class="bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl p-3 text-white">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sky-100 text-sm">Hari Ini</p>
                  <p class="text-2xl font-bold">{{ filteredAbsensi.length }}</p>
                </div>
                <i class="ri-user-check-line text-3xl text-sky-200"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CLASS INFO CARD -->
      <div
        v-if="selectedKelasId && selectedTanggal"
        class="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-2xl border border-white/30 dark:border-gray-700/30 p-6 mb-8"
      >
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
          <div class="text-right">
            <p class="text-sm text-gray-500 dark:text-gray-400">Tanggal</p>
            <p class="text-lg font-bold text-gray-900 dark:text-gray-100">{{ selectedTanggal }}</p>
          </div>
        </div>
      </div>

      <!-- TABLE CONTAINER WITH ADVANCED GLASSMORPHISM -->
      <div
        class="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden"
      >
        <!-- Table Header with Gradient -->
        <div class="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 p-6">
          <h3 class="text-2xl font-bold text-white flex items-center">
            <i class="ri-file-list-line mr-3"></i>
            Daftar Kehadiran Siswa
          </h3>
        </div>

        <!-- Enhanced Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr
                class="bg-gradient-to-r from-slate-100 to-gray-100 dark:from-gray-800 dark:to-slate-800"
              >
                <th
                  class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-sky-200 dark:border-sky-800"
                >
                  <div class="flex items-center space-x-2">
                    <i class="ri-hashtag text-sky-600"></i>
                    <span>No</span>
                  </div>
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-sky-200 dark:border-sky-800"
                >
                  <div class="flex items-center space-x-2">
                    <i class="ri-user-line text-sky-600"></i>
                    <span>Nama Siswa</span>
                  </div>
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-sky-200 dark:border-sky-800"
                >
                  <div class="flex items-center space-x-2">
                    <i class="ri-school-line text-sky-600"></i>
                    <span>Kelas</span>
                  </div>
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-sky-200 dark:border-sky-800"
                >
                  <div class="flex items-center space-x-2">
                    <i class="ri-checkbox-circle-line text-sky-600"></i>
                    <span>Status Kehadiran</span>
                  </div>
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-sky-200 dark:border-sky-800"
                >
                  <div class="flex items-center space-x-2">
                    <i class="ri-calendar-2-line text-sky-600"></i>
                    <span>Tanggal</span>
                  </div>
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-sky-200 dark:border-sky-800"
                >
                  <div class="flex items-center space-x-2">
                    <i class="ri-settings-line text-sky-600"></i>
                    <span>Aksi</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr
                v-for="(a, i) in filteredAbsensi"
                :key="a.id"
                class="hover:bg-gradient-to-r hover:from-sky-50 hover:to-blue-50 dark:hover:from-sky-900/20 dark:hover:to-blue-900/20 transition-all duration-300"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div
                    class="w-8 h-8  rounded-full flex items-center justify-center text-gray-900 dark:text-white font-bold text-lg"
                  >
                    {{ i + 1 }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div
                      class="w-12 h-12 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4"
                    >
                      {{ getNamaSiswa(a.id_siswa).charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <div class="text-sm font-bold text-gray-900 dark:text-gray-100">
                        {{ getNamaSiswa(a.id_siswa) }}
                      </div>
                      <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <i class="ri-user-3-line mr-1"></i>
                        Siswa
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200"
                  >
                    <i class="ri-door-line mr-1"></i>
                    {{ getNamaKelas(a.id_kelas) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                      getStatusStyle(a.status),
                    ]"
                  >
                    <i :class="getStatusIcon(a.status)" class="mr-1"></i>
                    {{ a.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <i class="ri-calendar-check-line text-sky-500 mr-2"></i>
                    <span class="text-sm text-gray-900 dark:text-gray-100 font-mono">{{
                      a.tanggal
                    }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <button
                    @click="bukaForm(a)"
                    class="inline-flex items-center px-3 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold text-xs"
                  >
                    <i class="ri-edit-line mr-1"></i>
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredAbsensi.length === 0" class="text-center py-16">
          <div
            class="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-sky-100 to-blue-200 dark:from-sky-700 dark:to-blue-800 rounded-full flex items-center justify-center"
          >
            <i class="ri-file-list-line text-6xl text-sky-500 dark:text-sky-400"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Belum Ada Data Absensi
          </h3>
          <p class="text-gray-500 dark:text-gray-500 mb-6">
            {{
              selectedKelasId && selectedTanggal
                ? 'Mulai tambahkan absensi untuk tanggal dan kelas yang dipilih'
                : 'Pilih tanggal dan kelas terlebih dahulu'
            }}
          </p>
          <button
            @click="bukaForm()"
            :disabled="!selectedKelasId || !selectedTanggal"
            :class="[
              'px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300',
              selectedKelasId && selectedTanggal
                ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed',
            ]"
          >
            <i class="ri-add-line mr-2"></i>
            Tambah Absensi Pertama
          </button>
        </div>
      </div>

      <!-- Summary Cards -->
      <div v-if="filteredAbsensi.length > 0" class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div
          class="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30 p-6"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Hadir</p>
              <p class="text-2xl font-bold text-green-600">{{ getStatusCount('Hadir') }}</p>
            </div>
            <i class="ri-checkbox-circle-fill text-3xl text-green-500"></i>
          </div>
        </div>
        <div
          class="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30 p-6"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Izin</p>
              <p class="text-2xl font-bold text-yellow-600">{{ getStatusCount('Izin') }}</p>
            </div>
            <i class="ri-information-fill text-3xl text-yellow-500"></i>
          </div>
        </div>
        <div
          class="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30 p-6"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Sakit</p>
              <p class="text-2xl font-bold text-blue-600">{{ getStatusCount('Sakit') }}</p>
            </div>
            <i class="ri-heart-pulse-fill text-3xl text-blue-500"></i>
          </div>
        </div>
        <div
          class="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-xl border border-white/30 dark:border-gray-700/30 p-6"
        >
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 dark:text-gray-400 text-sm">Alpha</p>
              <p class="text-2xl font-bold text-red-600">{{ getStatusCount('Alpha') }}</p>
            </div>
            <i class="ri-close-circle-fill text-3xl text-red-500"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Form -->
    <ModalFormAbsen
      :show="showForm"
      :form="selectedItem"
      :siswaList="siswaData"
      :kelasList="kelasList"
      :guruList="guruList"
      @cancel="tutupForm"
      @save="simpan"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import ModalFormAbsen from '../components/ModalFormAbsen.vue'
import useAbsen from '../composables/useAbsen'
import siswaData from '../stores/siswa.json'
import guruList from '../stores/guru.json'
import kelasList from '../stores/kelas.json'

const {
  absens,
  selectedKelasId,
  selectedTanggal,
  showForm,
  selectedItem,
  filteredAbsensi,
  bukaForm,
  tutupForm,
  simpan,
  getNamaKelas,
  getNamaGuru,
  getNamaSiswa,
} = useAbsen()

const getWaliKelas = (id_kelas) => {
  return guruList.find((g) => g.id_guru === id_kelas)?.id_guru || null
}

const filteredSiswa = computed(() => siswaData.filter((s) => s.id_kelas === selectedKelasId.value))

const defaultForm = computed(() => ({
  id: null,
  tanggal: selectedTanggal.value,
  id_kelas: selectedKelasId.value,
  id_siswa: '',
  id_wali: getWaliKelas(selectedKelasId.value),
  status: '',
}))

function handleSave(data) {
  simpan({
    ...data,
    id_kelas: data.kelas_id,
    id_wali: data.wali_kelas_id,
    id_siswa: data.siswa_id,
  })
}

// Status styling functions
const getStatusStyle = (status) => {
  const styles = {
    Hadir: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Izin: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Sakit: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Alpha: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  }
  return styles[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
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
  return filteredAbsensi.value.filter((item) => item.status === status).length
}
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

/* Floating animation */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.group:hover {
  animation: float 2s ease-in-out infinite;
}

/* Attendance pulse animation */
@keyframes attendancePulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(14, 165, 233, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(14, 165, 233, 0);
  }
}

.backdrop-blur-xl:hover {
  animation: attendancePulse 2s infinite;
}

/* Filter input focus effect */
input:focus,
select:focus {
  transform: scale(1.02);
}

/* Status badge animation */
@keyframes statusBlink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.group:hover span[class*='bg-green'],
.group:hover span[class*='bg-yellow'],
.group:hover span[class*='bg-blue'],
.group:hover span[class*='bg-red'] {
  animation: statusBlink 1.5s ease-in-out infinite;
}
</style>
