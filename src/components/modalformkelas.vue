<script setup>
import guruList from '@/stores/guru.json'
import useSiswa from '../composables/usesiswa'
import { ref, computed, watch } from 'vue'

const emit = defineEmits(['cancel', 'save'])

const props = defineProps({
  show: Boolean,
  mode: String,
  readonly: Boolean,
  form: Object,
  errors: Object,
  selectedItem: Object,
  siswaDiKelas: Array,
})

const localReadonly = ref(false)
const selected = ref(null)

watch(
  () => props.show,
  (val) => {
    if (val) {
      localReadonly.value = props.readonly
      selected.value = props.selectedItem
    }
  },
  { immediate: true } // supaya langsung sinkron juga saat pertama kali
)

// === Fitur daftar siswa ===
const search = ref('')
const filteredSiswa = computed(() => {
  if (!search.value) return props.siswaDiKelas || []
  return (props.siswaDiKelas || []).filter((siswa) =>
    siswa.nama.toLowerCase().includes(search.value.toLowerCase())
  )
})

// === Tambah Siswa (simulasi) ===
const showAddForm = ref(false)
const newSiswaNama = ref('')
const errorTambah = ref('')

function tambahSiswa() {
  if (!newSiswaNama.value.trim()) {
    errorTambah.value = 'Nama siswa wajib diisi'
    return
  }
  alert(`(Simulasi) Menambahkan siswa: ${newSiswaNama.value}`)
  newSiswaNama.value = ''
  errorTambah.value = ''
  showAddForm.value = false
}

// === Data Wali Kelas (Guru) ===
const daftarGuru = guruList

function onCancel() {
  emit('cancel')
}
function onSave() {
  emit('save')
}
</script>

