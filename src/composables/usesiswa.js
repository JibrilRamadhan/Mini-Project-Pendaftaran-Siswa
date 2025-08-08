// composables/useSiswa.js
import { ref, computed, watch } from 'vue'
import siswaJson from '@/stores/siswa.json'
import kelasJson from '@/stores/kelas.json'

const STORAGE_KEY = 'siswaList'

const stored = localStorage.getItem(STORAGE_KEY)
const data = ref(stored ? JSON.parse(stored) : [...siswaJson]) // ✅ Load dari localStorage atau fallback JSON

export default function useSiswa() {
  const kelas = ref([...kelasJson])
  const showForm = ref(false)
  const mode = ref('add')
  const readonly = ref(false)
  const form = ref({
    nisn: '',
    nama: '',
    alamat: '',
    tgl_lahir: '',
    jk: '',
    no_tlp: '',
    nama_wali: '',
    kelas_id: '',
  })
  const errors = ref({})
  const selectedItem = ref(null)

  // Pagination
  const currentPage = ref(1)
  const itemsPerPage = ref(10)

  const totalPages = computed(() => Math.ceil(data.value.length / itemsPerPage.value))

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    return data.value.slice(start, start + itemsPerPage.value)
  })

  function goToPage(page) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
      selectedItem.value = null
    }
  }

  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
      selectedItem.value = null
    }
  }

  function prevPage() {
    if (currentPage.value > 1) {
      currentPage.value--
      selectedItem.value = null
    }
  }

  function changeItemsPerPage(newItemsPerPage) {
    itemsPerPage.value = newItemsPerPage
    currentPage.value = 1
    selectedItem.value = null
  }

  const paginationInfo = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value + 1
    const end = Math.min(currentPage.value * itemsPerPage.value, data.value.length)
    return {
      start,
      end,
      total: data.value.length,
    }
  })

  const pageNumbers = computed(() => {
    const pages = []
    const total = totalPages.value
    const current = currentPage.value

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i)
      }
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i)
        pages.push('...')
        pages.push(total)
      } else if (current >= total - 3) {
        pages.push(1)
        pages.push('...')
        for (let i = total - 4; i <= total; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        for (let i = current - 1; i <= current + 1; i++) pages.push(i)
        pages.push('...')
        pages.push(total)
      }
    }
    return pages
  })

  function tambahBaru() {
    mode.value = 'add'
    form.value = {
      nisn: '',
      nama: '',
      alamat: '',
      tgl_lahir: '',
      jk: '',
      no_tlp: '',
      nama_wali: '',
      kelas_id: '',
    }
    errors.value = {}
    readonly.value = false
    showForm.value = true
  }

  function editItem(item) {
    mode.value = 'edit'
    form.value = { ...item }
    errors.value = {}
    readonly.value = false
    showForm.value = true
  }

  function lihatItem(item) {
    mode.value = 'edit'
    form.value = { ...item }
    errors.value = {}
    readonly.value = true
    showForm.value = true
  }

  function hapusItem(id) {
    const konfirmasi = confirm('Yakin ingin menghapus data ini?')
    if (konfirmasi) {
      data.value = data.value.filter((item) => item.id !== id)
    }
  }

  function simpan() {
    errors.value = {}
    const f = form.value

    if (!f.nisn) errors.value.nisn = 'NISN wajib diisi'
    if (!f.nama) errors.value.nama = 'Nama wajib diisi'
    if (!f.alamat) errors.value.alamat = 'Alamat wajib diisi'
    if (!f.tgl_lahir) errors.value.tgl_lahir = 'Tanggal lahir wajib diisi'
    if (!f.jk) errors.value.jk = 'Jenis kelamin wajib diisi'
    if (!f.no_tlp) errors.value.no_tlp = 'Nomor telepon wajib diisi'
    if (!f.nama_wali) errors.value.nama_wali = 'Nama wali wajib diisi'
    if (!f.kelas_id) errors.value.kelas_id = 'Kelas wajib dipilih'

    if (Object.keys(errors.value).length > 0) return

    if (mode.value === 'add') {
      let idBaru = 1
      if (data.value.length > 0) {
        idBaru = data.value[data.value.length - 1].id + 1
      }
      const dataBaru = { ...f, id: idBaru }
      data.value.push(dataBaru)

      const newTotalPages = Math.ceil(data.value.length / itemsPerPage.value)
      currentPage.value = newTotalPages
    } else {
      const index = data.value.findIndex((item) => item.id === f.id)
      if (index !== -1) {
        data.value[index] = { ...f }
      }
    }

    showForm.value = false
    selectedItem.value = null
  }

  function batal() {
    showForm.value = false
  }

  function pilihItem(item) {
    selectedItem.value = item
  }

  function clearSelected() {
    selectedItem.value = null
  }

  function getNamaKelas(kelas_id) {
    const kelasItem = kelas.value.find((k) => k.id === kelas_id)
    return kelasItem ? kelasItem.nama_kelas : 'Tidak Diketahui'
  }

  // ✅ Simpan ke localStorage saat data berubah
  watch(data, (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  }, { deep: true })

  // ✅ Reset ke data awal dari JSON
  function resetData() {
    data.value = [...siswaJson]
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    // Data
    data,
    kelas,
    form,
    errors,
    selectedItem,
    readonly,
    showForm,
    mode,

    // Pagination
    paginatedData,
    currentPage,
    totalPages,
    itemsPerPage,
    paginationInfo,
    pageNumbers,
    goToPage,
    nextPage,
    prevPage,
    changeItemsPerPage,

    // Logic
    lihatItem,
    tambahBaru,
    editItem,
    hapusItem,
    simpan,
    batal,
    pilihItem,
    clearSelected,
    getNamaKelas,
    resetData,
  }
}

// (Opsional) Ekspor data untuk digunakan di luar
export { data as siswaList }
