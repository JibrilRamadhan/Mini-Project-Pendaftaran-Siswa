import { ref, computed, watch, nextTick } from 'vue'
import kelasJson from '../stores/kelas.json'
import siswaJson from '../stores/siswa.json'

const KELAS_KEY = 'kelasList'
const SISWA_KEY = 'siswaList'

const kelasStorage = localStorage.getItem(KELAS_KEY)
const siswaStorage = localStorage.getItem(SISWA_KEY)

const data = ref(kelasStorage ? JSON.parse(kelasStorage) : [...kelasJson])
const siswaDataRef = ref(siswaStorage ? JSON.parse(siswaStorage) : [...siswaJson])

const showForm = ref(false)
const mode = ref('')
const readonly = ref(false)
const selectedItem = ref(null)

const form = ref({
  id: null,
  nama_kelas: '',
  kode_kelas: '',
  kapasitas: 0,
  id_guru: null,
})

const errors = ref({})

const siswaDiKelas = computed(() => {
  if (!selectedItem.value) return []
  return siswaDataRef.value.filter((siswa) =>
    siswa.kelas_id === selectedItem.value.id
  )
})

function resetForm() {
  form.value = {
    id: null,
    nama_kelas: '',
    kode_kelas: '',
    kapasitas: 0,
    id_guru: null,
  }
  errors.value = {}
}

function tambahBaru() {
  resetForm()
  mode.value = 'tambah'
  readonly.value = false
  showForm.value = true
}

function editItem(item) {
  if (!item) return
  form.value = {
    id: item.id,
    nama_kelas: item.nama_kelas || '',
    kode_kelas: item.kode_kelas || '',
    kapasitas: Number(item.kapasitas || 0),
    id_guru: Number(item.id_guru ?? null),
  }
  mode.value = 'edit'
  readonly.value = false
  showForm.value = true
  selectedItem.value = { ...item }
}

function lihatItem(item) {
  if (!item) return
  selectedItem.value = item
  nextTick(() => {
    form.value = {
      id: item.id,
      nama_kelas: item.nama_kelas || '',
      kode_kelas: item.kode_kelas || '',
      kapasitas: Number(item.kapasitas || 0),
      id_guru: Number(item.id_guru ?? null),
    }
    mode.value = 'lihat'
    readonly.value = true
    showForm.value = true
  })
}

function simpan() {
  errors.value = {}

  // Validasi
  const { nama_kelas, kode_kelas, kapasitas, id_guru } = form.value

  if (!nama_kelas) errors.value.nama_kelas = 'Nama kelas wajib diisi'
  if (!kode_kelas) errors.value.kode_kelas = 'Kode kelas wajib diisi'
  if (!kapasitas || kapasitas <= 0) errors.value.kapasitas = 'Kapasitas wajib diisi'
  if (id_guru === null || id_guru === undefined || id_guru === '') errors.value.id_guru = 'Wali kelas wajib dipilih'

  if (Object.keys(errors.value).length > 0) return

  const newData = {
    ...form.value,
    id: mode.value === 'tambah' ? Date.now() : form.value.id,
    kapasitas: Number(kapasitas),
    id_guru: Number(id_guru),
  }

  if (mode.value === 'tambah') {
    data.value.push(newData)
  } else {
    const index = data.value.findIndex((item) => Number(item.id) === Number(form.value.id))
    if (index !== -1) data.value[index] = newData
  }

  showForm.value = false
  resetForm()
}

function hapusItem(id) {
  if (!confirm('Yakin ingin menghapus kelas ini?')) return
  data.value = data.value.filter((item) => item.id !== id)
  siswaDataRef.value = siswaDataRef.value.map((siswa) => {
    if (siswa.kelas_id === id) {
      return { ...siswa, kelas_id: null }
    }
    return siswa
  })
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

function tambahSiswa({ id, kelas_id }) {
  const siswa = siswaDataRef.value.find((s) => s.id === id)
  const kelas = data.value.find((k) => k.id === kelas_id)

  if (!kelas) return { success: false, message: 'Kelas tidak ditemukan' }
  if (!siswa) return { success: false, message: 'Siswa tidak ditemukan' }
  if (siswa.kelas_id) return { success: false, message: 'Siswa sudah terdaftar di kelas lain' }

  const siswaKelas = siswaDataRef.value.filter((s) => s.kelas_id === kelas_id)
  if (siswaKelas.length >= kelas.kapasitas) return { success: false, message: 'Kapasitas kelas sudah penuh' }

  siswa.kelas_id = kelas_id
  return { success: true }
}

watch(data, (val) => {
  localStorage.setItem(KELAS_KEY, JSON.stringify(val))
}, { deep: true })

watch(siswaDataRef, (val) => {
  localStorage.setItem(SISWA_KEY, JSON.stringify(val))
}, { deep: true })

function resetData() {
  data.value = [...kelasJson]
  siswaDataRef.value = [...siswaJson]
  localStorage.removeItem(KELAS_KEY)
  localStorage.removeItem(SISWA_KEY)
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
    clearSelected,
    tambahSiswa,
    resetData,
  }
}

export { siswaDataRef as siswaList }