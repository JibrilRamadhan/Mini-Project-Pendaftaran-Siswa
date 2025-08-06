<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import ModalForm from '../components/ModalsFormSiswa.vue'
import useSiswa from '@/composables/useSiswa'
import Swal from 'sweetalert2'

// Ambil semua dari useSiswa sekali saja
const {
  data,
  showForm,
  mode,
  readonly,
  form,
  errors,
  selectedItem,
  paginatedData,
  currentPage,
  totalPages,
  itemsPerPage,
  paginationInfo,
  pageNumbers,
  goToPage,
  nextPage,
  prevPage,
  changeItemsPerPage,
  lihatItem,
  tambahBaru,
  editItem,
  hapusItem,
  simpan,
  batal,
  pilihItem,
  clearSelected,
  getNamaKelas,
  kelas,
} = useSiswa()

const actionRef = ref(null)

// ⛳ Gunakan langsung data untuk statistik
const siswaLaki = computed(() => data.value?.filter((s) => s.jk === 'L').length || 0)

const siswaPerempuan = computed(() => data.value?.filter((s) => s.jk === 'P').length || 0)

const totalSiswa = computed(() => data.value?.length || 0)

// Enhanced functions with SweetAlert2
async function handleTambahBaru() {
  const result = await Swal.fire({
    title: 'Tambah Siswa Baru',
    text: 'Apakah Anda ingin menambahkan data siswa baru?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#6366f1',
    cancelButtonColor: '#d1d5db',
    confirmButtonText: 'Ya, Tambah',
    cancelButtonText: 'Batal',
    showClass: {
      popup: 'animate__animated animate__fadeInUp'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutDown'
    }
  })

  if (result.isConfirmed) {
    tambahBaru()
    Swal.fire({
      icon: 'info',
      title: 'Form Siap',
      text: 'Silakan lengkapi data siswa baru',
      confirmButtonColor: '#6366f1',
      timer: 1500,
      showConfirmButton: false
    })
  }
}

async function handleEditItem(item) {
  const result = await Swal.fire({
    title: 'Edit Data Siswa',
    html: `
      <div class="text-left">
        <p class="mb-2">Anda akan mengedit data siswa:</p>
        <div class="bg-gray-100 p-3 rounded-lg">
          <p><strong>Nama:</strong> ${item.nama}</p>
          <p><strong>NISN:</strong> ${item.nisn}</p>
        </div>
        <p class="mt-2 text-sm text-gray-600">Pastikan perubahan data sudah benar</p>
      </div>
    `,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#f59e0b',
    cancelButtonColor: '#d1d5db',
    confirmButtonText: 'Ya, Edit',
    cancelButtonText: 'Batal',
    showClass: {
      popup: 'animate__animated animate__fadeInUp'
    }
  })

  if (result.isConfirmed) {
    editItem(item)
    Swal.fire({
      icon: 'info',
      title: 'Mode Edit Aktif',
      text: 'Silakan ubah data yang diperlukan',
      confirmButtonColor: '#f59e0b',
      timer: 1500,
      showConfirmButton: false
    })
  }
}

async function handleLihatItem(item) {
  const result = await Swal.fire({
    title: 'Lihat Detail Siswa',
    html: `
      <div class="text-left">
        <p class="mb-2">Anda akan melihat detail lengkap:</p>
        <div class="bg-blue-50 p-3 rounded-lg">
          <p><strong>Nama:</strong> ${item.nama}</p>
          <p><strong>NISN:</strong> ${item.nisn}</p>
          <p><strong>Jenis Kelamin:</strong> ${item.jk === 'L' ? 'Laki-laki' : 'Perempuan'}</p>
        </div>
      </div>
    `,
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#10b981',
    cancelButtonColor: '#d1d5db',
    confirmButtonText: 'Lihat Detail',
    cancelButtonText: 'Batal'
  })

  if (result.isConfirmed) {
    lihatItem(item)
  }
}

