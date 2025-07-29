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

    <GuruTable
      :guruList="guruList"
      @editGuru="editGuru"
      @deleteGuru="deleteGuru"
    />
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
    }
  },
  computed: {
    formGuru() {
      return this.editedIndex !== null ? this.editedGuru : this.newGuru
    },
  },
  methods: {
    
    openAddModal() {
      this.resetNewGuru()
      this.editedIndex = null
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
q