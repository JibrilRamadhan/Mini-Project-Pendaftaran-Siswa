<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ModalForm from '../components/ModalsFormSiswa.vue'
import useSiswa from '@/composables/useSiswa'

const {
  data,
  showForm,
  mode,
  readonly,
  form,
  errors,
  selectedItem,
  lihatItem,
  tambahBaru,
  editItem,
  hapusItem,
  simpan,
  batal,
  pilihItem,
  clearSelected,
} = useSiswa()

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
  <div class="p-4 pb-10 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
    <!-- HEADER -->
    <div class="flex justify-between mb-4 items-center">
      <h2 class="text-2xl font-semibold">Data Siswa</h2>
      <button @click="tambahBaru" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow">
        <i class="ri-add-line"></i> Tambah
      </button>
    </div>

    <!-- TABEL -->
    <div class="overflow-x-auto bg-white dark:bg-gray-900 rounded shadow border dark:border-gray-700">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100 dark:bg-gray-800 text-left">
          <tr>
            <th class="p-3 border">No</th>
            <th class="p-3 border">NISN</th>
            <th class="p-3 border">Nama</th>
            <th class="p-3 border">Alamat</th>
            <th class="p-3 border">Tgl Lahir</th>
            <th class="p-3 border">JK</th>
            <th class="p-3 border">No Tlp</th>
            <th class="p-3 border">Nama Wali</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in data"
            :key="item.id"
            @click="pilihItem(item)"
            :class="[ 'cursor-pointer transition',
              selectedItem?.id === item.id
                ? 'bg-blue-100 dark:bg-blue-900/40'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800']"
          >
            <td class="p-3 border">{{ index + 1 }}</td>
            <td class="p-3 border">{{ item.nisn }}</td>
            <td class="p-3 border">{{ item.nama }}</td>
            <td class="p-3 border">{{ item.alamat }}</td>
            <td class="p-3 border">{{ item.tgl_lahir }}</td>
            <td class="p-3 border">{{ item.jk }}</td>
            <td class="p-3 border">{{ item.no_tlp }}</td>
            <td class="p-3 border">{{ item.nama_wali }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- TOMBOL AKSI -->
    <transition name="fade-slide">
      <div v-if="selectedItem" ref="actionRef" class="mt-4 flex flex-wrap gap-2">
        <button @click="editItem(selectedItem)" class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
        <button @click="hapusItem(selectedItem.id), clearSelected()" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Hapus</button>
        <button @click="lihatItem(selectedItem)" class="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">Lihat</button>
        <button @click="clearSelected" class="px-4 py-2 bg-white dark:bg-gray-800 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">Batal</button>
      </div>
    </transition>

    <ModalForm
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
