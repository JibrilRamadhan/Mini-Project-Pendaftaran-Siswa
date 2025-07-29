<template> <div class="container mx-auto p-6 bg-gray-50 min-h-screen font-sans">
   <div class="mb-8 text-center"> <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Manajemen Kelas</h1>
     <p class="text-lg text-gray-700 mb-6">Mengelola dan memantau data kelas.</p>
  <div class="flex flex-col sm:flex-row justify-center gap-4">
    <div class="bg-white p-4 rounded-xl shadow text-center w-64">
      <div class="text-sm text-gray-500 mb-1">Total Kelas</div>
      <div class="text-2xl font-semibold text-blue-600">{{ totalKelas }}</div>
    </div>
    <div class="bg-white p-4 rounded-xl shadow text-center w-64">
      <div class="text-sm text-gray-500 mb-1">Total Kapasitas</div>
      <div class="text-2xl font-semibold text-purple-600">{{ totalKapasitas }}</div>
    </div>
  </div>
</div>

<button @click="openForm(null, kelasList)" class="mb-6 px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700">
  Tambah Kelas Baru
</button>

<table class="min-w-full divide-y divide-gray-200 shadow-md rounded-xl overflow-hidden bg-white">
  <thead class="bg-gray-100">
    <tr>
      <th class="px-6 py-3 text-left text-sm font-medium text-gray-700">No</th>
      <th class="px-6 py-3 text-left text-sm font-medium text-gray-700">Kode</th>
      <th class="px-6 py-3 text-left text-sm font-medium text-gray-700">Nama Kelas</th>
      <th class="px-6 py-3 text-left text-sm font-medium text-gray-700">Kapasitas</th>
      <th class="px-6 py-3 text-left text-sm font-medium text-gray-700">Wali Kelas</th>
      <th class="px-6 py-3 text-left text-sm font-medium text-gray-700">Aksi</th>
    </tr>
  </thead>
  <tbody class="divide-y divide-gray-200">
    <tr v-for="(kelas, index) in kelasList" :key="index" class="hover:bg-gray-50 transition">
      <td class="px-6 py-4">{{ index + 1 }}</td>
      <td class="px-6 py-4">{{ kelas.kode_kelas }}</td>
      <td class="px-6 py-4">{{ kelas.nama_kelas }}</td>
      <td class="px-6 py-4">{{ kelas.kapasitas }}</td>
      <td class="px-6 py-4">{{ getNamaGuruById(kelas.id_wali_kelas) }}</td>
      <td class="px-6 py-4 space-x-2">
        <button @click="openForm(kelas, kelasList)" class="text-yellow-600 hover:underline">Edit</button>
        <button @click="deleteKelas(index)" class="text-red-600 hover:underline">Hapus</button>
      </td>
    </tr>
    <tr v-if="kelasList.length === 0">
      <td colspan="6" class="text-center py-6 text-gray-500">Tidak ada data kelas.</td>
    </tr>
  </tbody>
</table>

<Modal
  v-if="showModal"
  :form="form"
  :guruList="guruList"
  :editIndex="editIndex"
  @save="saveKelas"
  @close="closeForm"
/>
</div> </template> <script setup> import Modal from '@/components/Modal.vue' 
import { useFormKelas } from '@/composables/formKelas' 
import { useKelas } from '@/composables/logic' 
import Guru from '@/stores/Guru.json'
 const { form, editIndex, showModal, openForm, closeForm, guruList } = useFormKelas() 
const { kelasList, saveKelas, deleteKelas, totalKelas, totalKapasitas } = useKelas(form, editIndex, closeForm) 
function getNamaGuruById(id) { const guru = Guru.find(g => String(g.id_guru) === String(id)) 
return guru ? guru.nama_guru : '-' } </script>