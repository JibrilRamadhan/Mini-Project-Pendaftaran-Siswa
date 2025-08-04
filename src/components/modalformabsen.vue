<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
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
              <i class="ri-calendar-check-line text-2xl text-white"></i>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white">Form Absensi</h3>
              <p class="text-orange-100 text-sm">Catat kehadiran siswa hari ini</p>
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
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Tanggal -->
          <div class="space-y-2">
            <label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <i class="ri-calendar-line text-orange-600"></i>
              <span>Tanggal</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="date"
                v-model="form.tanggal"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 hover:border-orange-300"
              />
            </div>
          </div>

          <!-- Kelas -->
          <div class="space-y-2">
            <label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-100">
              <i class="ri-school-line text-orange-600"></i>
              <span>Kelas</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <select
                v-model="form.kelas_id"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 appearance-none hover:border-orange-300"
              >
                <option disabled value="" class="text-gray-400">-- Pilih Kelas --</option>
                <option v-for="kelas in kelasList" :key="kelas.id" :value="kelas.id" class="text-gray-900 dark:text-gray-100">
                  {{ kelas.nama_kelas }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <i class="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>

          <!-- Wali Kelas -->
          <div class="space-y-2">
            <label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-100">
              <i class="ri-user-3-line text-orange-600"></i>
              <span>Wali Kelas</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <select
                v-model="form.wali_kelas_id"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 appearance-none hover:border-orange-300"
              >
                <option disabled value="" class="text-gray-400">-- Pilih Wali Kelas --</option>
                <option v-for="guru in guruList" :key="guru.id_guru" :value="guru.id_guru" class="text-gray-900 dark:text-gray-100">
                  {{ guru.nama_guru }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <i class="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>

          <!-- Siswa -->
          <div class="space-y-2">
            <label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <i class="ri-user-line text-orange-600"></i>
              <span>Siswa</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 cursor-pointer hover:border-orange-300 flex items-center justify-between"
                @click="showSiswaModal = true"
              >
                <span :class="selectedSiswa?.nama ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400'">
                  {{ selectedSiswa?.nama || 'Pilih Siswa' }}
                </span>
                <i class="ri-user-search-line text-gray-400"></i>
              </div>
            </div>
          </div>

          <!-- Status -->
          <div class="space-y-2">
            <label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <i class="ri-checkbox-circle-line text-orange-600"></i>
              <span>Status Kehadiran</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <select
                v-model="form.status"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 appearance-none hover:border-orange-300"
              >
                <option value="Hadir" class="text-gray-900 dark:text-gray-100">✅ Hadir</option>
                <option value="Alpha" class="text-gray-900 dark:text-gray-100">❌ Alpha</option>
                <option value="Sakit" class="text-gray-900 dark:text-gray-100">🤒 Sakit</option>
                <option value="Izin" class="text-gray-900 dark:text-gray-100">📝 Izin</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <i class="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-x-4">
          <button
            @click="onCancel"
            class="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2"
          >
            <i class="ri-close-line"></i>
            <span>Batal</span>
          </button>
          
          <button
            @click="onSave"
            class="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
          >
            <i class="ri-save-line"></i>
            <span>Simpan Absensi</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Siswa -->
  <div
    v-if="showSiswaModal"
    class="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    @click.self="showSiswaModal = false"
  >
    <div
      class="w-full max-w-4xl backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden transform transition-all duration-300 scale-100"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <i class="ri-user-search-line text-2xl text-white"></i>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white">Pilih Siswa</h3>
              <p class="text-blue-100 text-sm">Cari dan pilih siswa untuk absensi</p>
            </div>
          </div>
          <button
            @click="showSiswaModal = false"
            class="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200"
          >
            <i class="ri-close-line text-xl text-white"></i>
          </button>
        </div>
      </div>

      <!-- Search and Table -->
      <div class="p-8">
        <!-- Search -->
        <div class="mb-6">
          <div class="relative">
            <input
              v-model="searchNama"
              type="text"
              placeholder="Cari nama siswa..."
              class="w-full px-4 py-3 pl-12 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400"
            />
            <i class="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>

        <!-- Table -->
        <div class="bg-white/30 dark:bg-gray-800/30 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          <div class="max-h-80 overflow-y-auto">
            <table class="w-full">
              <thead class="bg-gray-50/50 dark:bg-gray-700/50 sticky top-0">
                <tr>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <i class="ri-user-line mr-2"></i>Nama
                  </th>
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <i class="ri-id-card-line mr-2"></i>NISN
                  </th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <i class="ri-settings-line mr-2"></i>Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                <tr 
                  v-for="s in filteredSiswa" 
                  :key="s.id" 
                  class="hover:bg-blue-50/50 dark:hover:bg-gray-700/30 transition-colors duration-200"
                >
                  <td class="px-6 py-4 text-gray-900 dark:text-gray-100 font-medium">
                    {{ s.nama }}
                  </td>
                  <td class="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {{ s.nisn }}
                  </td>
                  <td class="px-6 py-4 text-center">
                    <button 
                      @click="pilihSiswa(s)" 
                      class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center space-x-2 mx-auto"
                    >
                      <i class="ri-check-line"></i>
                      <span>Pilih</span>
                    </button>
                  </td>
                </tr>
                <tr v-if="filteredSiswa.length === 0">
                  <td colspan="3" class="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    <i class="ri-user-search-line text-4xl mb-4 block mx-auto opacity-50"></i>
                    <p class="text-lg font-medium">Siswa tidak ditemukan</p>
                    <p class="text-sm">Coba gunakan kata kunci yang berbeda</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end mt-6">
          <button
            @click="showSiswaModal = false"
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
import { ref, computed } from 'vue' 

const emit = defineEmits(['cancel', 'save'])

const props = defineProps({
  show: Boolean,
  form: Object,
  siswaList: Array,
  kelasList: Array,
  guruList: Array,
})

const showSiswaModal = ref(false)
const searchNama = ref('')

const selectedSiswa = computed(() => props.siswaList.find((s) => s.id === props.form.siswa_id))

const filteredSiswa = computed(() =>
  props.siswaList.filter((s) => s.nama.toLowerCase().includes(searchNama.value.toLowerCase())),
)

function pilihSiswa(siswa) {
  props.form.siswa_id = siswa.id
  showSiswaModal.value = false
  searchNama.value = ''
}

function onCancel() {
  emit('cancel')
}

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
</style>