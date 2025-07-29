<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold mb-4 text-center">Daftar Siswa</h1>

    <button
      class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
      @click="bukaForm"
    >
      Tambah Siswa
    </button>

    <ModalFormSiswa
      :form="form"
      :showForm="showForm"
      :editIndex="editIndex"
      :tambahSiswa="tambahSiswa"
      :resetForm="resetForm"
    />
    <table class="w-full border-collapse shadow-lg">
      <thead class="bg-blue-100">
        <tr>
          <th class="border p-2">NO</th>
          <th class="border p-2">NISN</th>
          <th class="border p-2">Nama</th>
          <th class="border p-2">Alamat</th>
          <th class="border p-2">Tgl Lahir</th>
          <th class="border p-2">JK</th>
          <th class="border p-2">No Tlp</th>
          <th class="border p-2">Nama Wali</th>
          <th class="border p-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(siswa, index) in siswaList" :key="siswa.id">
          <td class="border p-2">{{ index + 1 }}</td>
          <td class="border p-2">{{ siswa.nisn }}</td>
          <td class="border p-2">{{ siswa.nama }}</td>
          <td class="border p-2">{{ siswa.alamat }}</td>
          <td class="border p-2">{{ siswa.tgl_lahir }}</td>
          <td class="border p-2">{{ siswa.jk }}</td>
          <td class="border p-2">{{ siswa.no_tlp }}</td>
          <td class="border p-2">{{ siswa.nama_wali }}</td>
          <td class="border p-2">
            <button
              @click="editSiswa(index)"
              class="bg-blue-600 px-2 py-1 rounded mr-2 text-sm text-white"
            >
              Edit
            </button>
            <button
              @click="hapusSiswa(index)"
              class="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
            >
              Hapus
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useSiswa } from '@/composable/siswa/useSiswa'
import ModalFormSiswa from '@/components/ModalFormSiswa.vue'

const {
  showForm,
  form,
  siswaList,
  editIndex,
  bukaForm,
  tambahSiswa,
  editSiswa,
  hapusSiswa,
  resetForm,
} = useSiswa()
</script>