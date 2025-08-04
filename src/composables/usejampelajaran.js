// composables/useJamPelajaran.js
import { ref } from 'vue'
import dataJson from '@/stores/jam-pelajaran.json'
import mapelJson from '@/stores/mapel.json'
import guruJson from '@/stores/guru.json'
import kelasJson from '@/stores/kelas.json'

export default function useJamPelajaran() {
  const data = ref([...dataJson])
  const mapelList = ref([...mapelJson])
  const guruList = ref([...guruJson])
  const kelasList = ref([...kelasJson])

  const showForm = ref(false)
  const mode = ref('add')
  const readonly = ref(false)
  const selectedItem = ref(null)

  const form = ref({
    hari: '',
    jam_mulai: '',
    jam_selesai: '',
    id_mapel: '',
    id_guru: '',
    id_kelas: '',
  })

  const errors = ref({})

  const hariList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']

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
    mapelList,
    guruList,
    kelasList,
    showForm,
    mode,
    readonly,
    form,
    errors,
    hariList,
    selectedItem,
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
