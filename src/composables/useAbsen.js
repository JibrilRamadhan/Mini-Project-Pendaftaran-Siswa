// composables/useAbsen.js
import { ref, computed } from 'vue'
import absenData from '../stores/absen.json'
import kelasData from '../stores/kelas.json'
import siswaData from '../stores/siswa.json'
import guruData from '../stores/guru.json'

const absens = ref([...absenData])
const selectedKelasId = ref('')
const selectedTanggal = ref('')
const showForm = ref(false)
const selectedItem = ref(null)

// Computed untuk mendapatkan siswa berdasarkan kelas yang dipilih
const siswaByKelas = computed(() => {
  if (!selectedKelasId.value) return []
  return siswaData.filter(siswa => siswa.kelas_id === Number(selectedKelasId.value))
})

// Data absensi yang sudah difilter berdasarkan tanggal dan kelas
const filteredAbsensi = computed(() => {
  if (!selectedTanggal.value || !selectedKelasId.value) return []

  return absens.value.filter(item => {
    return item.tanggal === selectedTanggal.value && item.id_kelas === Number(selectedKelasId.value)
  })
})

// Data lengkap untuk tampilan tabel - menggabungkan data siswa dengan absensi
const tableData = computed(() => {
  if (!selectedTanggal.value || !selectedKelasId.value) return []

  return siswaByKelas.value.map(siswa => {
    const absensi = filteredAbsensi.value.find(a => a.id_siswa === siswa.id)

    return {
      id_siswa: siswa.id,
      nama_siswa: siswa.nama,
      nisn: siswa.nisn,
      id_kelas: Number(selectedKelasId.value),
      tanggal: selectedTanggal.value,
      status: absensi?.status || '',
      absen_id: absensi?.id || null,
      has_absen: !!absensi
    }
  })
})

function generateAbsensiAwal() {
  if (!selectedTanggal.value || !selectedKelasId.value) {
    alert('Pilih tanggal dan kelas terlebih dahulu!')
    return
  }

  absens.value = absens.value.filter(a =>
    !(a.tanggal === selectedTanggal.value && a.id_kelas === Number(selectedKelasId.value))
  )

  const newAbsensi = siswaByKelas.value.map(siswa => ({
    id: Date.now() + siswa.id,
    tanggal: selectedTanggal.value,
    id_kelas: Number(selectedKelasId.value),
    id_siswa: siswa.id,
    id_wali: getWaliKelas(Number(selectedKelasId.value)),
    status: 'Hadir'
  }))

  absens.value.push(...newAbsensi)
}

function updateStatusAbsensi(idSiswa, newStatus) {
  if (!selectedTanggal.value || !selectedKelasId.value) return

  let absensi = absens.value.find(a =>
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
      status: newStatus
    }
    absens.value.push(newAbsensi)
  }
}

function tambahSiswaKeAbsensi(siswa) {
  if (!selectedTanggal.value || !selectedKelasId.value) {
    alert('Pilih tanggal dan kelas terlebih dahulu!')
    return
  }

  const existingAbsensi = absens.value.find(a =>
    a.tanggal === selectedTanggal.value &&
    a.id_kelas === Number(selectedKelasId.value) &&
    a.id_siswa === siswa.id
  )

  if (existingAbsensi) {
    alert('Siswa sudah ada dalam absensi!')
    return
  }

  const newAbsensi = {
    id: Date.now() + siswa.id,
    tanggal: selectedTanggal.value,
    id_kelas: Number(selectedKelasId.value),
    id_siswa: siswa.id,
    id_wali: getWaliKelas(Number(selectedKelasId.value)),
    status: 'Hadir'
  }

  absens.value.push(newAbsensi)
}

function hapusSiswaDariAbsensi(idSiswa) {
  if (!confirm('Yakin ingin menghapus siswa dari absensi?')) return

  const index = absens.value.findIndex(a =>
    a.tanggal === selectedTanggal.value &&
    a.id_kelas === Number(selectedKelasId.value) &&
    a.id_siswa === idSiswa
  )

  if (index !== -1) {
    absens.value.splice(index, 1)
  }
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
  return kelasData.find(k => k.id_kelas === id)?.nama_kelas || 'Tidak diketahui'
}

function getNamaGuru(id) {
  return guruData.find(g => g.id_guru === id)?.nama_guru || 'Tidak diketahui'
}

function getNamaSiswa(id) {
  return siswaData.find(s => s.id === id)?.nama || 'Tidak diketahui'
}

function getWaliKelas(id_kelas) {
  const kelas = kelasData.find(k => k.id_kelas === id_kelas)
  return kelas?.id_guru || guruData[0]?.id_guru || null
}

function resetFilter() {
  selectedKelasId.value = ''
  selectedTanggal.value = ''
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
    resetFilter
  }
}
