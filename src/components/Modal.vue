<template> <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
   <div class="bg-white rounded-xl p-8 w-full max-w-md shadow-lg">
     <h2 class="text-2xl font-semibold text-gray-800 mb-4"> 
      {{ editIndex !== null ? 'Edit Kelas' : 'Tambah Kelas' }} </h2>

  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Kode Kelas</label>
      <input v-model="form.kode_kelas" type="text" class="w-full border px-4 py-2 rounded-lg" />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Nama Kelas</label>
      <input v-model="form.nama_kelas" type="text" class="w-full border px-4 py-2 rounded-lg" />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Kapasitas</label>
      <input v-model.number="form.kapasitas" type="number" min="1" class="w-full border px-4 py-2 rounded-lg" />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Wali Kelas</label>
      <select v-model="form.id_wali_kelas" class="w-full border px-4 py-2 rounded-lg">
        <option disabled value="">Pilih Wali Kelas</option>
        <option v-for="guru in guruList" :key="guru.id_guru" :value="guru.id_guru">
          {{ guru.nama_guru }}
        </option>
      </select>
    </div>
  </div>

  <div class="mt-6 flex justify-end space-x-3">
    <button @click.prevent="$emit('close')" class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition">
      Batal
    </button>
    <button @click.prevent="$emit('save')" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
      Simpan
    </button>
  </div>
</div>
</div> </template> 
<script setup> defineProps({ form: Object, editIndex: Number, guruList: Array })
 defineEmits(['save', 'close'])
  </script>