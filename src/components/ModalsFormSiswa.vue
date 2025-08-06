<template>
<div
v-if="show"
class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
@click.self="handleCancel"
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
          : 'ri-user-add-line',
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
@click="handleCloseButton"
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
<label
  class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
>
  <i class="ri-id-card-line text-indigo-600"></i>
  <span>NISN</span>
  <span class="text-red-500">*</span>
</label>
<div class="relative">
  <input
    type="Number"
    v-model="form.nisn"
    :disabled="readonly"
    class="no-spinner w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400"
    :class="[
      readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-indigo-300',
      errors.nisn ? 'border-red-500 focus:ring-red-500' : '',
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
<label
  class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
>
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
      errors.nama ? 'border-red-500 focus:ring-red-500' : '',
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
<label
  class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
>
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
      errors.alamat ? 'border-red-500 focus:ring-red-500' : '',
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
<label
  class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
>
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
  <i class="ri-user-heart-line text-indigo-600"></i>
  <span>Jenis Kelamin</span>
  <span class="text-red-500">*</span>
</label>
<div class="relative">
  <select
    v-model="form.jk"
    :disabled="readonly"
    class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 appearance-none"
    :class="[
      readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-indigo-300',
      errors.jk ? 'border-red-500 focus:ring-red-500' : '',
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
<label
  class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
>
  <i class="ri-phone-line text-indigo-600"></i>
  <span>No Telepon</span>
  <span class="text-red-500">*</span>
</label>
<div class="relative">
  <input
    type="Number"
    v-model="form.no_tlp"
    :disabled="readonly"
    class="no-spinner w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 placeholder-gray-400"
    :class="[
      readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-indigo-300',
      errors.no_tlp ? 'border-red-500 focus:ring-red-500' : '',
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
<label
  class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
>
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
      errors.nama_wali ? 'border-red-500 focus:ring-red-500' : '',
    ]"
    placeholder="Masukkan nama wali siswa"
  />
</div>
<p v-if="errors.nama_wali" class="text-red-500 text-sm flex items-center">
  <i class="ri-error-warning-line mr-1"></i>
  {{ errors.nama_wali }}
</p>
</div>

<!-- Kelas -->
<div class="space-y-2">
<label
  class="flex items-center space-x-2 text-sm font-semibold text-gray-700 dark:text-gray-300"
>
  <i class="ri-book-2-line text-indigo-600"></i>
  <span>Kelas</span>
  <span class="text-red-500">*</span>
</label>
<div class="relative">
  <select
    v-model="form.kelas_id"
    :disabled="readonly"
    @blur="validateField('kelas_id')"
    @change="clearFieldError('kelas_id')"
    class="w-full px-4 py-3 bg-white/50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-gray-100 appearance-none"
    :class="[
      readonly ? 'cursor-not-allowed opacity-75' : 'hover:border-indigo-300',
      errors.kelas_id ? 'border-red-500 focus:ring-red-500' : '',
    ]"
  >
    <option disabled value="">Pilih Kelas</option>
    <option v-for="kelas in dataKelas" :key="kelas.id" :value="kelas.id">
      {{ kelas.nama_kelas }}
    </option>
  </select>
  <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
    <i v-if="form.kelas_id && !errors.kelas_id && !readonly" class="ri-check-line text-green-500 mr-2"></i>
    <i v-if="errors.kelas_id && !readonly" class="ri-error-warning-line text-red-500 mr-2"></i>
    <i class="ri-arrow-down-s-line text-gray-400"></i>
  </div>
</div>
<p v-if="errors.kelas_id" class="text-red-500 text-sm flex items-center">
  <i class="ri-error-warning-line mr-1"></i>
  {{ errors.kelas_id }}
</p>
</div>
</div>

<!-- Progress Bar -->
<div v-if="!readonly" class="mt-6">
<div class="flex items-center justify-between mb-2">
<span class="text-sm font-medium text-gray-700 dark:text-gray-300">
  Kelengkapan Data
</span>
<span class="text-sm text-gray-500">{{ completionPercentage }}%</span>
</div>
<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
<div 
  class="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-300"
  :style="{ width: completionPercentage + '%' }"
></div>
</div>
</div>

<!-- Action Buttons -->
<div
class="flex justify-end items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 space-x-4"
>
<button
@click="handleCancel"
class="px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2"
>
<i class="ri-close-line"></i>
<span>{{ readonly ? 'Tutup' : 'Batal' }}</span>
</button>

<button
v-if="!readonly"
@click="handleSave"
:disabled="completionPercentage < 100"
class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none transition-all duration-200 flex items-center space-x-2"
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
import { computed, ref } from 'vue'
import Swal from 'sweetalert2'

const emit = defineEmits(['cancel', 'save'])

const props = defineProps({
show: Boolean,
mode: String,
readonly: Boolean,
form: Object,
errors: Object,
dataKelas: Array,
})

// Computed property untuk menghitung persentase kelengkapan
const completionPercentage = computed(() => {
const fields = ['nisn', 'nama', 'alamat', 'tgl_lahir', 'jk', 'no_tlp', 'nama_wali', 'kelas_id']
const completedFields = fields.filter(field => props.form[field])
return Math.round((completedFields.length / fields.length) * 100)
})

