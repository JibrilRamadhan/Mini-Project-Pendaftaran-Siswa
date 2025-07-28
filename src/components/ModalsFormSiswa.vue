<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div
      class="w-full max-w-3xl bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 rounded-lg shadow-xl"
    >
      <h3 class="text-lg font-semibold mb-4">
        {{
          mode === 'edit' && readonly
            ? 'Lihat Siswa'
            : mode === 'edit'
              ? 'Edit Siswa'
              : 'Tambah Siswa'
        }}
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- NISN -->
        <div>
          <label class="block mb-1 font-medium">NISN</label>
          <input
            type="text"
            v-model="form.nisn"
            class="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
            :disabled="readonly"
          />
          <p v-if="errors.nisn" class="text-red-500 text-sm mt-1">{{ errors.nisn }}</p>
        </div>

        <!-- Nama -->
        <div>
          <label class="block mb-1 font-medium">Nama</label>
          <input
            type="text"
            v-model="form.nama"
            class="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
            :disabled="readonly"
          />
          <p v-if="errors.nama" class="text-red-500 text-sm mt-1">{{ errors.nama }}</p>
        </div>

        <!-- Alamat -->
        <div class="md:col-span-2">
          <label class="block mb-1 font-medium">Alamat</label>
          <textarea
            v-model="form.alamat"
            class="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
            rows="2"
            :disabled="readonly"
          ></textarea>
          <p v-if="errors.alamat" class="text-red-500 text-sm mt-1">{{ errors.alamat }}</p>
        </div>

        <!-- Tanggal Lahir -->
        <div>
          <label class="block mb-1 font-medium">Tanggal Lahir</label>
          <input
            type="date"
            v-model="form.tgl_lahir"
            class="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
            :disabled="readonly"
          />
          <p v-if="errors.tgl_lahir" class="text-red-500 text-sm mt-1">{{ errors.tgl_lahir }}</p>
        </div>

        <!-- Jenis Kelamin -->
        <div>
          <label class="block mb-1 font-medium">Jenis Kelamin</label>
          <select
            v-model="form.jk"
            class="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
            :disabled="readonly"
          >
            <option disabled value="">Pilih</option>
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
          <p v-if="errors.jk" class="text-red-500 text-sm mt-1">{{ errors.jk }}</p>
        </div>

        <!-- No Telepon -->
        <div>
          <label class="block mb-1 font-medium">No Telepon</label>
          <input
            type="number"
            v-model="form.no_tlp"
            class="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
            :disabled="readonly"
          />
          <p v-if="errors.no_tlp" class="text-red-500 text-sm mt-1">{{ errors.no_tlp }}</p>
        </div>

        <!-- Nama Wali -->
        <div class="md:col-span-2">
          <label class="block mb-1 font-medium">Nama Wali</label>
          <input
            type="text"
            v-model="form.nama_wali"
            class="w-full px-3 py-2 border rounded dark:bg-gray-800 dark:text-white"
            :disabled="readonly"
          />
          <p v-if="errors.nama_wali" class="text-red-500 text-sm mt-1">{{ errors.nama_wali }}</p>
        </div>
      </div>

      <!-- Tombol -->
      <div class="flex justify-end mt-6 space-x-2">
        <button
          @click="onCancel"
          class="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {{ readonly ? 'Kembali' : 'Batal' }}
        </button>
        <button
          v-if="!readonly"
          @click="onSave"
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Simpan
        </button>
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
