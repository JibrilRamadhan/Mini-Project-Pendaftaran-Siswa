import { ref, computed } from 'vue'
import Kelas from '@/stores/Kelas.json'

export function useKelas(form, editIndex, closeForm) {
const kelasList = ref([...Kelas])

function saveKelas() {
const index = editIndex.value !== null
? kelasList.value.findIndex(k => k.kode_kelas === form.value.kode_kelas): -1


if (index !== -1) {
  kelasList.value[index] = { ...form.value }
} else {
  kelasList.value.push({ ...form.value })
}
closeForm()
}

function deleteKelas(index) {
if (confirm('Hapus kelas ini?')) {
kelasList.value.splice(index, 1)
}
}

const totalKelas = computed(() => kelasList.value.length)

const totalKapasitas = computed(() =>
kelasList.value.reduce((total, k) => total + parseInt(k.kapasitas || 0), 0)
)

return {
kelasList,
saveKelas,
deleteKelas,
totalKelas,
totalKapasitas
}
}