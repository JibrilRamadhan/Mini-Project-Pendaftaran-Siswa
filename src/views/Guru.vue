<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import ModalFormGuru from '@/components/ModalFormGuru.vue'
import useGuru from '@/composables/useGuru.js'
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
} = useGuru()

const { query: searchQuery, filtered: filteredData } = useSearch(data, [
  'nama_guru', 'nip', 'alamat', 'email', 'no_telp', 'jenis_kelamin'
])

const actionRef = ref(null)

const totalGuru = computed(() => data.value.length)
const guruLaki = computed(() =>
  data.value.filter(guru => guru.jenis_kelamin === 'Laki-laki').length
)
const guruPerempuan = computed(() =>
  data.value.filter(guru => guru.jenis_kelamin === 'Perempuan').length
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

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100 dark:from-gray-900 dark:via-slate-900 dark:to-emerald-950 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- HEADER SECTION WITH GLASS EFFECT -->
      <div class="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-8 mb-8">
        <div class="flex justify-between items-center">
          <div class="space-y-2">
            <h1 class="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Data Guru
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-lg">Kelola informasi tenaga pendidik dengan mudah dan efisien</p>
          </div>
          
          <button 
            @click="tambahBaru" 
            class="group relative px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div class="relative flex items-center space-x-2">
              <i class="ri-add-line text-xl"></i>
              <span>Tambah Guru</span>
            </div>
          </button>
        </div>
        
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mt-8">
          <!-- Total Guru -->
          <div
            class="relative p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg overflow-hidden text-white transform hover:scale-[1.02] transition-all duration-300"
          >
            <div class="absolute -top-4 -right-4 opacity-30 text-7xl">
              <i class="ri-group-line"></i>
            </div>
            <div class="z-10 relative">
              <p class="text-sm font-semibold uppercase tracking-wide">Total Guru</p>
              <h2 class="text-4xl font-extrabold mt-1">{{ totalGuru }}</h2>
              <p class="text-sm opacity-80 mt-1">Jumlah seluruh Guru terdaftar</p>
            </div>
          </div>
          <!-- Guru Laki-laki -->
          <div
            class="relative p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg overflow-hidden text-white transform hover:scale-[1.02] transition-all duration-300"
          >
            <div class="absolute -top-4 -right-4 opacity-30 text-7xl">
              <i class="ri-men-line"></i>
            </div>
            <div class="z-10 relative">
              <p class="text-sm font-semibold uppercase tracking-wide">Laki-laki</p>
              <h2 class="text-4xl font-extrabold mt-1">{{ guruLaki }}</h2>
              <p class="text-sm opacity-80 mt-1">Jumlah Guru laki-laki</p>
            </div>
          </div>

          <!-- Guru Perempuan -->
          <div
            class="relative p-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl shadow-lg overflow-hidden text-white transform hover:scale-[1.02] transition-all duration-300"
          >
            <div class="absolute -top-4 -right-4 opacity-30 text-7xl">
              <i class="ri-women-line"></i>
            </div>
            <div class="z-10 relative">
              <p class="text-sm font-semibold uppercase tracking-wide">Perempuan</p>
              <h2 class="text-4xl font-extrabold mt-1">{{ guruPerempuan }}</h2>
              <p class="text-sm opacity-80 mt-1">Jumlah Guru perempuan</p>
            </div>
          </div>
        </div>
      </div>

      <!-- TABLE CONTAINER WITH ADVANCED GLASSMORPHISM -->
      <div class="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden">
        <!-- Table Header with Gradient -->
        <div class="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6 flex justify-between items-center">
          <h3 class="text-2xl font-bold text-white flex items-center">
            <i class="ri-team-line mr-3"></i>
            Daftar Tenaga Pendidik
          </h3>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama, NIP, alamat, email, telepon..."
            class="px-4 py-2 rounded-xl border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        <!-- Enhanced Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gradient-to-r from-slate-100 to-gray-100 dark:from-gray-800 dark:to-slate-800">
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-emerald-200 dark:border-emerald-800">
                  <div class="flex items-center space-x-2">
                    <i class="ri-hashtag text-emerald-600"></i>
                    <span>No</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-emerald-200 dark:border-emerald-800">
                  <div class="flex items-center space-x-2">
                    <i class="ri-id-card-line text-emerald-600"></i>
                    <span>NIP</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-emerald-200 dark:border-emerald-800">
                  <div class="flex items-center space-x-2">
                    <i class="ri-user-star-line text-emerald-600"></i>
                    <span>Nama Guru</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-emerald-200 dark:border-emerald-800">
                  <div class="flex items-center space-x-2">
                    <i class="ri-user-heart-line text-emerald-600"></i>
                    <span>Jenis Kelamin</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-emerald-200 dark:border-emerald-800">
                  <div class="flex items-center space-x-2">
                    <i class="ri-user-heart-line text-emerald-600"></i>
                    <span>Tanggal Lahir</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-emerald-200 dark:border-emerald-800">
                  <div class="flex items-center space-x-2">
                    <i class="ri-user-heart-line text-emerald-600"></i>
                    <span>Alamat</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-emerald-200 dark:border-emerald-800">
                  <div class="flex items-center space-x-2">
                    <i class="ri-phone-line text-emerald-600"></i>
                    <span>No Telepon</span>
                  </div>
                </th>
                <th class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-emerald-200 dark:border-emerald-800">
                  <div class="flex items-center space-x-2">
                    <i class="ri-mail-line text-emerald-600"></i>
                    <span>Email</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
  <tr
    v-for="(item, index) in filteredData"
    :key="item.id_guru"
    @click="pilihItem(item)"
    :class="[
      'cursor-pointer transition-all duration-300 hover:shadow-lg',
      selectedItem?.id_guru === item.id_guru
        ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/30 dark:via-teal-900/30 dark:to-cyan-900/30 shadow-xl border-l-4 border-emerald-500 transform scale-[1.02]'
        : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-emerald-50 dark:hover:from-gray-800 dark:hover:to-slate-800'
    ]"
  >
    <!-- No -->
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-lg font-bold text-black dark:text-white">{{ index + 1 }}</div>
    </td>

    <!-- NIP -->
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm font-bold text-gray-900 dark:text-gray-100">
        {{ item.nip }}
      </div>
    </td>

    <!-- Nama -->
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
          {{ item.nama_guru.charAt(0).toUpperCase() }}
        </div>
        <div>
          <div class="text-sm font-bold text-gray-900 dark:text-gray-100">{{ item.nama_guru }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
            <i class="ri-graduation-cap-line mr-1"></i>Tenaga Pendidik
          </div>
        </div>
      </div>
    </td>

    <!-- Jenis Kelamin -->
    <td class="px-6 py-4 whitespace-nowrap">
      <span :class="[
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
        item.jenis_kelamin === 'Laki-laki' 
          ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200' 
          : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
      ]">
        <i :class="item.jenis_kelamin === 'Laki-laki' ? 'ri-men-line' : 'ri-women-line'" class="mr-1"></i>
        {{ item.jenis_kelamin }}
      </span>
    </td>

    <!-- Tanggal Lahir -->
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
        <i class="ri-calendar-2-line mr-1"></i>
        {{ item.tgl_lahir }}
      </div>
    </td>

    <!-- Alamat -->
    <td class="px-6 py-4 whitespace-nowrap max-w-xs truncate">
      <div class="text-sm text-gray-900 dark:text-gray-100">{{ item.alamat }}</div>
      <div class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
        <i class="ri-map-pin-line mr-1"></i>Alamat Rumah
      </div>
    </td>

    <!-- No Telepon -->
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div class="w-10 h-10 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full flex items-center justify-center mr-3">
          <i class="ri-phone-fill text-white"></i>
        </div>
        <div>
          <div class="text-sm font-medium text-gray-900 dark:text-gray-100 font-mono">{{ item.no_telp }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">Kontak Aktif</div>
        </div>
      </div>
    </td>

    <!-- Email -->
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div class="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mr-3">
          <i class="ri-mail-fill text-white"></i>
        </div>
        <div>
          <div class="text-sm font-medium text-gray-900 dark:text-gray-100 max-w-xs truncate">{{ item.email }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">Email Resmi</div>
        </div>
      </div>
    </td>
  </tr>
</tbody>

          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredData.length === 0" class="text-center py-16">
          <div class="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-emerald-100 to-teal-200 dark:from-emerald-700 dark:to-teal-800 rounded-full flex items-center justify-center">
            <i class="ri-team-line text-6xl text-emerald-500 dark:text-emerald-400"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">Belum Ada Data Guru</h3>
          <p class="text-gray-500 dark:text-gray-500 mb-6">Mulai tambahkan data guru untuk melihat informasi di sini</p>
          <button @click="tambahBaru" class="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-lg transition-all duration-300">
            <i class="ri-add-line mr-2"></i>
            Tambah Guru Pertama
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
              <div class="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                {{ selectedItem.nama_guru.charAt(0).toUpperCase() }}
              </div>
              <div>
                <h4 class="font-bold text-gray-900 dark:text-gray-100">{{ selectedItem.nama_guru }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <i class="ri-vip-crown-line mr-1"></i>
                  {{ selectedItem.nip }}
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
              class="group flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold min-w-[160px]"
            >
              <i class="ri-eye-line text-xl"></i>
              <span>Lihat</span>
            </button>

            <button 
              @click="() => { hapusItem(selectedItem.id_guru); clearSelected() }" 
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

    <ModalFormGuru
      :show="showForm"
      :mode="mode"
      :readonly="readonly"
      :form="form"
      :errors="errors"
      @cancel="batal"
      @save="simpan"
    />
  </div>
</template>

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
  background: linear-gradient(135deg, #10b981, #14b8a6);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #059669, #0d9488);
}

/* Floating animation */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.group:hover {
  animation: float 2s ease-in-out infinite;
}

/* Professional badge animation */
@keyframes shine {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.group:hover .ri-vip-crown-line {
  animation: shine 2s ease-in-out infinite;
}
</style>