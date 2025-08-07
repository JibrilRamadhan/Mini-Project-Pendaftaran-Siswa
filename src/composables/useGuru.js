// composables/useGuru.js
import { ref, watch } from 'vue'
import guruJson from '../stores/guru.json'

const STORAGE_KEY = 'guruList'

// ✅ Konversi id_guru dari localStorage ke Number
const initial = localStorage.getItem(STORAGE_KEY)
const data = ref(
  (initial ? JSON.parse(initial) : [...guruJson]).map((g) => ({
    ...g,
    id_guru: Number(g.id_guru),
  })),
)

export default function useGuru() {
  const showForm = ref(false)
  const mode = ref('tambah')
  const readonly = ref(false)
  const selectedItem = ref(null)
  const errors = ref({})

  const form = ref({
    id_guru: '',
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
      id_guru: '',
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
    data.value = data.value.filter((guru) => Number(guru.id_guru) !== Number(id))
  }

  function simpan() {
    form.value.id_guru = Number(form.value.id_guru)

    if (mode.value === 'tambah') {
      const newId = Date.now()
      form.value.id_guru = newId

      data.value.push({ ...form.value })
    } else if (mode.value === 'edit') {
      const index = data.value.findIndex((i) => Number(i.id_guru) === Number(form.value.id_guru))
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

  // Simpan ke localStorage setiap perubahan data
  watch(
    data,
    (newValue) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newValue))
    },
    { deep: true },
  )

  function resetData() {
    data.value = [...guruJson].map((g) => ({
      ...g,
      id_guru: Number(g.id_guru),
    }))
    localStorage.removeItem(STORAGE_KEY)
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
    resetData,
  }
}

export { data as guruList }
