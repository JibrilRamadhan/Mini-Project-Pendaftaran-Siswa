import { ref, reactive } from 'vue'
import mapelJson from '../stores/mapel.json'
import guruJson from '../stores/guru.json'

export default function useMapel() {
  const data = ref([...mapelJson])
  const guruList = guruJson.map(guru => guru.nama_guru)

  const showForm = ref(false)
  const mode = ref('')
  const readonly = ref(false)
  const selectedItem = ref(null)
  const errors = ref({})

  // ✅ Gunakan reactive agar v-model bisa sinkron
  const form = reactive(getDefaultForm())

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
    Object.assign(form, getDefaultForm()) // reset form
    showForm.value = true
  }

  function editItem(item) {
    mode.value = 'edit'
    readonly.value = false
    Object.assign(form, item) // isi form dengan data yang dipilih
    showForm.value = true
  }

  function lihatItem(item) {
    mode.value = 'edit'
    readonly.value = true
    Object.assign(form, item)
    showForm.value = true
  }

  function hapusItem(id) {
    data.value = data.value.filter(item => item.id_mapel !== id)
  }

  function simpan() {
    errors.value = {}

    // Validasi manual
    if (!form.nama_mapel?.trim()) errors.value.nama_mapel = 'Nama mapel wajib diisi'
    if (!form.kode_mapel?.trim()) errors.value.kode_mapel = 'Kode mapel wajib diisi'
    if (!form.id_guru) errors.value.id_guru = 'Guru wajib dipilih'

    // Jika ada error, hentikan simpan
    if (Object.keys(errors.value).length > 0) return

    if (mode.value === 'add') {
      form.id_mapel = data.value.length + 1
      data.value.push({ ...form })
    } else {
      const index = data.value.findIndex(item => item.id_mapel === form.id_mapel)
      if (index !== -1) {
        data.value[index] = { ...form }
      }
    }

    showForm.value = false
  }

  function batal() {
    showForm.value = false
    Object.assign(form, getDefaultForm()) // reset semua field
    errors.value = {}
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
  }
}
