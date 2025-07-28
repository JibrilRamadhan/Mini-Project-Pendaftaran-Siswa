<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white dark:bg-gray-900 w-full max-w-xl p-6 rounded-lg shadow-lg">
      <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
        {{ mode === 'edit' && readonly ? 'Lihat Mapel' : mode === 'edit' ? 'Edit Mapel' : 'Tambah Mapel' }}
      </h3>

      <div class="grid grid-cols-1 gap-4">
        <!-- Nama Mapel -->
        <div>
          <label class="block mb-1 font-medium">Nama Mapel</label>
          <input v-model="form.nama_mapel" :disabled="readonly"
                 class="w-full px-3 py-2 border rounded text-gray-900" />
          <p v-if="errors.nama_mapel" class="text-red-500 text-sm mt-1">{{ errors.nama_mapel }}</p>
        </div>

        <!-- Kode Mapel -->
        <div>
          <label class="block mb-1 font-medium">Kode Mapel</label>
          <input v-model="form.kode_mapel" :disabled="readonly"
                 class="w-full px-3 py-2 border rounded text-gray-900" />
          <p v-if="errors.kode_mapel" class="text-red-500 text-sm mt-1">{{ errors.kode_mapel }}</p>
        </div>

        <!-- Guru -->
        <div>
          <label class="block mb-1 font-medium">Guru</label>
          <select v-model="form.id_guru" :disabled="readonly"
                  class="w-full px-3 py-2 border rounded text-gray-900">
            <option disabled value="">Pilih Guru</option>
            <option v-for="(guru, index) in guruList" :value="index + 1" :key="index">{{ guru }}</option>
          </select>
          <p v-if="errors.id_guru" class="text-red-500 text-sm mt-1">{{ errors.id_guru }}</p>
        </div>
      </div>

      <!-- Tombol -->
      <div class="flex justify-end mt-6 space-x-2">
        <button @click="onCancel" class="px-4 py-2 border rounded hover:bg-gray-100">
          {{ readonly ? 'Kembali' : 'Batal' }}
        </button>
        <button v-if="!readonly" @click="onSave"
                class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
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
  guruList: Array,
})

function onCancel() {
  emit('cancel')
}
function onSave() {
  emit('save')
}
</script>
