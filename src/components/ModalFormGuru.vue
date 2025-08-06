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
      <div class="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 px-8 py-6">
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
                      : 'ri-user-add-line',
                ]"
              ></i>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-white">
                {{
                  mode === 'edit' && readonly
                    ? 'Detail Guru'
                    : mode === 'edit'
                      ? 'Edit Data Guru'
                      : 'Tambah Guru Baru'
                }}
              </h3>
              <p class="text-emerald-100 text-sm">
                {{
                  mode === 'edit' && readonly
                    ? 'Informasi lengkap data guru'
                    : mode === 'edit'
                      ? 'Ubah informasi data guru'
                      : 'Lengkapi formulir data guru'
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
          <!-- NIP -->
          <div class="space-y-2">
            <label
              class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              <i class="ri-id-card-line text-emerald-600"></i>
              <span>NIP</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="Number"
                v-model="form.nip"
                :disabled="readonly"
                class="no-spinner w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                :class="[
                  readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-emerald-300',
                  errors.nip ? 'border-red-500 focus:ring-red-500' : '',
                ]"
                placeholder="Masukkan NIP guru"
              />
            </div>
            <p v-if="errors.nip" class="text-red-500 text-sm flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.nip }}
            </p>
          </div>

          <!-- Nama Guru -->
          <div class="space-y-2">
            <label
              class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              <i class="ri-user-line text-emerald-600"></i>
              <span>Nama Lengkap</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="text"
                v-model="form.nama_guru"
                :disabled="readonly"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                :class="[
                  readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-emerald-300',
                  errors.nama_guru ? 'border-red-500 focus:ring-red-500' : '',
                ]"
                placeholder="Masukkan nama lengkap guru"
              />
            </div>
            <p v-if="errors.nama_guru" class="text-red-500 text-sm flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.nama_guru }}
            </p>
          </div>

          <!-- Alamat -->
          <div class="lg:col-span-2 space-y-2">
            <label
              class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              <i class="ri-map-pin-line text-emerald-600"></i>
              <span>Alamat Lengkap</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <textarea
                v-model="form.alamat"
                :disabled="readonly"
                rows="3"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400 resize-none"
                :class="[
                  readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-emerald-300',
                  errors.alamat ? 'border-red-500 focus:ring-red-500' : '',
                ]"
                placeholder="Masukkan alamat lengkap guru"
              ></textarea>
            </div>
            <p v-if="errors.alamat" class="text-red-500 text-sm flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.alamat }}
            </p>
          </div>

          <!-- Tanggal Lahir -->
          <div class="space-y-2">
            <label
              class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              <i class="ri-calendar-line text-emerald-600"></i>
              <span>Tanggal Lahir</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="date"
                v-model="form.tgl_lahir"
                :disabled="readonly"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100"
                :class="[
                  readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-emerald-300',
                  errors.tgl_lahir ? 'border-red-500 focus:ring-red-500' : '',
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
            <label
              class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              <i class="ri-user-heart-line text-emerald-600"></i>
              <span>Jenis Kelamin</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <select
                v-model="form.jenis_kelamin"
                :disabled="readonly"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 appearance-none"
                :class="[
                  readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-emerald-300',
                  errors.jenis_kelamin ? 'border-red-500 focus:ring-red-500' : '',
                ]"
              >
                <option disabled value="" class="text-gray-400 dark:bg-gray-800">
                  Pilih jenis kelamin
                </option>
                <option value="Laki-laki" class="text-gray-900 dark:text-gray-100">
                  Laki-laki
                </option>
                <option value="Perempuan" class="text-gray-900 dark:text-gray-100">
                  Perempuan
                </option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <i class="ri-arrow-down-s-line text-gray-400"></i>
              </div>
            </div>
            <p v-if="errors.jenis_kelamin" class="text-red-500 text-sm flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.jenis_kelamin }}
            </p>
          </div>

          <!-- No Telepon -->
          <div class="space-y-2">
            <label
              class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              <i class="ri-phone-line text-emerald-600"></i>
              <span>No Telepon</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="Number"
                v-model="form.no_telp"
                :disabled="readonly"
                class="no-spinner w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                :class="[
                  readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-emerald-300',
                  errors.no_telp ? 'border-red-500 focus:ring-red-500' : '',
                ]"
                placeholder="Contoh: 08123456789"
              />
            </div>
            <p v-if="errors.no_telp" class="text-red-500 text-sm flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.no_telp }}
            </p>
          </div>

          <!-- Email -->
          <div class="space-y-2">
            <label
              class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
            >
              <i class="ri-mail-line text-emerald-600"></i>
              <span>Email</span>
              <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                type="email"
                v-model="form.email"
                :disabled="readonly"
                class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400"
                :class="[
                  readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-emerald-300',
                  errors.email ? 'border-red-500 focus:ring-red-500' : '',
                ]"
                placeholder="Contoh: guru@sekolah.ac.id"
              />
            </div>
            <p v-if="errors.email" class="text-red-500 text-sm flex items-center">
              <i class="ri-error-warning-line mr-1"></i>
              {{ errors.email }}
            </p>
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
            class="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
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
    Object.keys(props.errors).forEach(key => {
    delete props.errors[key]
  })
  emit('cancel')
}

async function onSave() {
  const f = props.form
  const errors = {}

  // Validasi field yang wajib diisi
  if (!f.nip || f.nip.toString().trim() === '') {
    errors.nip = 'NIP wajib diisi'
  }
  if (!f.nama_guru || f.nama_guru.toString().trim() === '') {
    errors.nama_guru = 'Nama Lengkap wajib diisi'
  }
  if (!f.alamat || f.alamat.toString().trim() === '') {
    errors.alamat = 'Alamat wajib diisi'
  }
  if (!f.tgl_lahir || f.tgl_lahir.toString().trim() === '') {
    errors.tgl_lahir = 'Tanggal Lahir wajib diisi'
  }
  if (!f.jenis_kelamin || f.jenis_kelamin.toString().trim() === '') {
    errors.jenis_kelamin = 'Jenis Kelamin wajib diisi'
  }
  if (!f.no_telp || f.no_telp.toString().trim() === '') {
    errors.no_telp = 'No Telepon wajib diisi'
  }
  if (!f.email || f.email.toString().trim() === '') {
    errors.email = 'Email wajib diisi'
  }

  // Validasi format email
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    errors.email = 'Format email tidak valid'
  }

  // Validasi format nomor telepon
  if (f.no_telp && !/^\d{10,15}$/.test(f.no_telp)) {
    errors.no_telp = 'Nomor telepon harus 10-15 digit angka'
  }

  // Jika ada error, update props.errors dan return
  if (Object.keys(errors).length > 0) {
    Object.assign(props.errors, errors)
    return
  }

  // Jika tidak ada error, simpan data
  // Bersihkan error sebelum menyimpan
  Object.keys(props.errors).forEach(key => {
    delete props.errors[key]
  })
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
.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.no-spinner {
  -moz-appearance: textfield;
}

textarea::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #10b981, #14b8a6);
  border-radius: 3px;
}

textarea::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #059669, #0d9488);
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
