<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="dark:bg-gray-900 bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg text-sm relative">
      <h3 class="text-lg font-semibold mb-4">
        {{ mode === 'edit' && readonly ? 'Lihat Data' : mode === 'edit' ? 'Edit Kelas' : 'Tambah Kelas' }}
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block mb-1 font-medium">Nama Kelas</label>
          <input v-model="form.nama_kelas" type="text" class="w-full px-3 py-2 border rounded" :disabled="readonly" />
          <p v-if="errors.nama_kelas" class="text-red-500 text-sm mt-1">{{ errors.nama_kelas }}</p>
        </div>

        <div>
          <label class="block mb-1 font-medium">Kode Kelas</label>
          <input v-model="form.kode_kelas" type="text" class="w-full px-3 py-2 border rounded" :disabled="readonly" />
          <p v-if="errors.kode_kelas" class="text-red-500 text-sm mt-1">{{ errors.kode_kelas }}</p>
        </div>

        <div>
          <label class="block mb-1 font-medium">Kapasitas</label>
          <input v-model.number="form.kapasitas" type="number" class="w-full px-3 py-2 border rounded" :disabled="readonly" />
        </div>
      </div>

      <div class="flex justify-end mt-6 space-x-2">
        <button @click="onCancel" class="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          {{ readonly ? 'Kembali' : 'Batal' }}
        </button>
        <button v-if="!readonly" @click="onSave" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
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

<style scoped></style>
