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
      <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 px-8 py-6">
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
                      : 'ri-user-add-line'
                ]"
              ></i>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white">
                {{
                  mode === 'edit' && readonly
                    ? 'Detail Siswa'
                    : mode === 'edit'
                      ? 'Edit Data Siswa'
                      : 'Tambah Siswa Baru'
                }}
              </h3>
              <p class="text-indigo-100 text-sm">
                {{
                  mode === 'edit' && readonly
                    ? 'Informasi lengkap data siswa'
                    : mode === 'edit'
                      ? 'Ubah informasi data siswa'
                      : 'Lengkapi formulir data siswa'
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
          <!-- NISN -->
          <div class="space-y-2">
            <label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <i class="ri-id-card-line text-indigo-600"></i>
              <span>NISN</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="text"
                v-model="form.nisn"
                :disabled="readonly"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                :class="[
                  readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-indigo-300',
                  errors.nisn ? 'border-red-500 focus:ring-red-500' : ''
                ]"
                placeholder="Masukkan NISN siswa"
              />
            </div>
            <p v-if="errors.nisn" class="text-red-500 text-sm flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.nisn }}
            </p>
          </div>

          <!-- Nama -->
          <div class="space-y-2">
            <label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <i class="ri-user-line text-indigo-600"></i>
              <span>Nama Lengkap</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="text"
                v-model="form.nama"
                :disabled="readonly"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                :class="[
                  readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-indigo-300',
                  errors.nama ? 'border-red-500 focus:ring-red-500' : ''
                ]"
                placeholder="Masukkan nama lengkap siswa"
              />
            </div>
            <p v-if="errors.nama" class="text-red-500 text-sm flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.nama }}
            </p>
          </div>

          <!-- Alamat -->
          <div class="lg:col-span-2 space-y-2">
            <label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <i class="ri-map-pin-line text-indigo-600"></i>
              <span>Alamat Lengkap</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <textarea
                v-model="form.alamat"
                :disabled="readonly"
                rows="3"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400 resize-none"
                :class="[
                  readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-indigo-300',
                  errors.alamat ? 'border-red-500 focus:ring-red-500' : ''
                ]"
                placeholder="Masukkan alamat lengkap siswa"
              ></textarea>
            </div>
            <p v-if="errors.alamat" class="text-red-500 text-sm flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.alamat }}
            </p>
          </div>

          <!-- Tanggal Lahir -->
          <div class="space-y-2">
            <label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <i class="ri-calendar-line text-indigo-600"></i>
              <span>Tanggal Lahir</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="date"
                v-model="form.tgl_lahir"
                :disabled="readonly"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100"
                :class="[
                  readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-indigo-300',
                  errors.tgl_lahir ? 'border-red-500 focus:ring-red-500' : ''
                ]"
              />
            </div>
            <p v-if="errors.tgl_lahir" class="text-red-500 text-sm flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.tgl_lahir }}
            </p>
          </div>

          <!-- Jenis Kelamin -->
          <div class="space-y-2">
            <label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <i class="ri-user-heart-line text-indigo-600"></i>
              <span>Jenis Kelamin</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <select
                v-model="form.jk"
                :disabled="readonly"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 appearance-none"
                :class="[
                  readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-indigo-300',
                  errors.jk ? 'border-red-500 focus:ring-red-500' : ''
                ]"
              >
                <option disabled value="" class="text-gray-400">Pilih jenis kelamin</option>
                <option value="L" class="text-gray-900 dark:text-gray-100">Laki-laki</option>
                <option value="P" class="text-gray-900 dark:text-gray-100">Perempuan</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <i class="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
            <p v-if="errors.jk" class="text-red-500 text-sm flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.jk }}
            </p>
          </div>

          <!-- No Telepon -->
          <div class="space-y-2">
            <label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <i class="ri-phone-line text-indigo-600"></i>
              <span>No Telepon</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="tel"
                v-model="form.no_tlp"
                :disabled="readonly"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                :class="[
                  readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-indigo-300',
                  errors.no_tlp ? 'border-red-500 focus:ring-red-500' : ''
                ]"
                placeholder="Contoh: 08123456789"
              />
            </div>
            <p v-if="errors.no_tlp" class="text-red-500 text-sm flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.no_tlp }}
            </p>
          </div>

          <!-- Nama Wali -->
          <div class="space-y-2">
            <label class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <i class="ri-parent-line text-indigo-600"></i>
              <span>Nama Wali</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="text"
                v-model="form.nama_wali"
                :disabled="readonly"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                :class="[
                  readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-indigo-300',
                  errors.nama_wali ? 'border-red-500 focus:ring-red-500' : ''
                ]"
                placeholder="Masukkan nama wali siswa"
              />
            </div>
            <p v-if="errors.nama_wali" class="text-red-500 text-sm flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.nama_wali }}
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-x-4">
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
            class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
          >
            <i class="ri-save-line"></i>
            <span>Simpan Data</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(['cancel', 'save'])

const props = defineProps({
  show: Boolean,
  mode: String,
  readonly: Boolean,
  form: Object,
  errors: Object,
})

function onCancel() {
  emit('cancel')
}

function onSave() {
  emit('save')
}
</script>

<style scoped>
/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
  width: 6px;
}

textarea::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
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