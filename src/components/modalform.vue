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
      <div class="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 px-8 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <i
                :class="[
                  'text-2xl text-white',
                  mode === 'edit' && readonly
                    ? 'ri-eye-line'
                    : mode === 'edit'
                      ? 'ri-edit-line'
                      : 'ri-calendar-schedule-line',
                ]"
              ></i>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white">
                {{
                  mode === 'edit' && readonly
                    ? 'Detail Jadwal'
                    : mode === 'edit'
                      ? 'Edit Jadwal Jam'
                      : 'Tambah Jadwal Jam'
                }}
              </h3>
              <p class="text-violet-100 text-sm">
                {{
                  mode === 'edit' && readonly
                    ? 'Informasi lengkap jadwal jam pelajaran'
                    : mode === 'edit'
                      ? 'Ubah jadwal jam pelajaran'
                      : 'Buat jadwal jam pelajaran baru'
                }}
              </p>
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
          <!-- Hari -->
          <div class="space-y-2">
            <label
              class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              <i class="ri-calendar-2-line text-violet-600"></i>
              <span>Hari</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <select
                v-model="form.hari"
                :disabled="readonly"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 appearance-none"
                :class="[
                  readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-violet-300',
                  errors.hari ? 'border-red-500 focus:ring-red-500' : '',
                ]"
              >
                <option disabled value="" class="text-gray-400">Pilih Hari</option>
                <option
                  v-for="hari in hariList"
                  :key="hari"
                  :value="hari"
                  class="text-gray-900 dark:text-gray-100"
                >
                  {{ hari }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <i class="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
            <p v-if="errors.hari" class="text-red-500 text-sm flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.hari }}
            </p>
          </div>

          <!-- Jam Mulai -->
          <div class="space-y-2">
            <label
              class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              <i class="ri-time-line text-violet-600"></i>
              <span>Jam Mulai</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="time"
                v-model="form.jam_mulai"
                :disabled="readonly"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100"
                :class="[
                  readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-violet-300',
                  errors.jam_mulai ? 'border-red-500 focus:ring-red-500' : '',
                ]"
              />
            </div>
            <p v-if="errors.jam_mulai" class="text-red-500 text-sm flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.jam_mulai }}
            </p>
          </div>

          <!-- Jam Selesai -->
          <div class="space-y-2">
            <label
              class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              <i class="ri-time-fill text-violet-600"></i>
              <span>Jam Selesai</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="time"
                v-model="form.jam_selesai"
                :disabled="readonly"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100"
                :class="[
                  readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-violet-300',
                  errors.jam_selesai ? 'border-red-500 focus:ring-red-500' : '',
                ]"
              />
            </div>
            <p v-if="errors.jam_selesai" class="text-red-500 text-sm flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.jam_selesai }}
            </p>
          </div>

          <!-- Mata Pelajaran -->
          <div class="space-y-2">
            <label
              class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              <i class="ri-book-open-line text-violet-600"></i>
              <span>Mata Pelajaran</span>
              <span class="text-red-500">*</span>
            </label>

            <div v-if="readonly">
              <p
                class="px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-800 dark:text-gray-100"
              >
                {{ getNamaMapel(form.id_mapel) }}
              </p>
            </div>

            <div class="relative" v-else>
              <select
                v-model="form.id_mapel"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 appearance-none"
                :class="[
                  errors.id_mapel ? 'border-red-500 focus:ring-red-500' : 'hover:border-violet-300',
                ]"
              >
                <option disabled value="">Pilih Mata Pelajaran</option>
                <option v-for="mapel in mapelList" :key="mapel.id_mapel" :value="mapel.id_mapel">
                  {{ mapel.nama_mapel }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <i class="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>

            <p v-if="errors.id_mapel" class="text-red-500 text-sm flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.id_mapel }}
            </p>
          </div>

          <!-- Guru Pengajar -->
          <div class="space-y-2">
            <label
              class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              <i class="ri-user-3-line text-violet-600"></i>
              <span>Guru Pengajar</span>
              <span class="text-red-500">*</span>
            </label>

            <div v-if="readonly">
              <p
                class="px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-800 dark:text-gray-100"
              >
                {{ getNamaGuru(form.id_guru) }}
              </p>
            </div>

            <div class="relative" v-else>
              <select
                v-model="form.id_guru"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 appearance-none"
                :class="[
                  errors.id_guru ? 'border-red-500 focus:ring-red-500' : 'hover:border-violet-300',
                ]"
              >
                <option disabled value="">Pilih Guru</option>
                <option v-for="guru in guruList" :key="guru.id_guru" :value="guru.id_guru">
                  {{ guru.nama_guru }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <i class="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>

            <p v-if="errors.id_guru" class="text-red-500 text-sm flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.id_guru }}
            </p>
          </div>

          <!-- Kelas -->
          <div class="space-y-2">
            <label
              class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              <i class="ri-school-line text-violet-600"></i>
              <span>Kelas</span>
              <span class="text-red-500">*</span>
            </label>

            <div v-if="readonly">
              <p
                class="px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-800 dark:text-gray-100"
              >
                {{ getNamaKelas(form.id_kelas) }}
              </p>
            </div>

            <div class="relative" v-else>
              <select
                v-model="form.id_kelas"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 appearance-none"
                :class="[
                  errors.id_kelas ? 'border-red-500 focus:ring-red-500' : 'hover:border-violet-300',
                ]"
              >
                <option disabled value="">Pilih Kelas</option>
                <option v-for="kelas in kelasList" :key="kelas.id" :value="kelas.id">
                  {{ kelas.nama_kelas }}
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <i class="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>

            <p v-if="errors.id_kelas" class="text-red-500 text-sm flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.id_kelas }}
            </p>
          </div>

          <!-- Info Card -->
          <div class="lg:col-span-2">
            <div
              class="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-violet-200/50 dark:border-violet-700/50"
            >
              <div class="flex items-start space-x-4">
                <div
                  class="w-10 h-10 bg-violet-100 dark:bg-violet-800/50 rounded-full flex items-center justify-center flex-shrink-0"
                >
                  <i class="ri-information-line text-violet-600 dark:text-violet-400"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-violet-800 dark:text-violet-200 mb-2">
                    Tips Penjadwalan
                  </h4>
                  <ul class="text-sm text-violet-700 dark:text-violet-300 space-y-1">
                    <li class="flex items-center space-x-2">
                      <i class="ri-checkbox-circle-line text-violet-500"></i>
                      <span>Pastikan tidak ada bentrok jadwal pada hari dan jam yang sama</span>
                    </li>
                    <li class="flex items-center space-x-2">
                      <i class="ri-checkbox-circle-line text-violet-500"></i>
                      <span>Pertimbangkan waktu istirahat antar mata pelajaran</span>
                    </li>
                    <li class="flex items-center space-x-2">
                      <i class="ri-checkbox-circle-line text-violet-500"></i>
                      <span>Sesuaikan mata pelajaran dengan ketersediaan guru</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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
            <span>{{ readonly ? 'Tutup' : 'Batal' }}</span>
          </button>

          <button
            v-if="!readonly"
            @click="onSave"
            class="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
          >
            <i class="ri-save-line"></i>
            <span>Simpan Jadwal</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import Swal from 'sweetalert2'
