// composables/useAbsen.js
import { ref, computed, watch } from 'vue'
import absenJson from '../stores/absen.json'
import kelasJson from '../stores/kelas.json'
import siswaJson from '../stores/siswa.json'
import guruJson from '../stores/guru.json'

const ABSEN_KEY = 'absenList'
const SISWA_KEY = 'siswaList'
const KELAS_KEY = 'kelasList'

// Load dari localStorage atau fallback JSON
const storedAbsensi = localStorage.getItem(ABSEN_KEY)
const storedSiswa = localStorage.getItem(SISWA_KEY)
const storedKelas = localStorage.getItem(KELAS_KEY)

const absens = ref(storedAbsensi ? JSON.parse(storedAbsensi) : [...absenJson])
const siswaDataRef = ref(storedSiswa ? JSON.parse(storedSiswa) : [...siswaJson])
const kelasList = ref(storedKelas ? JSON.parse(storedKelas) : [...kelasJson])

const selectedKelasId = ref(1)
const selectedTanggal = ref('2025-07-01')
const showForm = ref(false)
const selectedItem = ref(null)

const siswaByKelas = computed(() => {
  if (!selectedKelasId.value) return []
  return siswaDataRef.value.filter((siswa) => siswa.kelas_id === Number(selectedKelasId.value))
})

const filteredAbsensi = computed(() => {
  if (!selectedTanggal.value || !selectedKelasId.value) return []
  return absens.value.filter(
    (item) =>
      item.tanggal === selectedTanggal.value &&
      item.id_kelas === Number(selectedKelasId.value)
  )
})

const tableData = computed(() => {
  if (!selectedTanggal.value || !selectedKelasId.value) return []

  return filteredAbsensi.value.map(absen => {
    const siswa = siswaDataRef.value.find(s => s.id === absen.id_siswa)
    return {
      id_siswa: siswa?.id || null,
      nama_siswa: siswa?.nama || '',
      nisn: siswa?.nisn || '',
      id_kelas: absen.id_kelas,
      tanggal: absen.tanggal,
      status: absen.status,
      absen_id: absen.id,
      has_absen: true
    }
  })
})


function generateAbsensiAwal() {
  if (!selectedTanggal.value || !selectedKelasId.value) {
    alert('Pilih tanggal dan kelas terlebih dahulu!')
    return
  }

  absens.value = absens.value.filter(
    (a) =>
      !(
        a.tanggal === selectedTanggal.value &&
        a.id_kelas === Number(selectedKelasId.value)
      )
  )

  const newAbsensi = siswaByKelas.value.map((siswa) => ({
    id: Date.now() + siswa.id,
    tanggal: selectedTanggal.value,
    id_kelas: Number(selectedKelasId.value),
    id_siswa: siswa.id,
    id_wali: getWaliKelas(Number(selectedKelasId.value)),
    status: 'Hadir',
  }))

  absens.value.push(...newAbsensi)
}

function updateStatusAbsensi(idSiswa, newStatus) {
  if (!selectedTanggal.value || !selectedKelasId.value) return

  let absensi = absens.value.find(
    (a) =>
      a.tanggal === selectedTanggal.value &&
      a.id_kelas === Number(selectedKelasId.value) &&
      a.id_siswa === idSiswa
  )

  if (absensi) {
    absensi.status = newStatus
  } else {
    const newAbsensi = {
      id: Date.now() + idSiswa,
      tanggal: selectedTanggal.value,
      id_kelas: Number(selectedKelasId.value),
      id_siswa: idSiswa,
      id_wali: getWaliKelas(Number(selectedKelasId.value)),
      status: newStatus,
    }
    absens.value.push(newAbsensi)
  }
}

