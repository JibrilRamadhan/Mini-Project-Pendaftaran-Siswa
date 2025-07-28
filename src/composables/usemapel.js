// composables/useMapel.js
import { ref, reactive, onMounted } from 'vue'
import mapelData from '../data/mapel.json'

export default function useMapel() {
  const mapels = ref([])
  const showModal = ref(false)
  const showConfirmDelete = ref(false)
  const indexToDelete = ref(null)
  const editIndex = ref(null)

  const form = reactive({
    id_mapel: null,
    nama_mapel: '',
    kode_mapel: '',
    id_guru: null
  })

  const errors = reactive({
    nama_mapel: '',
    kode_mapel: '',
    id_guru: ''
  })

  onMounted(() => {
    mapels.value = mapelData
  })

  const resetForm = () => {
    form.id_mapel = null
    form.nama_mapel = ''
    form.kode_mapel = ''
    form.id_guru = null
    editIndex.value = null
    clearErrors()
  }

  const clearErrors = () => {
    errors.nama_mapel = ''
    errors.kode_mapel = ''
    errors.id_guru = ''
  }

  const openModal = () => {
    resetForm()
    showModal.value = true
  }

  const closeModal = () => {
    showModal.value = false
    resetForm()
  }

  const updateForm = (field, value) => {
    form[field] = value
  }

  const simpan = () => {
    clearErrors()
    let valid = true

    if (!form.nama_mapel) {
      errors.nama_mapel = 'Nama Mapel harus diisi'
      valid = false
    }
    if (!form.kode_mapel) {
      errors.kode_mapel = 'Kode Mapel harus diisi'
      valid = false
    }
    if (form.id_guru === null || form.id_guru === '') {
      errors.id_guru = 'ID Guru harus diisi'
      valid = false
    }

    if (!valid) return

    if (editIndex.value === null) {
      const idBaru = mapels.value.length
        ? Math.max(...mapels.value.map((m) => m.id_mapel)) + 1
        : 1
      mapels.value.push({ ...form, id_mapel: idBaru })
    } else {
      mapels.value[editIndex.value] = { ...form }
    }

    closeModal()
  }

  const edit = (index) => {
    Object.assign(form, mapels.value[index])
    editIndex.value = index
    clearErrors()
    showModal.value = true
  }

  const konfirmasiHapus = (index) => {
    indexToDelete.value = index
    showConfirmDelete.value = true
  }

  const hapus = () => {
    if (indexToDelete.value !== null) {
      mapels.value.splice(indexToDelete.value, 1)
    }
    indexToDelete.value = null
    showConfirmDelete.value = false
  }

  return {
    mapels,
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