<template>
  <!-- Backdrop dengan animasi fade -->
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    leave-active-class="transition-all duration-200 ease-in"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-md p-4"
    >
      <!-- Modal dengan animasi scale dan slide -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 transform scale-95 translate-y-4"
        enter-to-class="opacity-100 transform scale-100 translate-y-0"
        leave-from-class="opacity-100 transform scale-100 translate-y-0"
        leave-to-class="opacity-0 transform scale-95 translate-y-4"
      >
        <div
          v-if="show"
          class="bg-white dark:bg-gray-900 w-full max-w-3xl rounded-3xl shadow-2xl relative"
          style="max-height: 90vh; overflow-y: auto;"
        >
          <!-- Header dengan gradient -->
          <div
            class="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-800 dark:to-purple-800 px-8 py-6 flex items-center justify-between"
          >
            <div class="flex items-center space-x-3">
              <!-- Icon berdasarkan mode -->
              <div
                class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              >
                <svg
                  v-if="mode === 'edit' && localReadonly"
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
                <svg
                  v-else-if="mode === 'edit'"
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  ></path>
                </svg>
                <svg
                  v-else
                  class="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 class="text-xl font-bold text-white">
                  {{
                    mode === 'edit' && localReadonly
                      ? 'Detail Kelas'
                      : mode === 'edit'
                        ? 'Edit Kelas'
                        : 'Kelas Baru'
                  }}
                </h3>
                <p class="text-indigo-100 text-sm">
                  {{
                    mode === 'edit' && localReadonly
                      ? 'Lihat informasi lengkap kelas'
                      : mode === 'edit'
                        ? 'Perbarui informasi kelas'
                        : 'Tambahkan kelas baru ke sistem'
                  }}
                </p>
              </div>
            </div>

            <!-- Close button -->
            <button
              @click="onCancel"
              class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 group"
              style="z-index: 52;"
            >
              <svg
                class="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="p-8">
            <!-- Form Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <!-- Nama Kelas -->
              <div class="group">
                <label
                  class="block mb-2 font-semibold text-gray-700 dark:text-gray-200 flex items-center"
                >
                  <svg
                    class="w-4 h-4 mr-2 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    ></path>
                  </svg>
                  Nama Kelas
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model="form.nama_kelas"
                    type="text"
                    :disabled="localReadonly"
                    class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed group-hover:border-gray-300"
                    placeholder="Masukkan nama kelas"
                  />
                  <div
                    v-if="!localReadonly"
                    class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                  >
                    <svg
                      class="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5"
                      ></path>
                    </svg>
                  </div>
                </div>
                <Transition
                  enter-active-class="transition-all duration-200 ease-out"
                  leave-active-class="transition-all duration-150 ease-in"
                  enter-from-class="opacity-0 transform -translate-y-1"
                  enter-to-class="opacity-100 transform translate-y-0"
                  leave-from-class="opacity-100 transform translate-y-0"
                  leave-to-class="opacity-0 transform -translate-y-1"
                >
                  <p v-if="errors.nama_kelas" class="text-red-500 text-sm mt-2 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    {{ errors.nama_kelas }}
                  </p>
                </Transition>
              </div>

              <!-- Kode Kelas -->
              <div class="group">
                <label
                  class="block mb-2 font-semibold text-gray-700 dark:text-gray-200 flex items-center"
                >
                  <svg
                    class="w-4 h-4 mr-2 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                    ></path>
                  </svg>
                  Kode Kelas
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model="form.kode_kelas"
                    type="text"
                    :disabled="localReadonly"
                    class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed group-hover:border-gray-300"
                    placeholder="Contoh: X-IPA-1"
                  />
                </div>
                <Transition
                  enter-active-class="transition-all duration-200 ease-out"
                  leave-active-class="transition-all duration-150 ease-in"
                  enter-from-class="opacity-0 transform -translate-y-1"
                  enter-to-class="opacity-100 transform translate-y-0"
                  leave-from-class="opacity-100 transform translate-y-0"
                  leave-to-class="opacity-0 transform -translate-y-1"
                >
                  <p v-if="errors.kode_kelas" class="text-red-500 text-sm mt-2 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    {{ errors.kode_kelas }}
                  </p>
                </Transition>
              </div>

              <!-- Kapasitas -->
              <div class="group">
                <label
                  class="block mb-2 font-semibold text-gray-700 dark:text-gray-200 flex items-center"
                >
                  <svg
                    class="w-4 h-4 mr-2 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                  Kapasitas
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model.number="form.kapasitas"
                    type="number"
                    min="1"
                    :disabled="localReadonly"
                    class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed group-hover:border-gray-300"
                    placeholder="Jumlah siswa maksimal"
                  />
                  <div
                    class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                  >
                    <span class="text-gray-400 text-sm">siswa</span>
                  </div>
                </div>
                <Transition
                  enter-active-class="transition-all duration-200 ease-out"
                  leave-active-class="transition-all duration-150 ease-in"
                  enter-from-class="opacity-0 transform -translate-y-1"
                  enter-to-class="opacity-100 transform translate-y-0"
                  leave-from-class="opacity-100 transform translate-y-0"
                  leave-to-class="opacity-0 transform -translate-y-1"
                >
                  <p v-if="errors.kapasitas" class="text-red-500 text-sm mt-2 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    {{ errors.kapasitas }}
                  </p>
                </Transition>
              </div>

              <!-- Wali Kelas -->
              <div class="group">
                <label
                  class="block mb-2 font-semibold text-gray-700 dark:text-gray-200 flex items-center"
                >
                  <svg
                    class="w-4 h-4 mr-2 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  Wali Kelas
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <div class="relative">
                  <select
                    v-model="form.id_guru"
                    :disabled="localReadonly"
                    class="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed group-hover:border-gray-300 appearance-none"
                  >
                    <option disabled value="" class="text-gray-400">-- Pilih Guru --</option>
                    <option
                      v-for="guru in daftarGuru"
                      :key="guru.id_guru"
                      :value="guru.id_guru"
                      class="text-gray-800 dark:text-gray-200"
                    >
                      {{ guru.nama_guru }} ({{ guru.nip }})
                    </option>
                  </select>
                  <div
                    class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                  >
                    <svg
                      class="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </div>
                </div>
                <Transition
                  enter-active-class="transition-all duration-200 ease-out"
                  leave-active-class="transition-all duration-150 ease-in"
                  enter-from-class="opacity-0 transform -translate-y-1"
                  enter-to-class="opacity-100 transform translate-y-0"
                  leave-from-class="opacity-100 transform translate-y-0"
                  leave-to-class="opacity-0 transform -translate-y-1"
                >
                  <p v-if="errors.id_guru" class="text-red-500 text-sm mt-2 flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    {{ errors.id_guru }}
                  </p>
                </Transition>
              </div>
            </div>

            <!-- Bagian Detail Siswa -->
            <Transition
              enter-active-class="transition-all duration-500 ease-out"
              leave-active-class="transition-all duration-300 ease-in"
              enter-from-class="opacity-0 transform translate-y-4"
              enter-to-class="opacity-100 transform translate-y-0"
              leave-from-class="opacity-100 transform translate-y-0"
              leave-to-class="opacity-0 transform translate-y-4"
            >
              <div
                v-if="localReadonly && selected"
                class="border-t mt-8 border-gray-200 dark:border-gray-700 pt-8"
              >
                <div class="flex items-center mb-6">
                  <div
                    class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center"
                  >
                    <svg
                      class="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                      ></path>
                    </svg>
                  </div>
                  <div class="ml-4">
                    <h4 class="text-xl font-bold text-gray-800 dark:text-gray-100">Daftar Siswa</h4>
                    <p class="text-gray-500 text-sm">
                      {{ filteredSiswa.length }} dari {{ (props.siswaDiKelas || []).length }} siswa
                    </p>
                  </div>
                </div>

                <!-- Search Bar -->
                <div class="relative mb-6">
                  <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg
                      class="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    v-model="search"
                    type="text"
                    placeholder="Cari nama siswa..."
                    @click.stop="console.log('Search input clicked')"
                    @input="console.log('Search input updated:', search)"
                    class="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50/50 dark:bg-gray-800/50 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                  />
                  <Transition
                    enter-active-class="transition-all duration-200 ease-out"
                    leave-active-class="transition-all duration-150 ease-in"
                    enter-from-class="opacity-0 scale-95"
                    enter-to-class="opacity-100 scale-100"
                    leave-from-class="opacity-100 scale-100"
                    leave-to-class="opacity-0 scale-95"
                  >
                    <div v-if="search" class="absolute inset-y-0 right-0 pr-4 flex items-center">
                      <button
                        @click="search = ''"
                        class="w-6 h-6 rounded-full bg-gray-300 hover:bg-gray-400 flex items-center justify-center transition-colors duration-200"
                      >
                        <svg
                          class="w-3 h-3 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </Transition>
                </div>

                <!-- Daftar Siswa -->
                <div
                  class="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 max-h-80 overflow-y-auto"
                >
                  <TransitionGroup
                    enter-active-class="transition-all duration-300 ease-out"
                    leave-active-class="transition-all duration-200 ease-in"
                    enter-from-class="opacity-0 transform translate-x-4"
                    enter-to-class="opacity-100 transform translate-x-0"
                    leave-from-class="opacity-100 transform translate-x-0"
                    leave-to-class="opacity-0 transform -translate-x-4"
                    move-class="transition-transform duration-300 ease-out"
                    tag="div"
                    class="space-y-3"
                  >
                    <div
                      v-for="(siswa, index) in filteredSiswa"
                      :key="siswa.id"
                      class="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700"
                    >
                      <div
                        class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-sm"
                      >
                        {{ index + 1 }}
                      </div>
                      <div class="ml-4 flex-1">
                        <p class="font-medium text-gray-800 dark:text-gray-200">{{ siswa.nama }}</p>
                        <p class="text-sm text-gray-500">Siswa Aktif</p>
                      </div>
                      <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                    </div>
                  </TransitionGroup>

                  <div v-if="filteredSiswa.length === 0" class="text-center py-12">
                    <svg
                      class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                    <p class="text-gray-500 text-lg font-medium">Tidak ditemukan siswa</p>
                    <p class="text-gray-400 text-sm">Coba gunakan kata kunci yang berbeda</p>
                  </div>
                </div>

                <!-- Form Tambah Siswa -->
                <div class="mt-8">
                  <button
                    @click.stop="showAddForm = !showAddForm"
                    class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <svg
                      class="w-5 h-5 mr-2 transition-transform duration-200"
                      :class="{ 'rotate-45': showAddForm }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 4v16m8-8H4"
                      ></path>
                    </svg>
                    {{ showAddForm ? 'Tutup Form' : 'Tambah Siswa' }}
                  </button>

                  <Transition
                    enter-active-class="transition-all duration-400 ease-out"
                    leave-active-class="transition-all duration-300 ease-in"
                    enter-from-class="opacity-0 transform translate-y-4 scale-95"
                    enter-to-class="opacity-100 transform translate-y-0 scale-100"
                    leave-from-class="opacity-100 transform translate-y-0 scale-100"
                    leave-to-class="opacity-0 transform translate-y-4 scale-95"
                  >
                    <div
                      v-if="showAddForm"
                      class="mt-6 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border border-emerald-200 dark:border-emerald-800"
                    >
                      <h5
                        class="text-lg font-semibold text-emerald-800 dark:text-emerald-200 mb-4 flex items-center"
                      >
                        <svg
                          class="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                          ></path>
                        </svg>
                        Tambah Siswa Baru
                      </h5>

                      <div class="space-y-4">
                        <div>
                          <label
                            class="block mb-2 font-medium text-emerald-700 dark:text-emerald-300"
                            >Nama Siswa</label
                          >
                          <input
                            v-model="newSiswaNama"
                            type="text"
                            placeholder="Masukkan nama lengkap siswa"
                            @click.stop
                            class="w-full px-4 py-3 border-2 border-emerald-200 dark:border-emerald-700 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-200"
                          />
                          <Transition
                            enter-active-class="transition-all duration-200 ease-out"
                            leave-active-class="transition-all duration-150 ease-in"
                            enter-from-class="opacity-0 transform -translate-y-1"
                            enter-to-class="opacity-100 transform translate-y-0"
                            leave-from-class="opacity-100 transform translate-y-0"
                            leave-to-class="opacity-0 transform -translate-y-1"
                          >
                            <p
                              v-if="errorTambah"
                              class="text-red-500 text-sm mt-2 flex items-center"
                            >
                              <svg
                                class="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                ></path>
                              </svg>
                              {{ errorTambah }}
                            </p>
                          </Transition>
                        </div>

                        <div class="flex space-x-3">
                          <button
                            @click.stop="tambahSiswa"
                            class="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                          >
                            <svg
                              class="w-5 h-5 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            Simpan Siswa
                          </button>
                          <button
                            @click="
                              ((showAddForm = false), (newSiswaNama = ''), (errorTambah = ''))
                            "
                            class="px-6 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                          >
                            Batal
                          </button>
                        </div>
                      </div>
                    </div>
                  </Transition>
                </div>
              </div>
            </Transition>
          </div>    

          <!-- Action Buttons -->
          <div
            class="bg-gray-50 dark:bg-gray-800/50 px-8 py-6 border-t border-gray-200 dark:border-gray-700"
          >
            <div class="flex justify-end space-x-4">
              <button
                @click="onCancel"
                class="inline-flex items-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  ></path>
                </svg>
                {{ localReadonly ? 'Kembali' : 'Batal' }}
              </button>
              <button
                v-if="!localReadonly"
                @click="onSave"
                class="inline-flex items-center px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Simpan Data
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>