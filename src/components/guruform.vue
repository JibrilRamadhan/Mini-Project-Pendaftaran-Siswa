<template>
  <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded shadow-md w-full max-w-xl relative">
      <h3 class="text-xl font-semibold mb-4">
        {{ isEdit ? 'Edit Guru' : 'Tambah Guru' }}
      </h3>

      <div class="grid grid-cols-1 gap-3">
        <template v-for="(label, key) in fieldLabels" :key="key">
          <div class="flex items-start gap-4">
            <label class="w-40 font-medium pt-2">
              {{ label }}<span class="text-red-600">*</span>
            </label>
            <div class="flex-1">
              <input
                v-if="key !== 'jenis_kelamin' && key !== 'tgl_lahir' && key !== 'email'"
                v-model="formGuru[key]"
                class="border border-gray-300 rounded px-2 py-1 w-full"
              />
              <input
                v-else-if="key === 'tgl_lahir'"
                type="date"
                v-model="formGuru[key]"
                class="border border-gray-300 rounded px-2 py-1 w-full"
              />
              <input
                v-else-if="key === 'email'"
                type="email"
                v-model="formGuru[key]"
                class="border border-gray-300 rounded px-2 py-1 w-full"
              />
              <select
                v-else-if="key === 'jenis_kelamin'"
                v-model="formGuru[key]"
                class="border border-gray-300 rounded px-2 py-1 w-full"
              >
                <option value="">-- Pilih --</option>
                <option>Laki-laki</option>
                <option>Perempuan</option>
              </select>
              <p v-if="errors[key]" class="text-red-500 text-sm">{{ errors[key] }}</p>
            </div>
          </div>
        </template>
      </div>

      <div class="mt-6 flex justify-end gap-2">
        <button
          @click="$emit('save')"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
        >
          Simpan
        </button>
        <button
          @click="$emit('close')"
          class="bg-gray-500 text-white px-4 py-1 rounded"
        >
          Batal
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['formGuru', 'errors', 'isEdit'],
  emits: ['save', 'close'],
  data() {
    return {
      fieldLabels: {
        nama_guru: 'Nama Guru',
        nip: 'NIP',
        jenis_kelamin: 'Jenis Kelamin',
        tgl_lahir: 'Tanggal Lahir',
        alamat: 'Alamat',
        no_telp: 'No Telepon',
        email: 'Email',
      },
    }
  },
}
</script>
