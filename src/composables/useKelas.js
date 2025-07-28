// composables/useKelas.js
import { ref } from 'vue'
import kelasData from '../assets/kelas.json'

const data = ref([...kelasData])
const showForm = ref(false)
const mode = ref('') // 'tambah' | 'edit'
const readonly = ref(false)
const selectedItem = ref(null)
const form = ref({
  id: null,
  nama_kelas: '',
  kode_kelas: '',
  kapasitas: 0
})
const errors = ref({})

function resetForm() {
  form.value = {
    id: null,
    nama_kelas: '',
    kode_kelas: '',
    kapasitas: 0
  }
  errors.value = {}
}

function tambahBaru() {
  resetForm()
  mode.value = 'tambah'
  showForm.value = true
  readonly.value = false
}

function editItem(item) {
  form.value = { ...item }
  mode.value = 'edit'
  readonly.value = false
  showForm.value = true
}

function lihatItem(item) {
  form.value = { ...item }
  mode.value = 'edit'
  readonly.value = true
  showForm.value = true
}

function simpan() {
  if (!form.value.nama_kelas || !form.value.kode_kelas) {
    errors.value.nama_kelas = !form.value.nama_kelas ? 'Nama kelas wajib diisi' : ''
    errors.value.kode_kelas = !form.value.kode_kelas ? 'Kode wajib diisi' : ''
    return
  }

  if (mode.value === 'tambah') {
    form.value.id = Date.now()
    data.value.push({ ...form.value })
  } else {
    const index = data.value.findIndex((item) => item.id === form.value.id)
    if (index !== -1) data.value[index] = { ...form.value }
  }
  showForm.value = false
  resetForm()
}

function hapusItem(id) {
  data.value = data.value.filter((item) => item.id !== id)
}

function batal() {
  showForm.value = false
  resetForm()
}

function pilihItem(item) {
  selectedItem.value = item
}

function clearSelected() {
  selectedItem.value = null
}

export default function useKelas() {
  return {
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
    clearSelected
  }
}
