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

    <GuruTable :guruList="guruList" @editGuru="editGuru" @deleteGuru="deleteGuru" />

    <DeleteConfirm
      :show="showDeleteModal"
      :dataToDelete="guruList[deleteIndex]"
      @confirm="confirmDelete"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script>
import ButtonAdd from '../components/buttonadd.vue'
import GuruForm from '../components/guruform.vue'
import GuruTable from '../components/gurutable.vue'
import { useGuru } from '../composables/useGuru'
import DeleteConfirm from '../components/deleteconfirm.vue'
export default {
  components: { ButtonAdd, GuruForm, GuruTable, DeleteConfirm },
  setup() {
    const {
      guruList,
      formGuru,
      errors,
      showModal,
      editedIndex,
      openAddModal,
      editGuru,
      saveModal,
      deleteGuru,
      closeModal,
      deleteIndex,
      showDeleteModal,
      confirmDelete,
    } = useGuru()

    return {
      guruList,
      formGuru,
      errors,
      showModal,
      editedIndex,
      openAddModal,
      editGuru,
      saveModal,
      deleteGuru,
      closeModal,
      deleteIndex,
      showDeleteModal,
      confirmDelete,
    }
  },
}
</script>
