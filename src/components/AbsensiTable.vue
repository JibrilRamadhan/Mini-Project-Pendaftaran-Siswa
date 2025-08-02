<template>
  <div class="overflow-x-auto rounded-md border border-gray-200 shadow-sm">
    <table class="w-full text-sm text-left text-gray-700 bg-white">
      <thead class="bg-gray-100 text-gray-800 uppercase text-xs">
        <tr>
          <th class="p-3 cursor-pointer" @click="$emit('sort-by', 'nisn')">
            NISN
          </th>
          <th class="p-3 cursor-pointer" @click="$emit('sort-by', 'nama')">
            Nama
          </th>
          <th class="p-3">Status</th>
          <th class="p-3">Keterangan</th>
          <th class="p-3">Aksi</th>
        </tr>
      </thead>
      <tbody>
          <tr
            v-for="item in items"
            :key="item.nisn"
            :class="[
              'border-t transition-colors',
              item.status === 'Hadir' ? 'bg-green-50' :
              item.status === 'Izin' ? 'bg-yellow-50' :
              item.status === 'Sakit' ? 'bg-blue-50' :
              item.status === 'Alpha' ? 'bg-red-50' :
              ''
            ]"
          >
          <td class="p-3">{{ item.nisn }}</td>
          <td class="p-3">{{ item.nama || '-' }}</td>
          <td class="p-3">
            <select
              v-model="item.status"
              @change="$emit('update-status', item.id, item.status)"
              class="border border-gray-300 rounded px-2 py-1 focus:ring focus:ring-blue-200"
            >
              <option value="Hadir">Hadir</option>
              <option value="Izin">Izin</option>
              <option value="Sakit">Sakit</option>
              <option value="Alpha">Alpha</option>
            </select>
          </td>
          <td class="p-3">
            <input
              type="text"
              v-model="item.keterangan"
              placeholder="Keterangan"
              @change="$emit('update-keterangan', item.nisn, item.keterangan)"
              class="border p-2 rounded w-full sm:w-64"
            />
          </td>
          <td class="p-3">
            <button
              @click="$emit('hapus-murid', item.nisn)"
              class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow-sm transition"
            >
              Hapus
            </button>
          </td>
        </tr>
        <tr v-if="items.length === 0">
          <td colspan="5" class="text-center text-gray-500 p-4">Belum ada murid.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps(['items'])
defineEmits(['update-status', 'hapus-murid', 'update-keterangan'])
</script>
