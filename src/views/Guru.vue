<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ModalFormGuru from '@/components/ModalFormGuru.vue'
import useGuru from '@/composables/useGuru'

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
} = useGuru()

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
  <div class="p-4 text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-2xl font-semibold">Data Guru</h2>
      <button
        @click="tambahBaru"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Tambah
      </button>
    </div>

    <div class="overflow-x-auto shadow rounded border dark:border-gray-700">
      <table class="min-w-full text-sm">
        <thead class="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th class="p-3 border">No</th>
            <th class="p-3 border">Nama</th>
            <th class="p-3 border">NIP</th>
            <th class="p-3 border">JK</th>
            <th class="p-3 border">Telp</th>
            <th class="p-3 border">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in data"
            :key="item.id_guru"
            @click="pilihItem(item)"
            :class="[
              'cursor-pointer',
              selectedItem?.id_guru === item.id_guru
                ? 'bg-blue-100 dark:bg-blue-900/30'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800',
            ]"
          >
            <td class="p-3 border">{{ index + 1 }}</td>
            <td class="p-3 border">{{ item.nama_guru }}</td>
            <td class="p-3 border">{{ item.nip }}</td>
            <td class="p-3 border">{{ item.jenis_kelamin }}</td>
            <td class="p-3 border">{{ item.no_telp }}</td>
            <td class="p-3 border">{{ item.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <transition name="fade-slide">
      <div v-if="selectedItem" ref="actionRef" class="mt-4 flex space-x-2">
        <button @click="editItem(selectedItem)" class="px-4 py-2 bg-yellow-500 text-white rounded">
          Edit
        </button>
        <button
          @click="
            () => {
              hapusItem(selectedItem.id_guru)
              clearSelected()
            }
          "
          class="px-4 py-2 bg-red-600 text-white rounded"
        >
          Hapus
        </button>
        <button @click="lihatItem(selectedItem)" class="px-4 py-2 bg-gray-700 text-white rounded">
          Lihat
        </button>
        <button @click="clearSelected" class="px-4 py-2 border rounded dark:border-gray-700">
          Batal
        </button>
      </div>
    </transition>

    <ModalFormGuru
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
