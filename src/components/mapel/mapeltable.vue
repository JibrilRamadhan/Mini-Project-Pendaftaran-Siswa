<template>
  <div class="overflow-x-auto">
    <table class="w-full text-center border border-gray-300 rounded-xl overflow-hidden shadow-xl bg-white">
      <!-- Header -->
      <thead class="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800 text-lg">
        <tr>
          <th class="px-8 py-6 border">#</th>
          <th class="px-8 py-6 border">Nama</th>
          <th class="px-8 py-6 border">Kode</th>
          <th class="px-8 py-6 border">ID Guru</th>
          <th class="px-8 py-6 border">Aksi</th>
        </tr>
      </thead>

      <!-- Body -->
      <tbody class="text-base">
        <tr
          v-for="(mapel, index) in data"
          :key="mapel.id_mapel"
          class="hover:bg-blue-50 transition duration-200"
        >
          <td class="px-8 py-4 border">{{ index + 1 }}</td>
          <td class="px-8 py-4 border">{{ mapel.nama_mapel }}</td>
          <td class="px-8 py-4 border">{{ mapel.kode_mapel }}</td>
          <td class="px-8 py-4 border">{{ mapel.id_guru }}</td>

          <!-- Kolom Aksi -->
          <td class="px-8 py-4 border">
            <div class="flex justify-center items-center gap-3">
              <!-- Edit -->
              <div class="group relative">
                <button
                  @click="$emit('edit', index)"
                  class="p-2 rounded-full hover:bg-yellow-100 text-yellow-600 transition"
                  aria-label="Edit"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M15.232 5.232l3.536 3.536M4 20h4l10.292-10.292a1 1 0 00-1.414-1.414l-2.586-2.586a1 1 0 00-1.414 0L4 16v4z" />
                  </svg>
                </button>
                <span
                  class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                  Edit
                </span>
              </div>

              <!-- Hapus -->
              <div class="group relative">
                <button
                  @click="$emit('hapus', index)"
                  class="p-2 rounded-full hover:bg-red-100 text-red-600 transition"
                  aria-label="Hapus"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <span
                  class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                  Hapus
                </span>
              </div>
            </div>
          </td>
        </tr>

        <!-- Data kosong -->
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
