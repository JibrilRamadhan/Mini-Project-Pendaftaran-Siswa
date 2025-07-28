<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ModalForm from '@/components/ModalForm.vue'
import useJamPelajaran from '@/composables/useJamPelajaran'

const {
  data,
  showForm,
  mode,
  readonly,
  form,
  errors,
  hariList,
  mapelList,
  guruList,
  kelasList,
  selectedItem,
  lihatItem,
  tambahBaru,
  editItem,
  hapusItem,
  simpan,
  batal,
  pilihItem,
  clearSelected,
} = useJamPelajaran()

const actionRef = ref(null)

function handleClickOutside(event) {
  // Jika klik bukan pada tombol aksi atau tabel
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
  <div class="p-6">
    <!-- HEADER -->
    <div class="flex justify-between mb-4">
      <h2 class="text-xl font-bold">Data Jam Pelajaran</h2>
      <button
        @click="tambahBaru"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Tambah
      </button>
    </div>

    <!-- TABEL -->
    <table class="min-w-full bg-white border text-sm">
      <thead class="bg-gray-100">
        <tr>
          <th class="p-2 border">No</th>
          <th class="p-2 border">Hari</th>
          <th class="p-2 border">Jam Mulai</th>
          <th class="p-2 border">Jam Selesai</th>
          <th class="p-2 border">Mapel</th>
          <th class="p-2 border">Guru</th>
          <th class="p-2 border">Kelas</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in data"
          :key="item.id_jam"
          @click="pilihItem(item)"
          :class="[
            'cursor-pointer hover:bg-blue-50',
            selectedItem?.id_jam === item.id_jam ? 'bg-blue-100' : '',
          ]"
        >
          <td class="p-2 border">{{ index + 1 }}</td>
          <td class="p-2 border">{{ item.hari }}</td>
          <td class="p-2 border">{{ item.jam_mulai }}</td>
          <td class="p-2 border">{{ item.jam_selesai }}</td>
          <td class="p-2 border">{{ mapelList[item.id_mapel - 1] }}</td>
          <td class="p-2 border">{{ guruList[item.id_guru - 1] }}</td>
          <td class="p-2 border">{{ kelasList[item.id_kelas - 1] }}</td>
        </tr>
      </tbody>
    </table>

    <!-- TOMBOL AKSI -->
    <transition name="fade-slide">
      <div v-if="selectedItem" ref="actionRef" class="mt-4 flex space-x-2">
        <button
          @click="editItem(selectedItem)"
          class="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          @click="
            hapusItem(selectedItem.id_jam),
            clearSelected()
          "
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
        <button @click="clearSelected" class="px-4 py-2 bg-white border rounded hover:bg-gray-100">
          Batal
        </button>
      </div>
    </transition>

    <!-- MODAL -->
    <ModalForm
      :show="showForm"
      :mode="mode"
      :readonly="readonly"
      :form="form"
      :errors="errors"
      :hariList="hariList"
      :mapelList="mapelList"
      :guruList="guruList"
      :kelasList="kelasList"
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
