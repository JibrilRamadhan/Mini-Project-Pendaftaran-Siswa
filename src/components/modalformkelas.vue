<script setup>
import { ref, computed, watch } from 'vue'
import Swal from 'sweetalert2'
import useGuru from '@/composables/useGuru'
import useSiswa from '@/composables/useSiswa'

const emit = defineEmits(['cancel', 'save'])

const props = defineProps({
  show: Boolean,
  mode: String,
  readonly: Boolean,
  form: Object,
  errors: Object,
  selectedItem: Object,
  siswaDiKelas: Array,
  tambahSiswa: Function,
})

const localReadonly = ref(false)
watch(
  () => props.readonly,
  (val) => {
    localReadonly.value = val
  },
  { immediate: true },
)

const search = ref('')
const filteredSiswa = computed(() => {
  if (!Array.isArray(props.siswaDiKelas)) return []
  if (!search.value) return props.siswaDiKelas
  return props.siswaDiKelas.filter((siswa) =>
    siswa.nama?.toLowerCase().includes(search.value.toLowerCase()),
  )
})

const selected = ref(true)
const showAddForm = ref(false)
const searchSiswaBaru = ref('')
const errorTambah = ref('')

const { data: siswaList } = useSiswa()

const daftarGuru = computed(() =>
  useGuru().data.value.map((g) => ({
    ...g,
    id_guru: Number(g.id_guru),
  })),
)

const calonSiswa = computed(() => {
  if (!Array.isArray(siswaList.value)) return []
  let result = siswaList.value.filter((s) => !s.kelas_id)
  if (searchSiswaBaru.value) {
    const keyword = searchSiswaBaru.value.toLowerCase()
    result = result.filter((s) => s.nama.toLowerCase().includes(keyword))
  }
  return result
})

