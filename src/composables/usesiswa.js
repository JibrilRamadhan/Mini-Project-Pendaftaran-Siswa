// useSiswa.js (Final dengan jurusan dan penempatan otomatis)
import { ref,computed } from 'vue'
import siswaJson from '@/stores/siswa.json'
import kelasJson from '@/stores/kelas.json'

export default function useSiswa() {
  
  const data = ref([...siswaJson])
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
    kelas_id: ''
  })
  const errors = ref({})
  const selectedItem = ref(null)

   // Pagination
   const currentPage = ref(1)
   const itemsPerPage = ref(10) // Bisa diubah sesuai kebutuhan
 
   const totalPages = computed(() => Math.ceil(data.value.length / itemsPerPage.value))
 
   const paginatedData = computed(() => {
     const start = (currentPage.value - 1) * itemsPerPage.value
     return data.value.slice(start, start + itemsPerPage.value)
   })
 
   // Pagination functions
   function goToPage(page) {
     if (page >= 1 && page <= totalPages.value) {
       currentPage.value = page
       selectedItem.value = null // Clear selection when changing page
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
     currentPage.value = 1 // Reset to first page
     selectedItem.value = null
   }
 
   // Computed untuk info pagination
   const paginationInfo = computed(() => {
     const start = (currentPage.value - 1) * itemsPerPage.value + 1
     const end = Math.min(currentPage.value * itemsPerPage.value, data.value.length)
     return {
       start,
       end,
       total: data.value.length
     }
   })
 
   // Generate page numbers untuk pagination
   const pageNumbers = computed(() => {
     const pages = []
     const total = totalPages.value
     const current = currentPage.value
 
     if (total <= 7) {
       // Jika total halaman <= 7, tampilkan semua
       for (let i = 1; i <= total; i++) {
         pages.push(i)
       }
     } else {
       // Jika total halaman > 7, tampilkan dengan ellipsis
       if (current <= 4) {
         // Di awal
         for (let i = 1; i <= 5; i++) pages.push(i)
         pages.push('...')
         pages.push(total)
       } else if (current >= total - 3) {
         // Di akhir
         pages.push(1)
         pages.push('...')
         for (let i = total - 4; i <= total; i++) pages.push(i)
       } else {
         // Di tengah
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
      kelas_id: ''
    }
    errors.value = {}
    readonly.value = false
    showForm.value = true
  newSiswaNama.value = ''
  errorTambah.value = ''
  showAddForm.value = false
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
      data.value = data.value.filter(item => item.id !== id)
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
      const index = data.value.findIndex(item => item.id === f.id)
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
    const kelas = kelasData.find(k => k.id === kelas_id)
    return kelas ? kelas.nama_kelas : 'Tidak Diketahui'
  }

  return {
    kelas,
    data,
    showForm,
    mode,
    readonly,
    form,
    errors,
    selectedItem,
    
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
    
    // Functions
    lihatItem,
    tambahBaru,
    editItem,
    hapusItem,
    simpan,
    batal,
    pilihItem,
    clearSelected,
    getNamaKelas,
  }
}
