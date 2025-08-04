<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-purple-100 dark:from-gray-900 dark:via-slate-900 dark:to-violet-950 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- HEADER SECTION WITH GLASS EFFECT -->
      <div class="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-8 mb-8">
        <div class="flex justify-between items-center">
          <div class="space-y-2">
            <h1 class="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Data Kelas
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-lg">Kelola ruang belajar dan kapasitas kelas dengan efektif</p>
          </div>
          
          <button 
            @click="tambahBaru" 
            class="group relative px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div class="relative flex items-center space-x-2">
              <i class="ri-add-line text-xl"></i>
              <span>Tambah Kelas</span>
            </div>
          </button>
        </div>
        
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div class="bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl p-4 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-violet-100">Total Kelas</p>
                <p class="text-2xl font-bold">{{ totalKelas }}</p>
              </div>
              <i class="ri-school-line text-3xl text-violet-200"></i>
            </div>
          </div>
          <div class="bg-gradient-to-r from-indigo-500 to-violet-600 rounded-xl p-4 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-indigo-100">Ruang Aktif</p>
                <p class="text-2xl font-bold">{{ ruangAktif }}</p>
              </div>
              <i class="ri-door-open-line text-3xl text-indigo-200"></i>
            </div>
          </div>
          <div class="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-4 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-purple-100">Total Kapasitas</p>
                <p class="text-2xl font-bold">{{ totalKapasitas }}</p>
              </div>
              <i class="ri-team-fill text-3xl text-purple-200"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- TABLE CONTAINER WITH ADVANCED GLASSMORPHISM -->
      <div class="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden">
        <!-- Table Header with Gradient & Search -->
        <div class="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 p-6 flex justify-between items-center">
          <h3 class="text-2xl font-bold text-white flex items-center">
            <i class="ri-building-line mr-3"></i>
            Daftar Ruang Kelas
          </h3>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari kelas, kode, kapasitas, atau guru..."
            class="px-4 py-2 rounded-xl border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <!-- Enhanced Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gradient-to-r from-slate-100 to-gray-100 dark:from-gray-800 dark:to-slate-800">
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-violet-200 dark:border-violet-800">
                  <div class="flex items-center space-x-2">
                    <i class="ri-hashtag text-violet-600"></i>
                    <span>No</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-violet-200 dark:border-violet-800">
                  <div class="flex items-center space-x-2">
                    <i class="ri-school-line text-violet-600"></i>
                    <span>Nama Kelas</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-violet-200 dark:border-violet-800">
                  <div class="flex items-center space-x-2">
                    <i class="ri-code-line text-violet-600"></i>
                    <span>Kode Kelas</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-violet-200 dark:border-violet-800">
                  <div class="flex items-center space-x-2">
                    <i class="ri-team-line text-violet-600"></i>
                    <span>Kapasitas</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-violet-200 dark:border-violet-800">
                  <div class="flex items-center space-x-2">
                    <i class="ri-user-star-line text-violet-600"></i>
                    <span>Wali Kelas</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr
                v-for="(item, index) in filteredKelas"
                :key="item.id"
                @click="pilihItem(item)"
                :class="[
                  'cursor-pointer transition-all duration-300 hover:shadow-lg',
                  selectedItem?.id === item.id
                    ? 'bg-gradient-to-r from-violet-50 via-purple-50 to-indigo-50 dark:from-violet-900/30 dark:via-purple-900/30 dark:to-indigo-900/30 shadow-xl border-l-4 border-violet-500 transform scale-[1.02]'
                    : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-violet-50 dark:hover:from-gray-800 dark:hover:to-slate-800'
                ]"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-8 h-8 text-black rounded-full flex items-center justify-center dark:text-white font-bold text-lg">
                      {{ index + 1 }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-12 h-12 bg-gradient-to-r from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center text-white font-bold mr-4 relative overflow-hidden">
                      <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                      <i class="ri-door-line text-xl relative z-10"></i>
                    </div>
                    <div>
                      <div class="text-sm font-bold text-gray-900 dark:text-gray-100">{{ item.nama_kelas }}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <i class="ri-building-4-line mr-1"></i>
                        Ruang Kelas
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="inline-flex items-center px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-violet-100 to-purple-100 text-violet-800 dark:from-violet-900 dark:to-purple-900 dark:text-violet-200 border border-violet-200 dark:border-violet-700">
                    <i class="ri-qr-code-line mr-2"></i>
                    {{ item.kode_kelas }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-10 h-10 bg-gradient-to-r from-indigo-400 to-violet-500 rounded-full flex items-center justify-center mr-3">
                      <i class="ri-group-line text-white"></i>
                    </div>
                    <div>
                      <div class="text-lg font-bold text-gray-900 dark:text-gray-100">{{ item.kapasitas }}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">Siswa Max</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {{ item?.id_guru ? getGuruById(item.id_guru) : 'Belum Ditentukan' }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State Search -->
        <div v-if="filteredKelas.length === 0" class="text-center py-16">
          <div class="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-violet-100 to-purple-200 dark:from-violet-700 dark:to-purple-800 rounded-full flex items-center justify-center">
            <i class="ri-school-line text-6xl text-violet-500 dark:text-violet-400"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Tidak ditemukan data sesuai pencarian
          </h3>
          <p class="text-gray-500 dark:text-gray-500 mb-6">
            Silakan ubah kata kunci atau tambah data baru
          </p>
          <button @click="tambahBaru" class="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300">
            <i class="ri-add-line mr-2"></i>
            Tambah Kelas
          </button>
        </div>
      </div>

      <!-- FLOATING ACTION BUTTONS -->
      <transition 
        enter-active-class="transition duration-300 ease-out" 
        enter-from-class="transform scale-95 opacity-0" 
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-200 ease-in" 
        leave-from-class="transform scale-100 opacity-100" 
        leave-to-class="transform scale-95 opacity-0"
      >
        <div v-if="selectedItem" ref="actionRef" class="fixed bottom-8 right-8 flex flex-col space-y-3">
          <!-- Selected Item Info Card -->
          <div class="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl border border-white/30 dark:border-gray-700/30 p-4 mb-4">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold relative overflow-hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <i class="ri-door-line text-xl relative z-10"></i>
              </div>
              <div>
                <h4 class="font-bold text-gray-900 dark:text-gray-100">{{ selectedItem.nama_kelas }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <i class="ri-qr-code-line mr-1"></i>
                  {{ selectedItem.kode_kelas }}
                  <span class="mx-2">•</span>
                  <i class="ri-group-line mr-1"></i>
                  {{ selectedItem.kapasitas }} siswa
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <i class="ri-user-star-line mr-1"></i>
                  {{ selectedItem?.id_guru ? getGuruById(selectedItem.id_guru) : 'Belum dipilih' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col space-y-3">
            <button 
              @click="editItem(selectedItem)" 
              class="group flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold min-w-[160px]"
            >
              <i class="ri-edit-line text-xl"></i>
              <span>Edit</span>
            </button>

            <button 
              @click="lihatItem(selectedItem)" 
              class="group flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold min-w-[160px]"
            >
              <i class="ri-eye-line text-xl"></i>
              <span>Lihat</span>
            </button>

            <button 
              @click="(hapusItem(selectedItem.id), clearSelected())" 
              class="group flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold min-w-[160px]"
            >
              <i class="ri-delete-bin-line text-xl"></i>
              <span>Hapus</span>
            </button>

            <button 
              @click="clearSelected" 
              class="group flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold min-w-[160px]"
            >
              <i class="ri-close-line text-xl"></i>
              <span>Batal</span>
            </button>
          </div>
        </div>
      </transition> 
    </div>

    <ModalFormKelas
  :key="selectedItem?.id ?? 'new'"
  :show="showForm"
  :mode="mode"
  :readonly="readonly"
  :form="form"
  :errors="errors"
  :selectedItem="selectedItem"
  :siswaDiKelas="siswaDiKelas"
  @cancel="batal"
  @save="simpan"
/>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import useKelas from '@/composables/useKelas'
import ModalFormKelas from '@/components/ModalFormKelas.vue'
import guruList from '@/stores/guru.json'
import useSearch from '../composables/search'

const {
  data,
  showForm,
  mode,
  readonly,
  form,
  errors,
  selectedItem,
  tambahBaru,
  editItem,
  lihatItem,
  hapusItem,
  simpan,
  batal,
  pilihItem,
  clearSelected,
  siswaDiKelas,
} = useKelas()

const actionRef = ref(null)

// Helper untuk nama guru
function getGuruById(id) {
  return guruList.find((g) => g.id_guru === id)?.nama_guru || ''
}

const dataKelasWithGuru = computed(() => {
  return data.value.map(item => ({
    ...item,
    nama_guru: getGuruById(item.id_guru)
  }))
})

const { query: searchQuery, filtered: filteredData } = useSearch(dataKelasWithGuru, [
  'nama_kelas', 'kode_kelas', 'kapasitas', 'nama_guru'
])

// Gabungkan pencarian nama guru ke filteredData
const filteredKelas = computed(() => {
  if (!searchQuery.value) return filteredData.value
  const q = searchQuery.value.toLowerCase()
  return filteredData.value.filter(item => {
    const guruNama = getGuruById(item.id_guru)?.toLowerCase() || ''
    return guruNama.includes(q) ||
      item.nama_kelas?.toLowerCase().includes(q) ||
      item.kode_kelas?.toLowerCase().includes(q) ||
      (item.kapasitas + '').includes(q)
  })
})

// Statistik
const totalKelas = computed(() => data.value.length)
const ruangAktif = computed(() => data.value.filter(k => k.kapasitas > 0).length)
const totalKapasitas = computed(() =>
  data.value.reduce((sum, k) => sum + parseInt(k.kapasitas || 0), 0)
)

function handleClickOutside(event) {
  if (
    actionRef.value &&
    !actionRef.value.contains(event.target) &&
    !event.target.closest('table') &&
    !event.target.closest('.modal')
  ) {
    clearSelected()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
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
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #7c3aed, #9333ea);
}

/* Floating animation */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.group:hover {
  animation: float 2s ease-in-out infinite;
}

/* Door opening animation */
@keyframes doorOpen {
  0% { transform: rotateY(0deg); }
  50% { transform: rotateY(-15deg); }
  100% { transform: rotateY(0deg); }
}

.group:hover .ri-door-line {
  animation: doorOpen 2s ease-in-out infinite;
}

/* Classroom ambient effect */
@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
  50% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.5); }
}

.backdrop-blur-xl:hover {
  animation: glow 3s ease-in-out infinite;
}
</style>