// Enhanced cancel function
async function handleCancel() {
if (props.readonly) {
emit('cancel')
return
}

// Check if form has been modified
const hasChanges = Object.keys(props.form).some(key => props.form[key] !== '')

if (hasChanges) {
const result = await Swal.fire({
title: 'Batalkan Perubahan?',
html: `
<div class="text-left">
<p class="mb-2">Anda memiliki perubahan yang belum disimpan:</p>
<div class="bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-500">
<p class="text-sm text-yellow-700">
  <i class="ri-warning-line mr-1"></i>
  Data yang sudah diisi akan hilang
</p>
</div>
<p class="mt-2 text-sm text-gray-600">Apakah Anda yakin ingin keluar?</p>
</div>
`,
icon: 'warning',
showCancelButton: true,
confirmButtonColor: '#f59e0b',
cancelButtonColor: '#6b7280',
confirmButtonText: 'Ya, Batalkan',
cancelButtonText: 'Tidak, Lanjut Edit',
reverseButtons: true,
focusCancel: true
})

if (result.isConfirmed) {
emit('cancel')
Swal.fire({
icon: 'info',
title: 'Dibatalkan',
text: 'Perubahan telah dibatalkan',
confirmButtonColor: '#6b7280',
timer: 1500,
showConfirmButton: false
})
}
} else {
emit('cancel')
}
}

// Enhanced close button function  
async function handleCloseButton() {
if (props.readonly) {
emit('cancel')
return
}

const result = await Swal.fire({
title: 'Tutup Form?',
text: 'Apakah Anda yakin ingin menutup form ini?',
icon: 'question',
showCancelButton: true,
confirmButtonColor: '#6b7280',
cancelButtonColor: '#d1d5db',
confirmButtonText: 'Ya, Tutup',
cancelButtonText: 'Batal',
timer: 10000,
timerProgressBar: true
})

if (result.isConfirmed) {
emit('cancel')
}
}

async function handleSave() {
  const f = props.form
  const errors = []

  const requiredFields = [
    { field: 'nisn', label: 'NISN' },
    { field: 'nama', label: 'Nama Lengkap' },
    { field: 'jk', label: 'Jenis Kelamin' },
    { field: 'tgl_lahir', label: 'Tanggal Lahir' },
    { field: 'alamat', label: 'Alamat' },
    { field: 'no_tlp', label: 'No Telepon' },
    { field: 'nama_wali', label: 'Nama Wali' },
    { field: 'kelas_id', label: 'Kelas' },
  ]

  // Validasi sederhana: hanya wajib diisi
  requiredFields.forEach(({ field, label }) => {
    if (!f[field] || f[field].toString().trim() === '') {
      errors.push(label)
    }
  })

  if (errors.length > 0) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal Menyimpan',
      html: `Field berikut wajib diisi:<br><strong>${errors.join(', ')}</strong>`,
      confirmButtonColor: '#ef4444',
    })
    return
  }

  const result = await Swal.fire({
    title: 'Simpan Data?',
    text: 'Pastikan data siswa sudah benar.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#6366f1',
    cancelButtonColor: '#d1d5db',
    confirmButtonText: 'Ya, Simpan',
    cancelButtonText: 'Batal',
  })

  if (result.isConfirmed) {
    emit('save')
    Swal.fire({
      icon: 'success',
      title: 'Berhasil',
      text: 'Data siswa berhasil disimpan!',
      confirmButtonColor: '#6366f1',
      timer: 1500,
      showConfirmButton: false,
    })
  }
}


// Auto-save draft (optional feature)
let autoSaveTimer = null

function scheduleAutoSave() {
if (autoSaveTimer) {
clearTimeout(autoSaveTimer)
}

autoSaveTimer = setTimeout(() => {
if (!props.readonly && completionPercentage.value > 30) {
Swal.fire({
icon: 'info',
title: 'Draft Tersimpan',
text: 'Data form telah tersimpan sebagai draft',
toast: true,
position: 'top-end',
showConfirmButton: false,
timer: 2000
})
}
}, 30000) // Auto save after 30 seconds of inactivity
}

// Watch for form changes to trigger auto-save
function onFormChange() {
if (!props.readonly) {
scheduleAutoSave()
}
}
</script>

<style scoped>
/* Custom scrollbar for textarea */
textarea::-webkit-scrollbar {
width: 6px;
}

.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
-webkit-appearance: none;
margin: 0;
}

.no-spinner {
-moz-appearance: textfield;
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

/* Progress bar animation */
@keyframes progressFill {
from {
width: 0%;
}
to {
width: var(--progress-width);
}
}

/* Field validation animations */
.field-valid {
animation: fieldSuccess 0.3s ease-out;
}

.field-error {
animation: fieldError 0.3s ease-out;
}

@keyframes fieldSuccess {
0% {
border-color: #d1d5db;
}
50% {
border-color: #10b981;
box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}
100% {
border-color: #10b981;
}
}

@keyframes fieldError {
0% {
border-color: #d1d5db;
}
50% {
border-color: #ef4444;
box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
100% {
border-color: #ef4444;
}
}

/* SweetAlert2 custom animations */
.animate__shakeX {
animation: shakeX 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shakeX {
0%, 100% {
transform: translate3d(0, 0, 0);
}
10%, 30%, 50%, 70%, 90% {
transform: translate3d(-10px, 0, 0);
}
20%, 40%, 60%, 80% {
transform: translate3d(10px, 0, 0);
}
}

/* Hover effects for better UX */
.field-container:hover .field-icon {
color: #6366f1;
transform: scale(1.1);
transition: all 0.2s ease;
}

.save-button:disabled {
position: relative;
overflow: hidden;
}

.save-button:disabled::after {
content: '';
position: absolute;
top: 0;
left: -100%;
width: 100%;
height: 100%;
background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
animation: loading 1.5s infinite;
}

@keyframes loading {
0% {
left: -100%;
}
100% {
left: 100%;
}
}
</style>