async function pilihSiswaUntukKelas(siswa) {
  if (!props.selectedItem) {
    await Swal.fire({
      icon: 'error',
      title: 'Kelas Tidak Dipilih',
      text: 'Silakan pilih kelas terlebih dahulu',
      confirmButtonColor: '#3B82F6',
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'rounded-lg px-6 py-2',
      },
    })
    return
  }

  const confirmResult = await Swal.fire({
    title: 'Konfirmasi Penambahan Siswa',
    html: `Apakah Anda yakin ingin menambahkan <strong>${siswa.nama}</strong> ke kelas ini?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#10B981',
    cancelButtonColor: '#EF4444',
    confirmButtonText: 'Ya, Tambahkan',
    cancelButtonText: 'Batal',
    customClass: {
      popup: 'rounded-xl',
      confirmButton: 'rounded-lg px-6 py-2',
      cancelButton: 'rounded-lg px-6 py-2',
    },
  })

  if (!confirmResult.isConfirmed) return

  const result = props.tambahSiswa({
    nama: siswa.nama,
    kelas_id: props.selectedItem.id,
    id: siswa.id,
  })

  if (!result?.success) {
    await Swal.fire({
      icon: 'error',
      title: 'Gagal Menambahkan Siswa',
      text: result?.message || 'Terjadi kesalahan saat menambahkan siswa',
      confirmButtonColor: '#3B82F6',
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'rounded-lg px-6 py-2',
      },
    })
    return
  }

  const sudahAda = props.siswaDiKelas?.some((s) => s.id === siswa.id)
  if (sudahAda) {
    await Swal.fire({
      icon: 'warning',
      title: 'Siswa Sudah Ada',
      text: 'Siswa sudah terdaftar di kelas ini',
      confirmButtonColor: '#3B82F6',
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'rounded-lg px-6 py-2',
      },
    })
    return
  }

  await Swal.fire({
    icon: 'success',
    title: 'Berhasil!',
    text: `${siswa.nama} berhasil ditambahkan ke kelas`,
    timer: 2000,
    showConfirmButton: false,
    customClass: {
      popup: 'rounded-xl',
    },
  })

  errorTambah.value = ''
  searchSiswaBaru.value = ''
  showAddForm.value = false
}

async function onCancel() {
  if (
    !localReadonly.value &&
    (props.form.nama_kelas || props.form.kode_kelas || props.form.kapasitas || props.form.id_guru)
  ) {
    const result = await Swal.fire({
      title: 'Konfirmasi Keluar',
      text: 'Data yang telah diisi akan hilang. Apakah Anda yakin ingin keluar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#EF4444',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Ya, Keluar',
      cancelButtonText: 'Batal',
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'rounded-lg px-6 py-2',
        cancelButton: 'rounded-lg px-6 py-2',
      },
    })

    if (result.isConfirmed) {
      emit('cancel')
    }
  } else {
    emit('cancel')
  }
}

async function onSave() {
  const result = await Swal.fire({
    title: 'Konfirmasi Penyimpanan',
    text: 'Apakah Anda yakin ingin menyimpan data kelas ini?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#10B981',
    cancelButtonColor: '#6B7280',
    confirmButtonText: 'Ya, Simpan',
    cancelButtonText: 'Batal',
    customClass: {
      popup: 'rounded-xl',
      confirmButton: 'rounded-lg px-6 py-2',
      cancelButton: 'rounded-lg px-6 py-2',
    },
  })

  if (result.isConfirmed) {
    emit('save')
  }
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
      class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/70 via-slate-900/60 to-black/70 backdrop-blur-lg p-4"
    >
      <!-- Modal dengan animasi scale dan slide -->
      <Transition
        enter-active-class="transition-all duration-400 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 transform scale-90 translate-y-8"
        enter-to-class="opacity-100 transform scale-100 translate-y-0"
        leave-from-class="opacity-100 transform scale-100 translate-y-0"
        leave-to-class="opacity-0 transform scale-90 translate-y-8"
      >
        <div
          v-if="show"
          class="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl relative border border-gray-200 dark:border-slate-700 overflow-hidden"
          style="max-height: 90vh; overflow-y: auto"
        >
          <!-- Header dengan gradient yang lebih menarik -->
          <div
            class="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-800 dark:via-purple-800 dark:to-indigo-800 px-8 py-8 relative overflow-hidden"
          >
            <!-- Background pattern -->
            <div class="absolute inset-0 opacity-10">
              <div
                class="absolute inset-0"
                style="
                  background-image:
                    radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                    radial-gradient(circle at 80% 50%, white 1px, transparent 1px);
                  background-size: 50px 50px;
                "
              ></div>
            </div>

            <div class="flex items-center justify-between relative z-10">
              <div class="flex items-center space-x-4">
                <!-- Icon dengan animasi hover -->
                <div
                  class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group hover:bg-white/30 transition-all duration-300 hover:scale-110"
                >
                  <svg
                    v-if="mode === 'edit' && localReadonly"
                    class="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300"
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
                    class="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300"
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
                    class="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300"
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
                  <h3 class="text-2xl font-bold text-white mb-1">
                    {{
                      mode === 'lihat'
                        ? 'Detail Kelas'
                        : mode === 'edit'
                          ? 'Edit Kelas'
                          : 'Kelas Baru'
                    }}
                  </h3>
                  <p class="text-indigo-100 text-sm opacity-90">
                    {{
                      mode === 'lihat'
                        ? 'Lihat informasi lengkap kelas'
                        : mode === 'edit'
                          ? 'Perbarui informasi kelas'
                          : 'Tambahkan kelas baru ke sistem'
                    }}
                  </p>
                </div>
              </div>

              <!-- Close button dengan hover effect -->
              <button
                @click="onCancel"
                class="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group hover:scale-110 hover:rotate-90"
                style="z-index: 52"
              >
                <svg
                  class="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300"
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
          </div>

          <!-- Content dengan padding yang lebih baik -->
          <div
            class="p-8 bg-gradient-to-br from-gray-50/50 to-white dark:from-slate-900 dark:to-slate-800"
          >
            <!-- Form Fields dengan card design -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <!-- Nama Kelas -->
              <div class="group">
                <label
                  class="mb-3 font-semibold text-gray-700 dark:text-gray-200 flex items-center text-sm uppercase tracking-wide"
                >
                  <div
                    class="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-3"
                  >
                    <svg
                      class="w-3 h-3 text-white"
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
                  </div>
                  Nama Kelas
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model="form.nama_kelas"
                    type="text"
                    :disabled="localReadonly"
                    class="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed group-hover:border-gray-300 backdrop-blur-sm shadow-sm hover:shadow-md"
                    placeholder="Masukkan nama kelas"
                  />
                  <div
                    v-if="!localReadonly"
                    class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none"
                  >
                    <div class="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
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
                  <p
                    v-if="errors.nama_kelas"
                    class="text-red-500 text-sm mt-3 flex items-center bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  class="mb-3 font-semibold text-gray-700 dark:text-gray-200 flex items-center text-sm uppercase tracking-wide"
                >
                  <div
                    class="w-6 h-6 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mr-3"
                  >
                    <svg
                      class="w-3 h-3 text-white"
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
                  </div>
                  Kode Kelas
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model="form.kode_kelas"
                    type="text"
                    :disabled="localReadonly"
                    class="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed group-hover:border-gray-300 backdrop-blur-sm shadow-sm hover:shadow-md"
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
                  <p
                    v-if="errors.kode_kelas"
                    class="text-red-500 text-sm mt-3 flex items-center bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  class="mb-3 font-semibold text-gray-700 dark:text-gray-200 flex items-center text-sm uppercase tracking-wide"
                >
                  <div
                    class="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mr-3"
                  >
                    <svg
                      class="w-3 h-3 text-white"
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
                  </div>
                  Kapasitas
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <div class="relative">
                  <input
                    v-model.number="form.kapasitas"
                    type="number"
                    min="1"
                    :disabled="localReadonly"
                    class="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed group-hover:border-gray-300 backdrop-blur-sm shadow-sm hover:shadow-md"
                    placeholder="Jumlah siswa maksimal"
                  />
                  <div
                    class="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none"
                  >
                    <span
                      class="text-gray-400 text-sm font-medium bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg"
                      >siswa</span
                    >
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
                  <p
                    v-if="errors.kapasitas"
                    class="text-red-500 text-sm mt-3 flex items-center bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  class="mb-3 font-semibold text-gray-700 dark:text-gray-200 flex items-center text-sm uppercase tracking-wide"
                >
                  <div
                    class="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mr-3"
                  >
                    <svg
                      class="w-3 h-3 text-white"
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
                  </div>
                  Wali Kelas
                  <span class="text-red-500 ml-1">*</span>
                </label>
                <div class="relative">
                  <select
                    v-model.number="form.id_guru"
                    :disabled="localReadonly"
                    class="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed group-hover:border-gray-300 appearance-none backdrop-blur-sm shadow-sm hover:shadow-md"
                  >
                    <option disabled value="" class="text-gray-400">-- Pilih Guru --</option>
                    <option
                      v-for="guru in daftarGuru"
                      :key="guru.id_guru"
                      :value="Number(guru.id_guru)"
                      class="text-gray-800 dark:text-gray-200"
                    >
                      {{ guru.nama_guru }} ({{ guru.nip }})
                    </option>
                  </select>

                  <div
                    class="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none"
                  >
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
                  <p
                    v-if="errors.id_guru"
                    class="text-red-500 text-sm mt-3 flex items-center bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg"
                  >
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

            <!-- Bagian Detail Siswa dengan card design -->
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
                <!-- Header Section dengan gradient card -->
                <div
                  class="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 mb-6 border border-emerald-200 dark:border-emerald-800"
                >
                  <div class="flex items-center mb-4">
                    <div
                      class="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg"
                    >
                      <svg
                        class="w-6 h-6 text-white"
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
                      <h4 class="text-2xl font-bold text-gray-800 dark:text-gray-100">
                        Daftar Siswa
                      </h4>
                      <p class="text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                        {{ (filteredSiswa || []).length }} dari
                        {{ (props.siswaDiKelas || []).length }} siswa terdaftar
                      </p>
                    </div>
                  </div>

                  <!-- Search Bar dengan design yang lebih menarik -->
                  <div class="relative">
                    <div
                      class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none"
                    >
                      <svg
                        class="w-5 h-5 text-emerald-500"
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
                      class="w-full pl-12 pr-12 py-4 border-2 border-emerald-200 dark:border-emerald-700 rounded-2xl bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 placeholder-emerald-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all duration-300 backdrop-blur-sm shadow-sm"
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
                          class="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-800 dark:hover:bg-emerald-700 flex items-center justify-center transition-colors duration-200 group"
                        >
                          <svg
                            class="w-4 h-4 text-emerald-600 dark:text-emerald-300 group-hover:scale-110 transition-transform duration-200"
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
                </div>

                <!-- Daftar Siswa dengan card design yang lebih menarik -->
                <div
                  class="bg-white dark:bg-slate-800 rounded-3xl p-6 max-h-80 overflow-y-auto shadow-lg border border-gray-100 dark:border-slate-700"
                >
                  <TransitionGroup
                    enter-active-class="transition-all duration-300 ease-out"
                    leave-active-class="transition-all duration-200 ease-in"
                    enter-from-class="opacity-0 transform translate-x-4 scale-95"
                    enter-to-class="opacity-100 transform translate-x-0 scale-100"
                    leave-from-class="opacity-100 transform translate-x-0 scale-100"
                    leave-to-class="opacity-0 transform -translate-x-4 scale-95"
                    move-class="transition-transform duration-300 ease-out"
                    tag="div"
                    class="space-y-3"
                  >
                    <div
                      v-for="(siswa, index) in filteredSiswa"
                      :key="siswa.id"
                      class="group flex items-center p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-slate-600 hover:border-emerald-300 dark:hover:border-emerald-600 hover:-translate-y-1"
                    >
                      <div
                        class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg group-hover:scale-110 transition-transform duration-300"
                      >
                        {{ index + 1 }}
                      </div>
                      <div class="ml-4 flex-1">
                        <p class="font-semibold text-gray-800 dark:text-gray-200 text-lg">
                          {{ siswa.nama }}
                        </p>
                        <p class="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                          Siswa Aktif
                        </p>
                      </div>
                      <div class="flex items-center space-x-2">
                        <div
                          class="w-3 h-3 rounded-full bg-emerald-500 shadow-lg animate-pulse"
                        ></div>
                        <svg
                          class="w-5 h-5 text-gray-400 group-hover:text-emerald-500 transition-colors duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </TransitionGroup>

                  <div v-if="filteredSiswa.length === 0" class="text-center py-16">
                    <div
                      class="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center"
                    >
                      <svg
                        class="w-10 h-10 text-gray-400 dark:text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                    </div>
                    <p class="text-gray-500 text-xl font-semibold mb-2">Tidak ditemukan siswa</p>
                    <p class="text-gray-400 text-sm">Coba gunakan kata kunci yang berbeda</p>
                  </div>
                </div>

                <!-- Form Tambah Siswa dengan design yang lebih menarik -->
                <div class="mt-8">
                  <button
                    @click.stop="showAddForm = !showAddForm"
                    class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                  >
                    <svg
                      class="w-6 h-6 mr-3 transition-transform duration-300"
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
                      />
                    </svg>
                    {{ showAddForm ? 'Tutup Form' : 'Tambah Siswa Baru' }}
                  </button>

                  <Transition
                    enter-active-class="transition-all duration-500 ease-out"
                    leave-active-class="transition-all duration-300 ease-in"
                    enter-from-class="opacity-0 transform translate-y-8 scale-95"
                    enter-to-class="opacity-100 transform translate-y-0 scale-100"
                    leave-from-class="opacity-100 transform translate-y-0 scale-100"
                    leave-to-class="opacity-0 transform translate-y-8 scale-95"
                  >
                    <div
                      v-if="showAddForm"
                      class="mt-6 p-8 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-cyan-900/20 rounded-3xl border-2 border-emerald-200 dark:border-emerald-800 shadow-xl"
                    >
                      <div class="flex items-center mb-6">
                        <div
                          class="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg"
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
                              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                            />
                          </svg>
                        </div>
                        <h5 class="ml-3 text-xl font-bold text-emerald-800 dark:text-emerald-200">
                          Pilih Siswa dari Daftar
                        </h5>
                      </div>

                      <div class="relative mb-6">
                        <div
                          class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                        >
                          <svg
                            class="w-5 h-5 text-emerald-500"
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
                          v-model="searchSiswaBaru"
                          type="text"
                          placeholder="Cari nama siswa yang belum terdaftar..."
                          class="w-full pl-12 pr-4 py-4 border-2 border-emerald-300 dark:border-emerald-600 rounded-2xl text-gray-800 dark:text-gray-200 bg-white/90 dark:bg-gray-800/90 focus:ring-4 focus:ring-emerald-200 focus:border-emerald-500 transition-all duration-300 backdrop-blur-sm shadow-sm"
                        />
                      </div>

                      <div
                        v-if="Array.isArray(calonSiswa) && calonSiswa.length > 0"
                        class="space-y-3 max-h-64 overflow-y-auto pr-2"
                      >
                        <TransitionGroup
                          enter-active-class="transition-all duration-300 ease-out"
                          leave-active-class="transition-all duration-200 ease-in"
                          enter-from-class="opacity-0 transform translate-x-4"
                          enter-to-class="opacity-100 transform translate-x-0"
                          leave-from-class="opacity-100 transform translate-x-0"
                          leave-to-class="opacity-0 transform -translate-x-4"
                          tag="div"
                        >
                          <div
                            v-for="siswa in calonSiswa"
                            :key="siswa.id"
                            class="group p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl flex justify-between items-center border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 hover:-translate-y-1"
                          >
                            <div class="flex items-center">
                              <div
                                class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shadow-lg"
                              >
                                {{ siswa.nama.charAt(0).toUpperCase() }}
                              </div>
                              <div class="ml-4">
                                <p class="text-gray-800 dark:text-gray-100 font-semibold text-lg">
                                  {{ siswa.nama }}
                                </p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">
                                  ID: {{ siswa.id }}
                                </p>
                              </div>
                            </div>
                            <button
                              @click="pilihSiswaUntukKelas(siswa)"
                              class="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group-hover:scale-110"
                            >
                              <svg
                                class="w-4 h-4 mr-2 inline"
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
                              Tambah
                            </button>
                          </div>
                        </TransitionGroup>
                      </div>

                      <div v-else class="text-center py-16">
                        <div
                          class="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center"
                        >
                          <svg
                            class="w-10 h-10 text-gray-400 dark:text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                        </div>
                        <p class="text-gray-500 text-xl font-semibold mb-2">
                          Tidak ditemukan siswa
                        </p>
                        <p class="text-sm text-gray-400">
                          Semua siswa sudah terdaftar atau coba kata kunci berbeda
                        </p>
                      </div>

                      <Transition
                        enter-active-class="transition-all duration-300 ease-out"
                        leave-active-class="transition-all duration-200 ease-in"
                        enter-from-class="opacity-0 transform translate-y-2"
                        enter-to-class="opacity-100 transform translate-y-0"
                        leave-from-class="opacity-100 transform translate-y-0"
                        leave-to-class="opacity-0 transform translate-y-2"
                      >
                        <div
                          v-if="errorTambah"
                          class="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                        >
                          <p
                            class="text-red-600 dark:text-red-400 text-sm font-medium flex items-center"
                          >
                            <svg
                              class="w-4 h-4 mr-2"
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
                        </div>
                      </Transition>
                    </div>
                  </Transition>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Action Buttons dengan design yang lebih menarik -->
          <div
            class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 px-8 py-6 border-t border-gray-200 dark:border-slate-700"
          >
            <div class="flex justify-end space-x-4">
              <button
                @click="onCancel"
                class="inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                class="inline-flex items-center px-10 py-4 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