async function handleHapusItem(itemId, itemNama) {
  // First confirmation
  const firstResult = await Swal.fire({
    title: 'Hapus Data Siswa?',
    html: `
      <div class="text-left">
        <p class="mb-2">Anda akan menghapus data siswa:</p>
        <div class="bg-red-50 p-3 rounded-lg border-l-4 border-red-500">
          <p><strong>Nama:</strong> ${itemNama}</p>
        </div>
        <p class="mt-2 text-sm text-red-600">⚠️ Data yang dihapus tidak dapat dikembalikan!</p>
      </div>
    `,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#d1d5db',
    confirmButtonText: 'Ya, Hapus',
    cancelButtonText: 'Batal',
    showClass: {
      popup: 'animate__animated animate__shakeX'
    }
  })

  if (firstResult.isConfirmed) {
    // Second confirmation for critical action
    const secondResult = await Swal.fire({
      title: 'Konfirmasi Terakhir',
      text: 'Apakah Anda benar-benar yakin ingin menghapus data ini?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'YA, HAPUS SEKARANG!',
      cancelButtonText: 'Tidak, Batalkan',
      reverseButtons: true,
      focusCancel: true
    })

    if (secondResult.isConfirmed) {
      try {
        await hapusItem(itemId)
        clearSelected()
        
        Swal.fire({
          icon: 'success',
          title: 'Berhasil Dihapus!',
          text: `Data siswa ${itemNama} telah dihapus`,
          confirmButtonColor: '#10b981',
          timer: 2000,
          showConfirmButton: false
        })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Gagal Menghapus',
          text: 'Terjadi kesalahan saat menghapus data',
          confirmButtonColor: '#ef4444'
        })
      }
    }
  }
}

async function handleClearSelected() {
  if (selectedItem.value) {
    const result = await Swal.fire({
      title: 'Batalkan Pilihan?',
      text: 'Anda akan membatalkan pilihan siswa yang sedang dipilih',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#6b7280',
      cancelButtonColor: '#d1d5db',
      confirmButtonText: 'Ya, Batalkan',
      cancelButtonText: 'Tidak',
      timer: 5000,
      timerProgressBar: true
    })

    if (result.isConfirmed) {
      clearSelected()
      Swal.fire({
        icon: 'info',
        title: 'Pilihan Dibatalkan',
        text: 'Tidak ada siswa yang dipilih',
        confirmButtonColor: '#6b7280',
        timer: 1500,
        showConfirmButton: false
      })
    }
  }
}

// Enhanced pagination with confirmation for large jumps
async function handleGoToPage(page) {
  const currentPageValue = currentPage.value
  const pageDifference = Math.abs(page - currentPageValue)
  
  if (pageDifference > 5) {
    const result = await Swal.fire({
      title: 'Lompat Halaman',
      text: `Anda akan berpindah dari halaman ${currentPageValue} ke halaman ${page}`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#6366f1',
      cancelButtonColor: '#d1d5db',
      confirmButtonText: 'Ya, Lompat',
      cancelButtonText: 'Batal'
    })
    
    if (result.isConfirmed) {
      goToPage(page)
    }
  } else {
    goToPage(page)
  }
}

