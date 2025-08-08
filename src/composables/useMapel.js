// composables/useMapel.js
import { ref, watch } from 'vue'
import mapelJson from '../stores/mapel.json'
import guruJson from '../stores/guru.json'

const STORAGE_KEY = 'mapelList'

const initial = localStorage.getItem(STORAGE_KEY)
const data = ref(initial ? JSON.parse(initial) : [...mapelJson]) // reaktif global

export default function useMapel() {
  const guruList = guruJson.map(guru => guru.nama_guru)

  const showForm = ref(false)
  const mode = ref('')
  const readonly = ref(false)
  const selectedItem = ref(null)
  const errors = ref({})
  const form = ref(getDefaultForm())

  function getDefaultForm() {
    return {
      id_mapel: '',
      nama_mapel: '',
      kode_mapel: '',
      id_guru: '',
    }
  }

  function tambahBaru() {
    mode.value = 'add'
    readonly.value = false
    form.value = getDefaultForm()
    showForm.value = true
  }

  function editItem(item) {
    mode.value = 'edit'
    readonly.value = false
    form.value = { ...item }
    showForm.value = true
  }

  function lihatItem(item) {
    mode.value = 'edit'
    readonly.value = true
    form.value = { ...item }
    showForm.value = true
  }

  function hapusItem(id) {
    data.value = data.value.filter(item => item.id_mapel !== id)
  }

  function simpan() {
    errors.value = {}

    if (!form.value.nama_mapel) errors.value.nama_mapel = 'Nama mapel wajib diisi'
    if (!form.value.kode_mapel) errors.value.kode_mapel = 'Kode mapel wajib diisi'
    if (!form.value.id_guru) errors.value.id_guru = 'Guru wajib dipilih'

    if (Object.keys(errors.value).length > 0) return

    if (mode.value === 'add') {
      form.value.id_mapel = data.value.length + 1
      data.value.push({ ...form.value })
    } else {
      const index = data.value.findIndex(item => item.id_mapel === form.value.id_mapel)
      if (index !== -1) data.value[index] = { ...form.value }
    }

    showForm.value = false
  }

  function batal() {
    showForm.value = false
    form.value = getDefaultForm()
    errors.value = {}
  }

  function pilihItem(item) {
    selectedItem.value = item
  }

  function clearSelected() {
    selectedItem.value = null
  }

  // ✅ Simpan ke localStorage setiap perubahan data
  watch(data, (newValue) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue))
  }, { deep: true })

  // ✅ Fungsi Reset (bisa dipanggil dari reset global)
  function resetData() {
    data.value = [...mapelJson]
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    data,
    showForm,
    mode,
    readonly,
    form,
    errors,
    guruList,
    selectedItem,
    tambahBaru,
    editItem,
    lihatItem,
    hapusItem,
    simpan,
    batal,
    pilihItem,
    clearSelected,
    resetData,
  }
}

// Opsional: ekspor global data agar bisa dipakai di luar
export { data as mapelList }