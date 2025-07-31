<template>
  <div class="p-4">
    <h2 class="text-2xl font-semibold mb-4">🧑‍🏫 Data Guru</h2>

    <ButtonAdd @click="openAddModal" />

    <GuruForm
      v-if="showModal"
      :formGuru="formGuru"
      :errors="errors"
      :isEdit="editedIndex !== null"
      @save="saveModal"
      @close="closeModal"
    />

    <input
      v-model="searchQuery"
      placeholder="Cari nama atau NIP..."
      class="border px-4 py-2 mb-4 w-full rounded"
    />

    <div class="mb-4">
      <label class="mr-2">Tampilkan:</label>
      <select v-model="limit" class="border px-2 py-1 rounded">
        <option :value="5">5</option>
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="guruList.length">Semua</option>
      </select>
    </div>

    <GuruTable :guruList="limitedGuruList" @editGuru="editGuru" @deleteGuru="deleteGuru" />
  </div>
</template>

<script>
import guruData from '../stores/guru.json'
import ButtonAdd from '../components/buttonadd.vue'
import GuruForm from '../components/guruform.vue'
import GuruTable from '../components/gurutable.vue'

export default {
  components: { ButtonAdd, GuruForm, GuruTable },
  data() {
    return {
      guruList: [...guruData],
      newGuru: {
        nama_guru: '',
        nip: '',
        jenis_kelamin: '',
        tgl_lahir: '',
        alamat: '',
        no_telp: '',
        email: '',
      },
      editedGuru: null,
      editedIndex: null,
      showModal: false,
      errors: {},
      searchQuery: '',
      limit: 5,
    }
  },
  computed: {
    formGuru() {
      return this.editedIndex !== null ? this.editedGuru : this.newGuru
    },
    filteredGuruList() {
      if (!this.searchQuery) return this.guruList
      const query = this.searchQuery.toLowerCase()
      return this.guruList.filter(
        (g) => g.nama_guru.toLowerCase().includes(query) || g.nip.includes(query),
      )
    },
    limitedGuruList() {
      return this.filteredGuruList.slice(0, this.limit)
    },
  },
  methods: {
    validateForm() {
      this.errors = {}
      const f = this.formGuru
      if (!f.nama_guru) this.errors.nama_guru = 'Wajib diisi'
      if (!f.nip) this.errors.nip = 'Wajib diisi'
      if (!f.jenis_kelamin) this.errors.jenis_kelamin = 'Wajib dipilih'
      if (!f.tgl_lahir) this.errors.tgl_lahir = 'Wajib diisi'
      if (!f.alamat) this.errors.alamat = 'Wajib diisi'
      if (!f.no_telp) this.errors.no_telp = 'Wajib diisi'
      if (!f.email) this.errors.email = 'Wajib diisi'
      return Object.keys(this.errors).length === 0
    },
    openAddModal() {
      this.resetNewGuru()
      this.editedIndex = null
      this.showModal = true
    },
    editGuru(index) {
      this.editedIndex = index
      this.editedGuru = { ...this.guruList[index] }
      this.showModal = true
    },
    saveModal() {
      if (!this.validateForm()) return
      if (this.editedIndex === null) {
        const newEntry = { ...this.newGuru }
        this.guruList.push(newEntry)
      } else {
        this.guruList.splice(this.editedIndex, 1, { ...this.editedGuru })
      }
      this.reorderID()
      this.closeModal()
    },
    deleteGuru(index) {
      if (confirm('Yakin ingin menghapus?')) {
        this.guruList.splice(index, 1)
        this.reorderID()
      }
    },
    closeModal() {
      this.editedGuru = null
      this.editedIndex = null
      this.showModal = false
      this.errors = {}
    },
    resetNewGuru() {
      this.newGuru = {
        nama_guru: '',
        nip: '',
        jenis_kelamin: '',
        tgl_lahir: '',
        alamat: '',
        no_telp: '',
        email: '',
      }
    },
    reorderID() {
      this.guruList = this.guruList.map((g, i) => ({ ...g, id_guru: i + 1 }))
    },
  },
}
</script>
