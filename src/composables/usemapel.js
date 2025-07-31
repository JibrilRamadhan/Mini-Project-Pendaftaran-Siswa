import { ref, reactive, onMounted, computed } from 'vue'
import mapelData from '../data/mapel.json'

export default function useMapel() {
  const mapels = ref([])
  const search = ref('')
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

  // Load data awal dan atur ID
  onMounted(() => {
    mapels.value = mapelData.map((item, index) => ({
      ...item,
      id_mapel: index + 1
    }))
  })

  // Fitur pencarian berdasarkan nama, kode, id_guru, dan id_mapel
  const filteredMapels = computed(() => {
    if (!search.value.trim()) return mapels.value
    const keyword = search.value.toLowerCase()
    return mapels.value.filter((m) =>
      m.nama_mapel.toLowerCase().includes(keyword) ||
      m.kode_mapel.toLowerCase().includes(keyword) ||
      m.id_guru.toString().toLowerCase().includes(keyword) ||
      m.id_mapel.toString().toLowerCase().includes(keyword)
    )
  })

  const clearErrors = () => {
    errors.nama_mapel = ''
    errors.kode_mapel = ''
    errors.id_guru = ''
  }

  const resetForm = () => {
    form.id_mapel = null
    form.nama_mapel = ''
    form.kode_mapel = ''
    form.id_guru = null
    editIndex.value = null
    clearErrors()
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
    const item = filteredMapels.value[index]
    const realIndex = mapels.value.findIndex((m) => m.id_mapel === item.id_mapel)
    Object.assign(form, mapels.value[realIndex])
    editIndex.value = realIndex
    clearErrors()
    showModal.value = true
  }

  const konfirmasiHapus = (index) => {
    const item = filteredMapels.value[index]
    const realIndex = mapels.value.findIndex((m) => m.id_mapel === item.id_mapel)
    indexToDelete.value = realIndex
    showConfirmDelete.value = true
  }

  const hapus = () => {
    if (indexToDelete.value !== null) {
      mapels.value.splice(indexToDelete.value, 1)
      // Re-assign ID mapel agar tetap berurutan
      mapels.value = mapels.value.map((m, idx) => ({
        ...m,
        id_mapel: idx + 1
      }))
    }
    indexToDelete.value = null
    showConfirmDelete.value = false
  }

  return {
    mapels,
    filteredMapels,
    form,
    errors,
    search,
    showModal,
    showConfirmDelete,
    openModal,
    closeModal,
    updateForm,
    simpan,
    edit,
    konfirmasiHapus,
    hapus
  }
}
