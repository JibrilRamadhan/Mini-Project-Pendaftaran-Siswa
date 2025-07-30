<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded shadow-md max-w-md w-full">
      <h3 class="text-lg font-semibold mb-4 text-center">Konfirmasi Hapus</h3>
      <p class="mb-6 text-center">
        Apakah Anda yakin ingin menghapus <b>{{ dataToDelete?.nama_guru }}</b>?
      </p>.
      <div class="flex justify-center gap-4">
        <button
          class="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
          @click="$emit('confirm')"
        >
        
          Ya, Hapus
        </button>
        <button
          class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 rounded"
          @click="$emit('cancel')"
        >
          Batal
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: Boolean,
    dataToDelete: Object
  }
}
</script>
