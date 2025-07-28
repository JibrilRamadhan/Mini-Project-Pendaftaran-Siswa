// composables/useSiswa.js
import { ref } from 'vue'
import siswaJson from '@/assets/siswa.json'

export default function useSiswa() {
  const data = ref([...siswaJson])
  const showForm = ref(false)
  const mode = ref('add')
  const form = ref({
    nisn: '',
    nama: '',
    alamat: '',
    tgl_lahir: '',
    jk: '',
    no_tlp: '',
    nama_wali: '',
  })
  const errors = ref({})
  const readonly = ref(false)
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

    if (!form.value.nisn) errors.value.nisn = 'NISN wajib diisi'
    if (!form.value.nama) errors.value.nama = 'Nama wajib diisi'
    if (!form.value.alamat) errors.value.alamat = 'Alamat wajib diisi'
    if (!form.value.tgl_lahir) errors.value.tgl_lahir = 'Tanggal lahir wajib diisi'
    if (!form.value.jk) errors.value.jk = 'Jenis kelamin wajib diisi'
    if (!form.value.no_tlp) errors.value.no_tlp = 'Nomor telepon wajib diisi'
    if (!form.value.nama_wali) errors.value.nama_wali = 'Nama wali wajib diisi'

    if (Object.keys(errors.value).length > 0) return

    if (mode.value === 'add') {
      let idBaru = 1
      if (data.value.length > 0) {
        const idTerakhir = data.value[data.value.length - 1].id
        idBaru = idTerakhir + 1
      }
      const dataBaru = { ...form.value, id: idBaru }
      data.value.push(dataBaru)
    } else {
      const index = data.value.findIndex((item) => item.id === form.value.id)
      if (index !== -1) {
        data.value[index] = { ...form.value }
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
