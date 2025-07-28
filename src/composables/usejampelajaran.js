// composables/useJamPelajaran.js
import { ref } from 'vue'
import dataJson from '@/assets/jam-pelajaran.json'

export default function useJamPelajaran() {
  const data = ref([...dataJson])
  const showForm = ref(false)
  const mode = ref('add')
  const form = ref({
    hari: '',
    jam_mulai: '',
    jam_selesai: '',
    id_mapel: '',
    id_guru: '',
    id_kelas: '',
  })
  const errors = ref({})
  const readonly = ref(false)

  function lihatItem(item) {
  mode.value = 'edit'
  form.value = { ...item }
  errors.value = {}
  readonly.value = true
  showForm.value = true
}

  const selectedItem = ref(null)

  const hariList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']
  const mapelList = [
    'Matematika',
    'Bahasa Indonesia',
    'Bahasa Inggris',
    'Pendidikan Pancasila',
    'Pemrograman Web Dasar',
  ]
  const guruList = ['Pak Abdul', 'Pak Rizal', 'Bu Sari', 'Bu Lina', 'Pak Budi']
  const kelasList = [
    'Kelas X RPL 1',
    'Kelas X RPL 2',
    'Kelas X RPL 3',
    'Kelas XI RPL 1',
    'Kelas XI RPL 2',
    'Kelas XI RPL 3',
    'Kelas XII RPL 1',
    'Kelas XII RPL 2',
    'Kelas XII RPL 3',
  ]

  function tambahBaru() {
    mode.value = 'add'
    form.value = {
      hari: '',
      jam_mulai: '',
      jam_selesai: '',
      id_mapel: '',
      id_guru: '',
      id_kelas: '',
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
      data.value = data.value.filter((item) => item.id_jam !== id)
    }
  }

  function simpan() {
    errors.value = {}

    if (!form.value.hari) errors.value.hari = 'Wajib diisi'
    if (!form.value.jam_mulai) errors.value.jam_mulai = 'Wajib diisi'
    if (!form.value.jam_selesai) errors.value.jam_selesai = 'Wajib diisi'
    if (!form.value.id_mapel) errors.value.id_mapel = 'Wajib diisi'
    if (!form.value.id_guru) errors.value.id_guru = 'Wajib diisi'
    if (!form.value.id_kelas) errors.value.id_kelas = 'Wajib diisi'

    if (Object.keys(errors.value).length > 0) return

    if (mode.value === 'add') {
      let idBaru = 1
      if (data.value.length > 0) {
        const idTerakhir = data.value[data.value.length - 1].id_jam
        idBaru = idTerakhir + 1
      }
      const dataBaru = { ...form.value, id_jam: idBaru }
      data.value.push(dataBaru)
    } else {
      const index = data.value.findIndex((item) => item.id_jam === form.value.id_jam)
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
    hariList,
    mapelList,
    guruList,
    kelasList,
    selectedItem,
    lihatItem,  
    tambahBaru,
    editItem,
    lihatItem,
    hapusItem,
    simpan,
    batal,
    pilihItem,
    clearSelected,
  }
}
