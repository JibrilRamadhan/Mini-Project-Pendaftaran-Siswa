import { ref } from 'vue'
import  siswaData  from '@/stores/siswa.json'

export function useSiswa() {
  const showForm = ref(false)
  const editIndex = ref(null)
  const lastId = ref(siswaData.length)

  const form = ref({
    id: '',
    nisn: '',
    nama: '',
    alamat: '',
    tgl_lahir: '',
    jk: '',
    no_tlp: '',
    nama_wali: '',
  })

  const siswaList = ref([...siswaData])

  function bukaForm() {
    editIndex.value = null
    resetForm()
    showForm.value = true
  }

  function tambahSiswa() {
    if (editIndex.value === null) {
      lastId.value += 1
      form.value.id = lastId.value
      siswaList.value.push({ ...form.value })
    } else {
      siswaList.value[editIndex.value] = { ...form.value }
    }
    resetForm()
  }

  function editSiswa(index) {
    form.value = { ...siswaList.value[index] }
    editIndex.value = index
    showForm.value = true
  }

  function hapusSiswa(index) {
    if (confirm('Yakin ingin menghapus data ini?')) {
      siswaList.value.splice(index, 1)
    }
  }

  function resetForm() {
    showForm.value = false
    editIndex.value = null
    form.value = {
      id: '',
      nisn: '',
      nama: '',
      alamat: '',
      tgl_lahir: '',
      jk: '',
      no_tlp: '',
      nama_wali: '',
    }
  }

  return {
    showForm,
    form,
    siswaList,
    editIndex,
    bukaForm,
    tambahSiswa,
    editSiswa,
    hapusSiswa,
    resetForm,
  }
}
