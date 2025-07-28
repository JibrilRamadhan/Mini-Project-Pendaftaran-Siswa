<template>
  <div class="p-2 pb-10 text-gray-800 bg-white dark:bg-gray-900 dark:text-gray-100">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold tracking-wide text-black dark:text-gray-100">Data Kelas</h2>
      <button
        @click="tambahBaru"
        class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow"
      >
        <i class="ri-add-line"></i> Tambah
      </button>
    </div>

    <div
      class="overflow-x-auto bg-white dark:bg-gray-900 rounded shadow border border-gray-200 dark:border-gray-700"
    >
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100 dark:bg-gray-800 text-left">
          <tr>
            <th class="p-3 border">No</th>
            <th class="p-3 border">Nama Kelas</th>
            <th class="p-3 border">Kode</th>
            <th class="p-3 border">Kapasitas</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in data"
            :key="item.id"
            @click="pilihItem(item)"
            :class="[
              'cursor-pointer transition',
              selectedItem?.id === item.id
                ? 'bg-blue-100 dark:bg-blue-900/40'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800',
            ]"
          >
            <td class="p-3 border">{{ index + 1 }}</td>
            <td class="p-3 border">{{ item.nama_kelas }}</td>
            <td class="p-3 border">{{ item.kode_kelas }}</td>
            <td class="p-3 border">{{ item.kapasitas }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <transition name="fade-slide">
      <div v-if="selectedItem" ref="actionRef" class="mt-4 flex flex-wrap gap-2 items-center">
        <button
          @click="editItem(selectedItem)"
          class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          @click="(hapusItem(selectedItem.id), clearSelected())"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Hapus
        </button>
        <button
          @click="lihatItem(selectedItem)"
          class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          Lihat
        </button>
        <button
          @click="clearSelected"
          class="px-4 py-2 bg-white dark:bg-gray-800 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Batal
        </button>
      </div>
    </transition>

    <ModalFormKelas
      :show="showForm"
      :mode="mode"
      :readonly="readonly"
      :form="form"
      :errors="errors"
      @cancel="batal"
      @save="simpan"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import useKelas from '@/composables/useKelas'
import ModalFormKelas from '@/components/ModalFormKelas.vue'

const {
  data,
  showForm,
  mode,
  readonly,
  form,
  errors,
  selectedItem,
  tambahBaru,
  editItem,
  lihatItem,
  hapusItem,
  simpan,
  batal,
  pilihItem,
  clearSelected,
} = useKelas()

const actionRef = ref(null)

function handleClickOutside(event) {
  if (
    actionRef.value &&
    !actionRef.value.contains(event.target) &&
    !event.target.closest('table') &&
    !event.target.closest('.modal')
  ) {
    clearSelected()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
