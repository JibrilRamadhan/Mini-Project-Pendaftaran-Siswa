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
    kelas_id: ''
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
