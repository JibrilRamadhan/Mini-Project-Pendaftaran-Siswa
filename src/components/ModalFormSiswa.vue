<template>
  <div
    v-if="showForm"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
      <h2 class="text-xl font-bold mb-4">
        {{ editIndex === null ? 'Form Tambah Siswa' : 'Form Edit Siswa' }}
      </h2>

      <form @submit.prevent="tambahSiswa">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label>NISN</label>
            <input v-model="form.nisn" type="text" class="input" required />
          </div>
          <div>
            <label>Nama</label>
            <input v-model="form.nama" type="text" class="input" required />
          </div>
          <div>
            <label>Alamat</label>
            <input v-model="form.alamat" type="text" class="input" required />
          </div>
          <div>
            <label>Tgl Lahir</label>
            <input v-model="form.tgl_lahir" type="date" class="input" required />
          </div>
          <div>
            <label>Jenis Kelamin</label>
            <select v-model="form.jk" class="input" required>
              <option disabled value="">Pilih</option>
              <option>L</option>
              <option>P</option>
            </select>
          </div>
          <div>
            <label>No. Telp</label>
            <input v-model="form.no_tlp" type="number" class="input" required />
          </div>
          <div>
            <label>Nama Wali</label>
            <input v-model="form.nama_wali" type="text" class="input" required />
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-6">
          <button
            type="button"
            @click="resetForm"
            class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Batal
          </button>
          <button
            type="submit"
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {{ editIndex === null ? 'Simpan' : 'Update' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
defineProps([
  'form',
  'showForm',
  'editIndex',
  'tambahSiswa',
  'resetForm',
])
</script>

<style scoped>
.input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
