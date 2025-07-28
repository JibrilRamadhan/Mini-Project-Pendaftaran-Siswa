<template>
  <div class="overflow-x-auto">
    <table class="w-full text-center border border-gray-300 rounded-xl overflow-hidden">
      <thead class="bg-blue-100 text-gray-800 text-lg">
        <tr>
          <th class="px-8 py-6 border">#</th>
          <th class="px-8 py-6 border">Nama</th>
          <th class="px-8 py-6 border">Kode</th>
          <th class="px-8 py-6 border">ID Guru</th>
          <th class="px-8 py-6 border">Aksi</th>
        </tr>
      </thead>
      <tbody class="text-lg">
        <tr
          v-for="(mapel, index) in data"
          :key="mapel.id_mapel"
          class="hover:bg-blue-50 transition"
        >
          <td class="px-8 py-4 border">{{ index + 1 }}</td>
          <td class="px-8 py-4 border">{{ mapel.nama_mapel }}</td>
          <td class="px-8 py-4 border">{{ mapel.kode_mapel }}</td>
          <td class="px-8 py-4 border">{{ mapel.id_guru }}</td>
          <td class="px-8 py-4 border space-x-4">
            <button @click="$emit('edit', index)" class="text-yellow-600 font-semibold hover:underline">Edit</button>
            <button @click="$emit('hapus', index)" class="text-red-600 font-semibold hover:underline">Hapus</button>
          </td>
        </tr>
        <tr v-if="data.length === 0">
          <td colspan="5" class="py-6 text-gray-500 italic">Belum ada data.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['data']
};
</script>
