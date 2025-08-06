import { ref, computed, watch, nextTick } from 'vue'
import kelasData from '../stores/kelas.json'
import siswaData from '../stores/siswa.json'

const data = ref([...kelasData])
const siswaDataRef = ref([...siswaData])

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
  console.log('selectedItem for siswaDiKelas:', selectedItem.value)
  console.log('all siswa:', siswaDataRef.value)
  if (!selectedItem.value) return []
 return siswaDataRef.value.filter((siswa) => siswa?.kelas_id === selectedItem.value.id_kelas || siswa?.kelas_id === selectedItem.value.id)
})

// === ACTION ===
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
  form.value = { ...item }
  mode.value = 'edit'
  readonly.value = false
  showForm.value = true
  selectedItem.value = item
}

function lihatItem(item) {
  console.log('✅ lihatItem dipanggil dengan item:', item)
  selectedItem.value = item
  nextTick(() => {
    form.value = { ...item }
    mode.value = 'lihat'
    readonly.value = true
    showForm.value = true
  })
}

function simpan() {
  errors.value = {}

  if (!form.value.nama_kelas) errors.value.nama_kelas = 'Nama kelas wajib diisi'
  if (!form.value.kode_kelas) errors.value.kode_kelas = 'Kode kelas wajib diisi'
  if (!form.value.kapasitas || form.value.kapasitas <= 0)
    errors.value.kapasitas = 'Kapasitas wajib diisi'
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
  if (!confirm('Yakin ingin menghapus kelas ini?')) return

  data.value = data.value.filter((item) => item.id !== id)
  siswaDataRef.value = siswaDataRef.value.map((siswa) => {
    if (siswa.kelas_id === id) {
      return { ...siswa, kelas_id: null } // lepas siswa dari kelas
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

/**
 * Tambah siswa ke kelas berdasarkan ID siswa (bukan hanya nama).
 * Digunakan ketika siswa dipilih dari daftar siswa yang belum punya kelas.
 */
function tambahSiswa({ id, kelas_id }) {
  const siswa = siswaDataRef.value.find((s) => s.id === id)
  const kelas = data.value.find((k) => k.id === kelas_id)

  if (!kelas) {
    return { success: false, message: 'Kelas tidak ditemukan' }
  }
  if (!siswa) {
    return { success: false, message: 'Siswa tidak ditemukan' }
  }
  if (siswa.kelas_id) {
    return { success: false, message: 'Siswa sudah terdaftar di kelas lain' }
  }

  const siswaKelas = siswaDataRef.value.filter((s) => s.kelas_id === kelas_id)
  if (siswaKelas.length >= kelas.kapasitas) {
    return { success: false, message: 'Kapasitas kelas sudah penuh' }
  }

  siswa.kelas_id = kelas_id
  return { success: true }
}

watch(selectedItem, () => {
  console.log('🔍 selectedItem:', selectedItem.value)
  console.log('📚 siswaDiKelas:', siswaDiKelas.value)
})

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
  }
}