function tambahSiswaKeAbsensi(siswa) {
  const kelasId = selectedKelasId.value
  const tanggal = selectedTanggal.value

  if (!kelasId || !tanggal) return

  const exists = tableData.value.some(
    (data) => data.id_siswa === siswa.id && data.id_kelas === kelasId
  )
  if (exists) return

  siswa.kelas_id = kelasId // langsung set kelas di siswaDataRef

  const newAbsensi = {
    id: Date.now(),
    id_siswa: siswa.id_siswa,
    id_kelas: kelasId,
    id_wali: getWaliKelas(kelasId),
    tanggal,
    status: 'Hadir',
  }

  absens.value.push(newAbsensi)
}

function hapusSiswaDariAbsensi(idSiswa) {
  if (!confirm('Yakin ingin menghapus siswa dari absensi?')) return
  console.log(tableData.value)

  const index = absens.value.findIndex(
    (a) =>
      a.tanggal === selectedTanggal.value &&
      a.id_kelas === Number(selectedKelasId.value) &&
      a.id_siswa === Number(idSiswa) // pastikan tipe sama
  )

  console.log("Index yang ditemukan:", index)

  if (index !== -1) {
    absens.value.splice(index, 1)
  } else {
  }
  console.log(tableData.value)
}

function bukaForm(item = null) {
  selectedItem.value = item
    ? { ...item }
    : {
        id: null,
        tanggal: selectedTanggal.value,
        id_kelas: Number(selectedKelasId.value),
        id_wali: getWaliKelas(Number(selectedKelasId.value)),
        id_siswa: null,
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

  data.id_kelas = Number(data.id_kelas)
  data.id_siswa = Number(data.id_siswa)
  data.id_wali = getWaliKelas(data.id_kelas)

  if (!data.id) {
    data.id = Date.now()
    absens.value.push(data)
  } else {
    const index = absens.value.findIndex((a) => a.id === data.id)
    if (index !== -1) {
      absens.value[index] = data
    } else {
      absens.value.push(data)
    }
  }

  tutupForm()
}

function hapus(id) {
  const index = absens.value.findIndex((a) => a.id === id)
  if (index !== -1) absens.value.splice(index, 1)
}

function getNamaKelas(id) {
  return kelasList.value.find((k) => k.id === id)?.nama_kelas || 'Tidak diketahui'
}

function getNamaGuru(id) {
  return guruJson.find((g) => g.id_guru === id)?.nama_guru || 'Tidak diketahui'
}

function getNamaSiswa(id) {
  return siswaDataRef.value.find((s) => s.id === id)?.nama || 'Tidak diketahui'
}

function getWaliKelas(id_kelas) {
  const kelas = kelasList.value.find((k) => k.id === id_kelas)
  return kelas?.id_guru || guruJson[0]?.id_guru || null
}

function resetFilter() {
  selectedKelasId.value = ''
  selectedTanggal.value = ''
}

// 🧼 Simpan otomatis ke localStorage
watch(absens, (val) => {
  localStorage.setItem(ABSEN_KEY, JSON.stringify(val))
}, { deep: true })

watch(siswaDataRef, (val) => {
  localStorage.setItem(SISWA_KEY, JSON.stringify(val))
}, { deep: true })

watch(kelasList, (val) => {
  localStorage.setItem(KELAS_KEY, JSON.stringify(val))
}, { deep: true })

// 🔁 Reset data ke JSON
function resetData() {
  absens.value = [...absenJson]
  siswaDataRef.value = [...siswaJson]
  kelasList.value = [...kelasJson]
  localStorage.removeItem(ABSEN_KEY)
  localStorage.removeItem(SISWA_KEY)
  localStorage.removeItem(KELAS_KEY)
}

export default function useAbsen() {
  return {
    absens,
    selectedKelasId,
    selectedTanggal,
    showForm,
    selectedItem,
    filteredAbsensi,
    tableData,
    siswaByKelas,
    bukaForm,
    tutupForm,
    simpan,
    hapus,
    getNamaKelas,
    getNamaGuru,
    getNamaSiswa,
    getWaliKelas,
    generateAbsensiAwal,
    updateStatusAbsensi,
    tambahSiswaKeAbsensi,
    hapusSiswaDariAbsensi,
    resetFilter,
    resetData,
  }
}