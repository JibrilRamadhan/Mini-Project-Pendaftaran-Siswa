import { ref, watch } from 'vue'
import Swal from 'sweetalert2'
import mapelJson from '../stores/mapel.json'
import useGuru from './useGuru'

const { data: guruList } = useGuru()
const STORAGE_KEY = 'mapelList'

const initial = localStorage.getItem(STORAGE_KEY)
const data = ref(initial ? JSON.parse(initial) : [...mapelJson])

export default function useMapel() {
  const showForm = ref(false)
  const mode = ref('')
  const readonly = ref(false)
  const selectedItem = ref(null)
  const errors = ref({})
  const form = ref(getDefaultForm())

  function getDefaultForm() {
    return {
      id_mapel: '',
      nama_mapel: '',
      kode_mapel: '',
      id_guru: '',
    }
  }

  function tambahBaru() {
    mode.value = 'add'
    readonly.value = false
    form.value = getDefaultForm()
    showForm.value = true
  }

  function editItem(item) {
    mode.value = 'edit'
    readonly.value = false
    form.value = {
      ...item,
      id_guru: Number(item.id_guru) || '',
    }
    showForm.value = true
  }

  function lihatItem(item) {
    mode.value = 'edit'
    readonly.value = true
    form.value = {
      ...item,
      id_guru: Number(item.id_guru) || '',
    }
    showForm.value = true
  }

  async function hapusItem(id) {
    const result = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: 'Data mapel akan dihapus permanen!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus',
      cancelButtonText: 'Batal',
    })

    if (result.isConfirmed) {
      data.value = data.value.filter((item) => item.id_mapel !== id)

      Swal.fire({
        icon: 'success',
        title: 'Berhasil dihapus',
        text: 'Data mapel telah dihapus.',
        timer: 1500,
        showConfirmButton: false,
      })
    }
  }

  function simpan() {
    errors.value = {}

    form.value.id_guru = Number(form.value.id_guru)

    if (!form.value.nama_mapel) errors.value.nama_mapel = 'Nama mapel wajib diisi'
    if (!form.value.kode_mapel) errors.value.kode_mapel = 'Kode mapel wajib diisi'
    if (!form.value.id_guru) errors.value.id_guru = 'Guru wajib dipilih'

    if (Object.keys(errors.value).length > 0) return

    if (mode.value === 'add') {
      form.value.id_mapel = Date.now()
      data.value.push({ ...form.value })

      Swal.fire({
        icon: 'success',
        title: 'Berhasil ditambahkan',
        text: 'Data mapel baru telah disimpan.',
        timer: 1500,
        showConfirmButton: false,
      })
    } else {
      const index = data.value.findIndex((item) => item.id_mapel === form.value.id_mapel)
      if (index !== -1) {
        data.value[index] = { ...form.value }

        Swal.fire({
          icon: 'success',
          title: 'Berhasil diperbarui',
          text: 'Data mapel telah diupdate.',
          timer: 1500,
          showConfirmButton: false,
        })
      }
    }

    showForm.value = false
  }

  function batal() {
    showForm.value = false
    form.value = getDefaultForm()
    errors.value = {}
  }

  function pilihItem(item) {
    selectedItem.value = item
  }

  function clearSelected() {
    selectedItem.value = null
  }

  watch(
    data,
    (newValue) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue))
    },
    { deep: true },
  )

  function resetData() {
    data.value = [...mapelJson]
    localStorage.removeItem(STORAGE_KEY)
  }

  return {
    data,
    showForm,
    mode,
    readonly,
    form,
    errors,
    guruList,
    selectedItem,
    tambahBaru,
    editItem,
    lihatItem,
    hapusItem,
    simpan,
    batal,
    pilihItem,
    clearSelected,
    resetData,
  }
}

export { data as mapelList }
