<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ModalForm from '../components/ModalsFormSiswa.vue'
import useSiswa from '@/composables/useSiswa'

const {
  data,
  showForm,
  mode,
  readonly,
  form,
  errors,
  selectedItem,
  lihatItem,
  tambahBaru,
  editItem,
  hapusItem,
  simpan,
  batal,
  pilihItem,
  clearSelected,
} = useSiswa()

const actionRef = ref(null)

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
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-5"
  >
    <div class="max-w-7xl mx-auto">
      <!-- HEADER SECTION WITH GLASS EFFECT -->
      <div
        class="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-8 mb-8"
      >
        <div class="flex justify-between items-center">
          <div class="space-y-2">
            <h1
              class="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent"
            >
              Data Siswa
            </h1>
            <p class="text-gray-600 dark:text-gray-400 text-lg">
              Kelola informasi siswa dengan mudah dan efisien
            </p>
          </div>

          <button
            @click="tambahBaru"
            class="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold text-lg"
          >
            <div
              class="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"
            ></div>
            <div class="relative flex items-center space-x-2">
              <i class="ri-add-line text-xl"></i>
              <span>Tambah Siswa</span>
            </div>
          </button>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div class="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-4 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-blue-100">Total Siswa</p>
                <p class="text-2xl font-bold">{{ data.length }}</p>
              </div>
              <i class="ri-user-line text-3xl text-blue-200"></i>
            </div>
          </div>
          <div class="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-4 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-emerald-100">Siswa Aktif</p>
                <p class="text-2xl font-bold">{{ data.length }}</p>
              </div>
              <i class="ri-user-check-line text-3xl text-emerald-200"></i>
            </div>
          </div>
          <div class="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-4 text-white">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-purple-100">Data Lengkap</p>
                <p class="text-2xl font-bold">100%</p>
              </div>
              <i class="ri-database-line text-3xl text-purple-200"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- TABLE CONTAINER WITH ADVANCED GLASSMORPHISM -->
      <div
        class="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden"
      >
        <!-- Table Header with Gradient -->
        <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-6">
          <h3 class="text-2xl font-bold text-white flex items-center">
            <i class="ri-table-line mr-3"></i>
            Daftar Siswa Terdaftar
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
                  class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-indigo-200 dark:border-indigo-800"
                >
                  <div class="flex items-center space-x-2">
                    <i class="ri-hashtag text-indigo-600"></i>
                    <span>No</span>
                  </div>
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-indigo-200 dark:border-indigo-800"
                >
                  <div class="flex items-center space-x-2">
                    <i class="ri-id-card-line text-indigo-600"></i>
                    <span>NISN</span>
                  </div>
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-indigo-200 dark:border-indigo-800"
                >
                  <div class="flex items-center space-x-2">
                    <i class="ri-user-line text-indigo-600"></i>
                    <span>Nama</span>
                  </div>
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-indigo-200 dark:border-indigo-800"
                >
                  <div class="flex items-center space-x-2">
                    <i class="ri-map-pin-line text-indigo-600"></i>
                    <span>Alamat</span>
                  </div>
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-indigo-200 dark:border-indigo-800"
                >
                  <div class="flex items-center space-x-2">
                    <i class="ri-calendar-line text-indigo-600"></i>
                    <span>Tgl Lahir</span>
                  </div>
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-indigo-200 dark:border-indigo-800"
                >
                  <div class="flex items-center space-x-2">
                    <i class="ri-user-heart-line text-indigo-600"></i>
                    <span>JK</span>
                  </div>
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-indigo-200 dark:border-indigo-800"
                >
                  <div class="flex items-center space-x-2">
                    <i class="ri-phone-line text-indigo-600"></i>
                    <span>No Tlp</span>
                  </div>
                </th>
                <th
                  class="px-6 py-4 text-left text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider border-b-2 border-indigo-200 dark:border-indigo-800"
                >
                  <div class="flex items-center space-x-2">
                    <i class="ri-parent-line text-indigo-600"></i>
                    <span>Nama Wali</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr
                v-for="(item, index) in data"
                :key="item.id"
                @click="pilihItem(item)"
                :class="[
                  'cursor-pointer transition-all duration-300 hover:shadow-lg',
                  selectedItem?.id === item.id
                    ? 'bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-blue-900/30 shadow-xl border-l-4 border-indigo-500 transform scale-[1.02]'
                    : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-slate-800',
                ]"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center text-gray-900 dark:text-white font-bold text-lg"
                    >
                      {{ index + 1 }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-0">
                      <div class="text-sm font-bold text-gray-900 dark:text-gray-100">
                        {{ item.nisn }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div
                      class="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold mr-3"
                    >
                      {{ item.nama.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <div class="text-sm font-bold text-gray-900 dark:text-gray-100">
                        {{ item.nama }}
                      </div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">Siswa</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-gray-100 max-w-xs truncate">
                    {{ item.alamat }}
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Alamat Rumah</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    <i class="ri-calendar-2-line mr-1"></i>
                    {{ item.tgl_lahir }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                      item.jk === 'L'
                        ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'
                        : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
                    ]"
                  >
                    <i :class="item.jk === 'L' ? 'ri-men-line' : 'ri-women-line'" class="mr-1"></i>
                    {{ item.jk === 'L' ? 'Laki-laki' : 'Perempuan' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <i class="ri-phone-fill text-green-500 mr-2"></i>
                    <span class="text-sm text-gray-900 dark:text-gray-100 font-mono">{{
                      item.no_tlp
                    }}</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div
                      class="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3"
                    >
                      {{ item.nama_wali.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <div class="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {{ item.nama_wali }}
                      </div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">Wali Siswa</div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="data.length === 0" class="text-center py-16">
          <div
            class="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-full flex items-center justify-center"
          >
            <i class="ri-user-search-line text-6xl text-gray-400"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
            Belum Ada Data Siswa
          </h3>
          <p class="text-gray-500 dark:text-gray-500 mb-6">
            Mulai tambahkan data siswa untuk melihat informasi di sini
          </p>
          <button
            @click="tambahBaru"
            class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
          >
            <i class="ri-add-line mr-2"></i>
            Tambah Siswa Pertama
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
        <div
          v-if="selectedItem"
          ref="actionRef"
          class="fixed bottom-8 right-8 flex flex-col space-y-3"
        >
          <!-- Selected Item Info Card -->
          <div
            class="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-2xl border border-white/30 dark:border-gray-700/30 p-4 mb-4"
          >
            <div class="flex items-center space-x-3">
              <div
                class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold"
              >
                {{ selectedItem.nama.charAt(0).toUpperCase() }}
              </div>
              <div>
                <h4 class="font-bold text-gray-900 dark:text-gray-100">{{ selectedItem.nama }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ selectedItem.nisn }}</p>
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

    <ModalForm
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
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
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
</style>
