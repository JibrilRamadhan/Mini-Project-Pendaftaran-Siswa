<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white dark:bg-gray-900 w-full max-w-3xl p-6 rounded-lg shadow-lg text-sm">
      <h3 class="text-lg font-semibold mb-4">Form Absensi</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block mb-1 font-medium">Tanggal</label>
          <input
            type="date"
            v-model="form.tanggal"
            class="w-full px-3 py-2 border rounded dark:bg-gray-800"
          />
        </div>

        <!-- Kelas -->
        <div>
        <label class="block mb-1 font-medium">Kelas</label>
        <select v-model="form.kelas_id" class="w-full px-3 py-2 border rounded">
            <option disabled value="">-- Pilih Kelas --</option>
            <option v-for="kelas in kelasList" :key="kelas.id" :value="kelas.id">
            {{ kelas.nama_kelas }}
            </option>
        </select>
        </div>
        
        <!-- Wali Kelas -->
        <div>
        <label class="block mb-1 font-medium">Wali Kelas</label>
        <select v-model="form.wali_kelas_id" class="w-full px-3 py-2 border rounded">
            <option disabled value="">-- Pilih Wali Kelas --</option>
            <option v-for="guru in guruList" :key="guru.id_guru" :value="guru.id_guru">
            {{ guru.nama_guru }}
            </option>
        </select>
        </div>

        <!-- Siswa Field -->
        <div>
          <label class="block mb-1 font-medium">Siswa</label>
          <div
            class="w-full px-3 py-2 border rounded bg-white dark:bg-gray-800 cursor-pointer"
            @click="showSiswaModal = true"
          >
            {{ selectedSiswa?.nama || 'Pilih Siswa' }}
          </div>
        </div>

        <div>
          <label class="block mb-1 font-medium">Status</label>
          <select v-model="form.status" class="w-full px-3 py-2 border rounded dark:bg-gray-800">
            <option value="Hadir">Hadir</option>
            <option value="Alpha">Alpha</option>
            <option value="Sakit">Sakit</option>
            <option value="Izin">Izin</option>
          </select>
        </div>
      </div>

      <!-- Modal Siswa -->
      <div
        v-if="showSiswaModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div class="bg-white dark:bg-gray-900 w-full max-w-3xl p-6 rounded-lg shadow-lg">
          <h3 class="text-lg font-semibold mb-4">Pilih Siswa</h3>

          <input
            v-model="searchNama"
            type="text"
            placeholder="Cari nama siswa..."
            class="w-full mb-4 px-3 py-2 border rounded dark:bg-gray-800"
          />

          <div class="max-h-64 overflow-y-auto border rounded">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-gray-100 dark:bg-gray-800">
                  <th class="p-2">Nama</th>
                  <th class="p-2">NISN</th>
                  <th class="p-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="s in filteredSiswa" :key="s.id" class="border-t">
                  <td class="p-2">{{ s.nama }}</td>
                  <td class="p-2">{{ s.nisn }}</td>
                  <td class="p-2">
                    <button @click="pilihSiswa(s)" class="text-blue-600 hover:underline">
                      Pilih
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex justify-end mt-4">
            <button
              @click="showSiswaModal = false"
              class="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>

      <!-- Tombol -->
      <div class="flex justify-end mt-6 space-x-2">
        <button
          @click="onCancel"
          class="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Batal
        </button>
        <button @click="onSave" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Simpan
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue' 

const emit = defineEmits(['cancel', 'save'])

const props = defineProps({
  show: Boolean,
  form: Object,
  siswaList: Array,
  kelasList: Array,
  guruList: Array,
})

const showSiswaModal = ref(false)
const searchNama = ref('')

const selectedSiswa = computed(() => props.siswaList.find((s) => s.id === props.form.siswa_id))

const filteredSiswa = computed(() =>
  props.siswaList.filter((s) => s.nama.toLowerCase().includes(searchNama.value.toLowerCase())),
)

function pilihSiswa(siswa) {
  props.form.siswa_id = siswa.id
  showSiswaModal.value = false
}

function onCancel() {
  emit('cancel')
}

function onSave() {
  emit('save')
}
</script>
