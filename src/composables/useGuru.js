import { ref } from 'vue'
import guruJson from '../assets/guru.json'

export default function useGuru() {
  const data = ref([...guruJson])
  const showForm = ref(false)
  const mode = ref('tambah')
  const readonly = ref(false)
  const selectedItem = ref(null)
  const errors = ref({})

  const form = ref({
    nama_guru: '',
    nip: '',
    jenis_kelamin: '',
    tgl_lahir: '',
    alamat: '',
    no_telp: '',
    email: '',
  })

  function tambahBaru() {
    mode.value = 'tambah'
    readonly.value = false
    showForm.value = true
    Object.assign(form.value, {
      nama_guru: '',
      nip: '',
      jenis_kelamin: '',
      tgl_lahir: '',
      alamat: '',
      no_telp: '',
      email: '',
    })
  }

  function editItem(item) {
    mode.value = 'edit'
    readonly.value = false
    showForm.value = true
    Object.assign(form.value, { ...item })
  }

  function lihatItem(item) {
    mode.value = 'edit'
    readonly.value = true
    showForm.value = true
    Object.assign(form.value, { ...item })
  }

  function hapusItem(id) {
    data.value = data.value.filter((guru) => guru.id_guru !== id)
  }

  function simpan() {
    if (mode.value === 'tambah') {
      data.value.push({
        id_guru: Date.now(),
        ...form.value,
      })
    } else if (mode.value === 'edit') {
      const index = data.value.findIndex((i) => i.id_guru === form.value.id_guru)
      if (index !== -1) data.value[index] = { ...form.value }
    }
    showForm.value = false
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
