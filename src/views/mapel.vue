<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ModalFormMapel from '../components/ModalFormMapel.vue'
import useMapel from '../composables/useMapel'

const {
  data,
  showForm,
  mode,
  readonly,
  form,
  errors,
  guruList,
  selectedItem,
  tambahBaru,
  editItem,
  lihatItem,
  hapusItem,
  simpan,
  batal,
  pilihItem,
  clearSelected
} = useMapel()

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

<template>
  <div class="p-4 pb-10 text-gray-800 bg-white dark:bg-gray-900 dark:text-gray-100">
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold">Data Mapel</h2>
      <button @click="tambahBaru"
              class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow">
        <i class="ri-add-line"></i> Tambah
      </button>
    </div>

    <!-- TABEL -->
    <div class="overflow-x-auto bg-white dark:bg-gray-900 rounded shadow border border-gray-200 dark:border-gray-700">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th class="p-3 border">No</th>
            <th class="p-3 border">Nama Mapel</th>
            <th class="p-3 border">Kode Mapel</th>
            <th class="p-3 border">Guru</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="item.id_mapel" @click="pilihItem(item)"
              :class="[
                'cursor-pointer transition',
                selectedItem?.id_mapel === item.id_mapel
                  ? 'bg-blue-100 dark:bg-blue-900/40'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              ]">
            <td class="p-3 border">{{ index + 1 }}</td>
            <td class="p-3 border">{{ item.nama_mapel }}</td>
            <td class="p-3 border">{{ item.kode_mapel }}</td>
            <td class="p-3 border">{{ guruList[item.id_guru - 1] }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- TOMBOL AKSI -->
    <transition name="fade-slide">
      <div v-if="selectedItem" ref="actionRef" class="mt-4 flex flex-wrap gap-2">
        <button @click="editItem(selectedItem)" class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          Edit
        </button>
        <button @click="hapusItem(selectedItem.id_mapel); clearSelected()"
                class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Hapus
        </button>
        <button @click="lihatItem(selectedItem)"
                class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">
          Lihat
        </button>
        <button @click="clearSelected"
                class="px-4 py-2 bg-white dark:bg-gray-800 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          Batal
        </button>
      </div>
    </transition>

    <!-- MODAL -->
    <ModalFormMapel
      :show="showForm"
      :mode="mode"
      :readonly="readonly"
      :form="form"
      :errors="errors"
      :guruList="guruList"
      @cancel="batal"
      @save="simpan"
    />
  </div>
</template>

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
