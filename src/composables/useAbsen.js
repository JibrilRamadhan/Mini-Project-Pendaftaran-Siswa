// composables/useAbsen.js
import { ref, computed } from 'vue'
import absenData from '../stores/absen.json'
import kelasData from '../stores/kelas.json'
import siswaData from '../stores/siswa.json'
import guruData from '../stores/guru.json'

const absens = ref([...absenData])
const selectedKelasId = ref(null)
const selectedTanggal = ref('')
const showForm = ref(false)
const selectedItem = ref(null)

const filteredAbsensi = computed(() => {
  return absens.value.filter(item => {
    return (
      (!selectedTanggal.value || item.tanggal === selectedTanggal.value) &&
      (!selectedKelasId.value || item.kelas_id === selectedKelasId.value)
    )
  })
})

function bukaForm(item = null) {
  selectedItem.value = item
    ? { ...item }
    : {
        id: null,
        tanggal: selectedTanggal.value,
        kelas_id: selectedKelasId.value,
        wali_kelas_id: null,
        siswa_id: null,
        status: 'Hadir',
      }
  showForm.value = true
}

function tutupForm() {
  selectedItem.value = null
  showForm.value = false
}

function simpan(data) {
  if (!data.tanggal || !data.id_siswa || !data.id_kelas || !data.status) {
    alert('Lengkapi semua data sebelum menyimpan!')
    return
  }

  if (!data.id) {
    data.id = Date.now()
    absens.value.push(data)
  } else {
    const index = absens.value.findIndex(a => a.id === data.id)
    if (index !== -1) {
      absens.value[index] = data
    } else {
      absens.value.push(data)
    }
  }

  tutupForm()
}


function hapus(id) {
  const index = absens.value.findIndex(a => a.id === id)
  if (index !== -1) absens.value.splice(index, 1)
}

function getNamaKelas(id) {
  return kelasData.find(k => k.id === id)?.nama_kelas || 'Tidak diketahui'
}

function getNamaGuru(id) {
  return guruData.find(g => g.id_guru === id)?.nama_guru || 'Tidak diketahui'
}

function getNamaSiswa(id) {
  return siswaData.find(s => s.id === id)?.nama || 'Tidak diketahui'
}

export default function useAbsen() {
  return {
    absens,
    selectedKelasId,
    selectedTanggal,
    showForm,
    selectedItem,
    filteredAbsensi,
    bukaForm,
    tutupForm,
    simpan,
    hapus,
    getNamaKelas,
    getNamaGuru,
    getNamaSiswa,
  }
}
