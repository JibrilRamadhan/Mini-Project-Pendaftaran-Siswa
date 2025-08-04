// useSiswa.js (Final dengan jurusan dan penempatan otomatis)
import { ref } from 'vue'
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
    jurusan: '',
    kelas_id: null,
  })
  const errors = ref({})
  const selectedItem = ref(null)

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
      jurusan: '',
      kelas_id: null,
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
    if (!f.jurusan) errors.value.jurusan = 'Jurusan wajib dipilih'

    if (Object.keys(errors.value).length > 0) return

    // Otomatis cari kelas_id berdasarkan jurusan & kapasitas
    const kelasDipilih = kelas.value.find(k => {
      const jumlahSiswa = data.value.filter(s => s.kelas_id === k.id).length
      return k.kode_kelas.includes(f.jurusan.toUpperCase()) && jumlahSiswa < k.kapasitas
    })

    f.kelas_id = kelasDipilih ? kelasDipilih.id : null

    if (mode.value === 'add') {
      let idBaru = 1
      if (data.value.length > 0) {
        idBaru = data.value[data.value.length - 1].id + 1
      }
      const dataBaru = { ...f, id: idBaru }
      data.value.push(dataBaru)
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

  return {
    data,
    showForm,
    mode,
    readonly,
    form,
    errors,
    selectedItem,
    lihatItem,
    tambahBaru,
    editItem,
    hapusItem,
    simpan,
    batal,
    pilihItem,
    clearSelected,
  }
}