// klik di luar table = batal
function handleClickOutside(event) {
  if (
    actionRef.value &&
    !actionRef.value.contains(event.target) &&
    !event.target.closest('table') &&
    !event.target.closest('.modal')&&
    !event.target.closest('.pagination')
  ) {
    clearSelected()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  
  // Welcome message
  Swal.fire({
    icon: 'info',
    title: 'Selamat Datang!',
    text: 'Halaman Data Siswa siap digunakan',
    confirmButtonColor: '#6366f1',
    timer: 2000,
    showConfirmButton: false,
    toast: true,
    position: 'top-end'
  })
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
            @click="handleTambahBaru"
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
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 mt-8">
          <!-- Total Siswa -->
          <div
            class="relative p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg overflow-hidden text-white transform hover:scale-[1.02] transition-all duration-300"
          >
            <div class="absolute -top-4 -right-4 opacity-30 text-7xl">
              <i class="ri-group-line"></i>
            </div>
            <div class="z-10 relative">
              <p class="text-sm font-semibold uppercase tracking-wide">Total Siswa</p>
              <h2 class="text-4xl font-extrabold mt-1">{{ totalSiswa }}</h2>
              <p class="text-sm opacity-80 mt-1">Jumlah seluruh siswa terdaftar</p>
            </div>
          </div>
          <!-- Siswa Laki-laki -->
          <div
            class="relative p-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-lg overflow-hidden text-white transform hover:scale-[1.02] transition-all duration-300"
          >
            <div class="absolute -top-4 -right-4 opacity-30 text-7xl">
              <i class="ri-men-line"></i>
            </div>
            <div class="z-10 relative">
              <p class="text-sm font-semibold uppercase tracking-wide">Laki-laki</p>
              <h2 class="text-4xl font-extrabold mt-1">{{ siswaLaki }}</h2>
              <p class="text-sm opacity-80 mt-1">Jumlah siswa laki-laki</p>
            </div>
          </div>

          <!-- Siswa Perempuan -->
          <div
            class="relative p-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl shadow-lg overflow-hidden text-white transform hover:scale-[1.02] transition-all duration-300"
          >
            <div class="absolute -top-4 -right-4 opacity-30 text-7xl">
              <i class="ri-women-line"></i>
            </div>
            <div class="z-10 relative">
              <p class="text-sm font-semibold uppercase tracking-wide">Perempuan</p>
              <h2 class="text-4xl font-extrabold mt-1">{{ siswaPerempuan }}</h2>
              <p class="text-sm opacity-80 mt-1">Jumlah siswa perempuan</p>
            </div>
          </div>
        </div>
      </div>

      <!-- TABLE CONTAINER WITH ADVANCED GLASSMORPHISM -->
      <div
        class="backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/30 overflow-hidden"
      >
        <!-- Table Header -->
        <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-6">
          <h3 class="text-2xl font-bold text-white flex items-center">
            <i class="ri-table-line mr-3"></i>
            Daftar Siswa Terdaftar
          </h3>
        </div>

        <!-- Table Section -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-700 dark:text-gray-200">
            <thead>
              <tr
                class="bg-gradient-to-r from-slate-100 to-gray-100 dark:from-gray-800 dark:to-slate-800"
              >
                <th
                  class="px-5 py-4 whitespace-nowrap border-b-2 border-indigo-200 dark:border-indigo-800 font-bold uppercase tracking-wide"
                >
                  <i class="ri-hashtag text-indigo-600 mr-1"></i> No
                </th>
                <th
                  class="px-5 py-4 whitespace-nowrap border-b-2 border-indigo-200 dark:border-indigo-800 font-bold uppercase tracking-wide"
                >
                  <i class="ri-id-card-line text-indigo-600 mr-1"></i> NISN
                </th>
                <th
                  class="pl-12 px-5 py-4 whitespace-nowrap border-b-2 border-indigo-200 dark:border-indigo-800 font-bold uppercase tracking-wide min-w-[180px]"
                >
                  <i class="ri-user-line text-indigo-600 mr-1"></i> Nama
                </th>
                <th
                  class="px-5 py-4 whitespace-nowrap border-b-2 border-indigo-200 dark:border-indigo-800 font-bold uppercase tracking-wide min-w-[200px]"
                >
                  <i class="ri-map-pin-line text-indigo-600 mr-1"></i> Alamat
                </th>
                <th
                  class="px-5 py-4 whitespace-nowrap border-b-2 border-indigo-200 dark:border-indigo-800 font-bold uppercase tracking-wide"
                >
                  <i class="ri-calendar-line text-indigo-600 mr-1"></i> Tanggal Lahir
                </th>
                <th
                  class="px-5 py-4 whitespace-nowrap border-b-2 border-indigo-200 dark:border-indigo-800 font-bold uppercase tracking-wide"
                >
                  <i class="ri-user-heart-line text-indigo-600 mr-1"></i> Jenis Kelamin
                </th>
                <th
                  class="px-5 py-4 whitespace-nowrap border-b-2 border-indigo-200 dark:border-indigo-800 font-bold uppercase tracking-wide"
                >
                  <i class="ri-phone-line text-indigo-600 mr-1"></i> No Telepon
                </th>
                <th
                  class="px-5 py-4 whitespace-nowrap border-b-2 border-indigo-200 dark:border-indigo-800 font-bold uppercase tracking-wide min-w-[160px]"
                >
                  <i class="ri-parent-line text-indigo-600 mr-1"></i> Nama Wali
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr
                v-for="(item, index) in paginatedData"
                :key="item.id"
                @click="pilihItem(item)"
                :class="[
                  'cursor-pointer transition-all duration-300 hover:shadow-lg',
                  selectedItem?.id === item.id
                    ? 'bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-blue-900/30 shadow-xl border-l-4 border-indigo-500 transform scale-[1.02]'
                    : 'hover:bg-gradient-to-r hover:from-gray-50 hover:to-blue-50 dark:hover:from-gray-800 dark:hover:to-slate-800',
                ]"
              >
                <td class="px-5 py-4 whitespace-nowrap font-bold text-gray-800 dark:text-white">
                  {{ (currentPage - 1) * itemsPerPage + index + 1 }}
                </td>
                <td class="px-5 py-4 whitespace-nowrap">
                  <span class="font-mono font-semibold">{{ item.nisn }}</span>
                </td>
                <td class="px-5 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold"
                    >
                      {{ item.nama.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <div class="font-bold">{{ item.nama }}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">Siswa</div>
                    </div>
                  </div>
                </td>
                <td class="px-5 py-4 whitespace-nowrap">
                  <div class="truncate max-w-xs">{{ item.alamat }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">Alamat Rumah</div>
                </td>
                <td class="px-5 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs"
                  >
                    <i class="ri-calendar-2-line mr-1"></i> {{ item.tgl_lahir }}
                  </span>
                </td>
                <td class="px-5 py-4 whitespace-nowrap">
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
                <td class="px-5 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-2">
                    <i class="ri-phone-fill text-green-500"></i>
                    <span class="font-mono">{{ item.no_tlp }}</span>
                  </div>
                </td>
                <td class="px-5 py-4 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    >
                      {{ item.nama_wali.charAt(0).toUpperCase() }}
                    </div>
                    <div>
                      <div class="font-medium">{{ item.nama_wali }}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">Wali Siswa</div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

         <!-- Pagination Section -->
         <div v-if="totalPages > 1" class="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <!-- Pagination Info -->
            <div class="flex items-center text-sm text-gray-700 dark:text-gray-300">
              <span>
                Menampilkan 
                <span class="font-semibold">{{ paginationInfo.start }}</span>
                sampai 
                <span class="font-semibold">{{ paginationInfo.end }}</span>
                dari 
                <span class="font-semibold">{{ paginationInfo.total }}</span>
                hasil
              </span>
            </div>

            <!-- Pagination Controls -->
            <div class="flex items-center space-x-2 pagination">
              <!-- Previous Button -->
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                :class="[
                  'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  currentPage === 1
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400'
                ]"
              >
                <i class="ri-arrow-left-s-line"></i>
                Previous
              </button>

              <!-- Page Numbers -->
              <div class="flex items-center space-x-1">
                <template v-for="page in pageNumbers" :key="page">
                  <button
                    v-if="page !== '...'"
                    @click="handleGoToPage(page)"
                    :class="[
                      'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                      currentPage === page
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400'
                    ]"
                  >
                    {{ page }}
                  </button>
                  <span v-else class="px-2 py-2 text-gray-500">...</span>
                </template>
              </div>

              <!-- Next Button -->
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                :class="[
                  'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  currentPage === totalPages
                    ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400'
                ]"
              >
                Next
                <i class="ri-arrow-right-s-line"></i>
              </button>
            </div>
          </div>
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
            @click="handleTambahBaru"
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
              @click="handleEditItem(selectedItem)"
              class="group flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold min-w-[160px]"
            >
              <i class="ri-edit-line text-xl"></i>
              <span>Edit</span>
            </button>

            <button
              @click="handleLihatItem(selectedItem)"
              class="group flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold min-w-[160px]"
            >
              <i class="ri-eye-line text-xl"></i>
              <span>Lihat</span>
            </button>

            <button
              @click="handleHapusItem(selectedItem.id, selectedItem.nama)"
              class="group flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-semibold min-w-[160px]"
            >
              <i class="ri-delete-bin-line text-xl"></i>
              <span>Hapus</span>
            </button>

            <button
              @click="handleClearSelected"
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
      :dataKelas="kelas"
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

/* SweetAlert2 custom animations */
@keyframes shake {
  0%, 20%, 40%, 60%, 80%, 100% {
    transform: translateX(0);
  }
  10%, 30%, 50%, 70%, 90% {
    transform: translateX(-10px);
  }
}

.animate__shakeX {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

.animate__fadeInUp {
  animation: fadeInUp 0.5s ease-out;
}

.animate__fadeOutDown {
  animation: fadeOutDown 0.5s ease-in;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes fadeOutDown {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(0, 40px, 0);
  }
}
</style>