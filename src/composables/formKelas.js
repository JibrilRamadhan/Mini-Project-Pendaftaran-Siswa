import { ref } from 'vue'
import Guru from '@/stores/Guru.json'

export function useFormKelas() {
const form = ref({
kode_kelas: '',
nama_kelas: '',
kapasitas: null,
id_wali_kelas: null, 
})

const guruList = ref([...Guru])
const editIndex = ref(null)
const showModal = ref(false)

function openForm(kelas = null, list = []) {
if (kelas) {
editIndex.value = list.findIndex(k => k.kode_kelas === kelas.kode_kelas)
form.value = { ...kelas }
} else {
editIndex.value = {
kode_kelas: '',
nama_kelas: '',
kapasitas: null,
id_wali_kelas: null
}
}
showModal.value = true
}

function closeForm() {
showModal.value = false
}

return {
form,
editIndex,
showModal,
guruList,
openForm,
closeForm
}
}