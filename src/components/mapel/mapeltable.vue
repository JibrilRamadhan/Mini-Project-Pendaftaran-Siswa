<template>
  <div class="overflow-x-auto">
    <table class="w-full text-center border border-gray-300 rounded-xl overflow-hidden shadow-xl bg-white">
      <thead class="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800 text-lg">
        <tr>
          <th class="px-8 py-6 border">#</th>
          <th class="px-8 py-6 border">Nama</th>
          <th class="px-8 py-6 border">Kode</th>
          <th class="px-8 py-6 border">ID Guru</th>
          <th class="px-8 py-6 border">Aksi</th>
        </tr>
      </thead>
      <tbody class="text-base">
        <tr
          v-for="(mapel, index) in data"
          :key="mapel.id_mapel"
          class="hover:bg-blue-50 transition duration-200"
        >
          <td class="px-8 py-4 border text-lg">{{ mapel.id_mapel }}</td>
          <td class="px-8 py-4 border text-lg">{{ mapel.nama_mapel }}</td>
          <td class="px-8 py-4 border text-lg">{{ mapel.kode_mapel }}</td>
          <td class="px-8 py-4 border text-lg">{{ mapel.id_guru }}</td>
          <td class="px-8 py-4 border">
            <div class="flex justify-center gap-8 items-center">

              <!-- Tombol Edit -->
              <div class="group flex flex-col items-center">
                <button
                  @click="$emit('edit', index)"
                  class="text-gray-700 hover:text-blue-600 transition"
                  title="Edit"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 20h9M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
                  </svg>
                </button>
                <span class="mt-2 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition duration-200">
                  Edit
                </span>
              </div>

              <!-- Tombol Hapus -->
              <div class="group flex flex-col items-center">
                <button
                  @click="$emit('hapus', index)"
                  class="text-gray-700 hover:text-red-600 transition"
                  title="Hapus"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </button>
                <span class="mt-2 text-sm text-gray-600 opacity-0 group-hover:opacity-100 transition duration-200">
                  Hapus
                </span>
              </div>

            </div>
          </td>
        </tr>
        <tr v-if="data.length === 0">
          <td colspan="5" class="py-6 text-gray-500 italic text-lg">Data tidak ditemukan.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>
