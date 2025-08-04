// composables/useKelas.js
import { ref, computed } from 'vue'
import kelasData from '../stores/kelas.json'
import useSiswa from '../composables/usesiswa'

const data = ref([...kelasData])
const { data: siswaData } = useSiswa()
const showForm = ref(false)
const mode = ref('') // 'tambah' | 'edit'
const readonly = ref(false)
const selectedItem = ref(null)
const form = ref({
  id: null,
  nama_kelas: '',
  kode_kelas: '',
  kapasitas: 0,
  id_guru: null
})
const errors = ref({})

const siswaDiKelas = computed(() => {
  if (!selectedItem.value) return []
  return siswaData.value.filter(siswa => siswa.kelas_id === selectedItem.value.id)
})

function resetForm() {
  form.value = {
    id: null,
    nama_kelas: '',
    kode_kelas: '',
    kapasitas: 0,
    id_guru: null
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
  selectedItem.value = item
  readonly.value = true
  showForm.value = true
}

function simpan() {
  errors.value = {}

  if (!form.value.nama_kelas) errors.value.nama_kelas = 'Nama kelas wajib diisi'
  if (!form.value.kode_kelas) errors.value.kode_kelas = 'Kode kelas wajib diisi'
  if (!form.value.kapasitas || form.value.kapasitas <= 0) errors.value.kapasitas = 'Kapasitas wajib diisi'
  if (!form.value.id_guru) errors.value.id_guru = 'Wali kelas wajib diisi'

  if (Object.keys(errors.value).length > 0) return

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
  const konfirmasi = confirm('Yakin ingin menghapus kelas ini?')
  if (konfirmasi) {
    data.value = data.value.filter((item) => item.id !== id)
  }
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
    siswaDiKelas,
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
