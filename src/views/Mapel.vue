<template>
  <div class="bg-gradient-to-br from-gray-150 to-white px-6 sm:px-12 py-20">
    <div class="bg-white w-full rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] px-10 py-14">

      <!-- Judul -->
      <h1 class="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
        📚 Data Mata Pelajaran
      </h1>

      <!-- Search + Tambah Mapel -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <!-- Search input -->
        <div class="relative w-full md:w-1/2">
          <input
            type="text"
            v-model="search"
            placeholder="Cari nama / kode mapel..."
            class="border rounded-xl px-5 py-3 w-full text-lg shadow focus:outline-none focus:ring"
          />
          <button
            v-if="search"
            @click="search = ''"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black text-2xl"
            title="Hapus pencarian"
          >
            ×
          </button>
        </div>

        <!-- Tombol Tambah -->
        <ButtonAdd class="text-xl px-8 py-3 shadow-md hover:shadow-lg" @click="openModal">
          + Tambah Mapel
        </ButtonAdd>
      </div>

      <!-- Tabel -->
      <MapelTable
        :data="filteredMapels"
        @edit="edit"
        @hapus="konfirmasiHapus"
      />
    </div>

    <!-- Modal Form -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-[1.5rem] shadow-2xl w-full max-w-4xl p-12 animate-fadeIn">
          <h2 class="text-4xl font-bold text-gray-800 text-center mb-8">
            {{ editIndex !== null ? 'Edit Mata Pelajaran' : 'Tambah Mata Pelajaran' }}
          </h2>
          <MapelForm :form="form" :errors="errors" @update-form="updateForm" />
          <div class="flex justify-end gap-4 mt-10">
            <ButtonCancel class="text-lg px-6 py-3" @click="closeModal">Batal</ButtonCancel>
            <ButtonAdd class="text-lg px-6 py-3" @click="simpan">Simpan</ButtonAdd>
          </div>
        </div>
      </div>
    </transition>

    <!-- Modal Hapus -->
    <transition name="fade">
      <div
        v-if="showConfirmDelete"
        class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      >
        <div class="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-xl animate-fadeIn">
          <h3 class="text-3xl font-bold text-gray-800 text-center mb-4">
            Yakin ingin menghapus data ini?
          </h3>
          <p class="text-lg text-gray-600 text-center mb-6">
            Data yang dihapus tidak bisa dikembalikan.
          </p>
          <div class="flex justify-center gap-6 mt-8">
            <ButtonCancel class="text-lg px-6 py-3" @click="showConfirmDelete = false">Batal</ButtonCancel>
            <button
              class="text-lg px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-md transition duration-200"
              @click="hapus"
            >
              Ya, Hapus
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import useMapel from '../composables/useMapel'
import ButtonAdd from '../components/ui/buttonadd.vue'
import ButtonCancel from '../components/ui/buttoncancel.vue'
import MapelTable from '../components/mapel/mapeltable.vue'
import MapelForm from '../components/mapel/mapelform.vue'

export default {
  components: {
    ButtonAdd,
    ButtonCancel,
    MapelTable,
    MapelForm
  },
  setup() {
    const {
      mapels,
      filteredMapels,
      search,
      showModal,
      showConfirmDelete,
      editIndex,
      form,
      errors,
      openModal,
      closeModal,
      updateForm,
      simpan,
      edit,
      konfirmasiHapus,
      hapus
    } = useMapel()

    return {
      mapels,
      filteredMapels,
      search,
      showModal,
      showConfirmDelete,
      editIndex,
      form,
      errors,
      openModal,
      closeModal,
      updateForm,
      simpan,
      edit,
      konfirmasiHapus,
      hapus
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
