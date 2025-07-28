<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="dark:bg-gray-900 bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg text-sm">
      <h3 class="text-lg font-semibold mb-4">
        {{ mode === 'edit' && readonly ? 'Lihat Data' : mode === 'edit' ? 'Edit Guru' : 'Tambah Guru' }}
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block mb-1 font-medium">Nama Guru</label>
          <input v-model="form.nama_guru" class="w-full px-3 py-2 border rounded text-black" :disabled="readonly" />
        </div>

        <div>
          <label class="block mb-1 font-medium">NIP</label>
          <input v-model="form.nip" class="w-full px-3 py-2 border rounded text-black" :disabled="readonly" />
        </div>

        <div>
          <label class="block mb-1 font-medium">Jenis Kelamin</label>
          <select v-model="form.jenis_kelamin" class="w-full px-3 py-2 border rounded" :disabled="readonly">
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        <div>
          <label class="block mb-1 font-medium">Tanggal Lahir</label>
          <input type="date" v-model="form.tgl_lahir" class="w-full px-3 py-2 border rounded" :disabled="readonly" />
        </div>

        <div class="md:col-span-2">
          <label class="block mb-1 font-medium">Alamat</label>
          <textarea v-model="form.alamat" class="w-full px-3 py-2 border rounded" :disabled="readonly" />
        </div>

        <div>
          <label class="block mb-1 font-medium">No Telp</label>
          <input v-model="form.no_telp" class="w-full px-3 py-2 border rounded" :disabled="readonly" />
        </div>

        <div>
          <label class="block mb-1 font-medium">Email</label>
          <input v-model="form.email" class="w-full px-3 py-2 border rounded" :disabled="readonly" />
        </div>
      </div>

      <div class="flex justify-end mt-6 space-x-2">
        <button @click="onCancel" class="px-4 py-2 border rounded hover:bg-gray-100">
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
