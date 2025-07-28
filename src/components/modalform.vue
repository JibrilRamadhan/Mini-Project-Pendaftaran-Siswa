<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="dark:bg-gray-900 bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg text-sm relative">
      <h3 class="text-lg font-semibold mb-4">
        {{
          mode === 'edit' && readonly ? 'Lihat Data' : mode === 'edit' ? 'Edit Jam' : 'Tambah Jam'
        }}
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Hari -->
        <div>
          <label class="block mb-1 font-medium">Hari</label>
          <select
            v-model="form.hari"
            class="w-full px-3 py-2 border rounded text-gray-900"
            :disabled="readonly"
          >
            <option disabled value="">Pilih Hari</option>
            <option v-for="hari in hariList" :key="hari" :value="hari">{{ hari }}</option>
          </select>
          <p v-if="errors.hari" class="text-red-500 text-sm mt-1">{{ errors.hari }}</p>
        </div>

        <!-- Jam Mulai -->
        <div>
          <label class="block mb-1 font-medium">Jam Mulai</label>
          <input
            type="time"
            v-model="form.jam_mulai"
            class="w-full px-3 py-2 border rounded text-gray-900"
            :disabled="readonly"
          />
          <p v-if="errors.jam_mulai" class="text-red-500 text-sm mt-1">{{ errors.jam_mulai }}</p>
        </div>

        <!-- Jam Selesai -->
        <div>
          <label class="block mb-1 font-medium">Jam Selesai</label>
          <input
            type="time"
            v-model="form.jam_selesai"
            class="w-full px-3 py-2 border rounded text-gray-900"
            :disabled="readonly"
          />
          <p v-if="errors.jam_selesai" class="text-red-500 text-sm mt-1">
            {{ errors.jam_selesai }}
          </p>
        </div>

        <!-- Mapel -->
        <div>
          <label class="block mb-1 font-medium">Mapel</label>
          <select
            v-model="form.id_mapel"
            class="w-full px-3 py-2 border rounded text-gray-900"
            :disabled="readonly"
          >
            <option disabled value="">Pilih Mapel</option>
            <option v-for="(mapel, index) in mapelList" :value="index + 1" :key="index">
              {{ mapel }}
            </option>
          </select>
          <p v-if="errors.id_mapel" class="text-red-500 text-sm mt-1">{{ errors.id_mapel }}</p>
        </div>

        <!-- Guru -->
        <div>
          <label class="block mb-1 font-medium">Guru</label>
          <select
            v-model="form.id_guru"
            class="w-full px-3 py-2 border rounded text-gray-900"
            :disabled="readonly"
          >
            <option disabled value="">Pilih Guru</option>
            <option v-for="(guru, index) in guruList" :value="index + 1" :key="index">
              {{ guru }}
            </option>
          </select>
          <p v-if="errors.id_guru" class="text-red-500 text-sm mt-1">{{ errors.id_guru }}</p>
        </div>

        <!-- Kelas -->
        <div>
          <label class="block mb-1 font-medium">Kelas</label>
          <select
            v-model="form.id_kelas"
            class="w-full px-3 py-2 border rounded text-gray-900"
            :disabled="readonly"
          >
            <option disabled value="">Pilih Kelas</option>
            <option v-for="(kelas, index) in kelasList" :value="index + 1" :key="index">
              {{ kelas }}
            </option>
          </select>
          <p v-if="errors.id_kelas" class="text-red-500 text-sm mt-1">{{ errors.id_kelas }}</p>
        </div>
      </div>

      <!-- Tombol -->
      <div class="flex justify-end mt-6 space-x-2">
        <button
          @click="onCancel"
          class="px-4 py-2 border rounded hover:bg-gray-100 hover:text-gray-800"
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
  hariList: Array,
  mapelList: Array,
  guruList: Array,
  kelasList: Array,
})

function onCancel() {
  emit('cancel')
}
function onSave() {
  emit('save')
}
</script>
