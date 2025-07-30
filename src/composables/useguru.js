import { ref, computed } from 'vue'
import guruData from '../stores/guru.json'

export function useGuru() {
  const guruList = ref([...guruData])
  const newGuru = ref({
    nama_guru: '',
    nip: '',
    jenis_kelamin: '',
    tgl_lahir: '',
    alamat: '',
    no_telp: '',
    email: '',
  })
  const deleteIndex = ref(null)
  const showDeleteModal = ref(false)
  const editedGuru = ref(null)
  const editedIndex = ref(null)
  const showModal = ref(false)
  const errors = ref({})

  const formGuru = computed(() => (editedIndex.value !== null ? editedGuru.value : newGuru.value))

  function validateForm() {
    errors.value = {}
    const f = formGuru.value
    if (!f.nama_guru) errors.value.nama_guru = 'Wajib diisi'
    if (!f.nip) errors.value.nip = 'Wajib diisi'
    if (!f.jenis_kelamin) errors.value.jenis_kelamin = 'Wajib dipilih'
    if (!f.tgl_lahir) errors.value.tgl_lahir = 'Wajib diisi'
    if (!f.alamat) errors.value.alamat = 'Wajib diisi'
    if (!f.no_telp) errors.value.no_telp = 'Wajib diisi'
    if (!f.email) errors.value.email = 'Wajib diisi'
    return Object.keys(errors.value).length === 0
  }

  function openAddModal() {
    resetNewGuru()
    editedIndex.value = null
    showModal.value = true
  }

  function editGuru(index) {
    editedIndex.value = index
    editedGuru.value = { ...guruList.value[index] }
    showModal.value = true
  }

  function saveModal() {
    if (!validateForm()) return
    if (editedIndex.value === null) {
      guruList.value.push({ ...newGuru.value })
    } else {
      guruList.value.splice(editedIndex.value, 1, { ...editedGuru.value })
    }
    reorderID()
    closeModal()
  }

  function deleteGuru(index) {
    deleteIndex.value = index
    showDeleteModal.value = true
  }
  function confirmDelete() {
    guruList.value.splice(deleteIndex.value, 1)
    reorderID()
    showDeleteModal.value = false
  }

  function closeModal() {
    editedGuru.value = null
    editedIndex.value = null
    showModal.value = false
    errors.value = {}
  }

  function resetNewGuru() {
    newGuru.value = {
      nama_guru: '',
      nip: '',
      jenis_kelamin: '',
      tgl_lahir: '',
      alamat: '',
      no_telp: '',
      email: '',
    }
  }

  function reorderID() {
    guruList.value = guruList.value.map((g, i) => ({
      ...g,
      id_guru: i + 1,
    }))
  }

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
}