const emit = defineEmits(['cancel', 'save'])

const props = defineProps({
  show: Boolean,
  mode: String,
  readonly: Boolean,
  form: Object,
  errors: Object,
  hariList: Array,
  mapelList: Array,
  guruList: Array,
  kelasList: Array,
})

function getNamaMapel(id) {
  const mapel = props.mapelList.find(m => m.id_mapel === id)
  return mapel ? mapel.nama_mapel : '-'
}

function getNamaGuru(id) {
  const guru = props.guruList.find(g => g.id_guru === id)
  return guru ? guru.nama_guru : '-'
}

function getNamaKelas(id) {
  const kelas = props.kelasList.find(k => k.id === id)
  return kelas ? kelas.nama_kelas : '-'
}


function onCancel() {
  emit('cancel')
}

function onSave() {
  Swal.fire({
    title: 'Simpan Data?',
    text: 'Pastikan data yang diisi sudah benar.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, simpan',
    cancelButtonText: 'Batal',
  }).then((result) => {
    if (result.isConfirmed) {
      emit('save')
      Swal.fire({
        title: 'Berhasil!',
        text: 'Data berhasil disimpan.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      })
    }
  })
}

</script>

<style scoped>
/* Remove default select arrow in some browsers */
select::-ms-expand {
  display: none;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #7c3aed, #9333ea);
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
