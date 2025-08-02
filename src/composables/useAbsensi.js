import { update } from 'three/examples/jsm/libs/tween.module.js'
import { ref, computed } from 'vue'

export function useAbsensi() {
  const absen = ref([])
  const daftarKelas = ref([])

  const daftarGuru = ref([])
  const namaWaliKelas = ref('Delay')

  const sortKey = ref('nama') 
  const sortOrder = ref('asc')

  const kodeKelas = ref('RPL12-01')
  const displayKodeKelas = ref('RPL12-01')
  const tanggal = ref('2025-08-01')
  const displayTanggal = ref('2025-08-01')

  const namaKelasAktif = computed(() => {
    const kelas = daftarKelas.value.find(k => k.kode_kelas === displayKodeKelas.value)
    return kelas ? kelas.nama_kelas : displayKodeKelas.value
  })

  async function loadData(kode, tgl) {
    const res = await fetch('/absen.json')
    const data = await res.json()
    console.log(namaWaliKelas.value)

    namaWaliKelas.value = cariWaliKelas(kode)

    console.log(namaWaliKelas.value)

    const record = data.find(d =>
      d.kode_kelas === kode && d.tanggal === tgl
    )

    if (!record) {
      alert('Data absensi tidak ditemukan untuk kelas dan tanggal tersebut.')
    } else {
      displayKodeKelas.value = kode
        const kelas = daftarKelas.value.find(k => k.kode_kelas === kode)
        if (kelas) {
          const wali = daftarGuru.value.find(g => g.id_guru === kelas.id_wali_kelas)
          console.log("WALI: ", wali)
          namaWaliKelas.value = wali ? wali.nama_guru : 'Tidak diketahui'
          console.log("NAMA WALI KELAS: ", namaWaliKelas.value)
        }
      displayTanggal.value = tgl
      absen.value = record.absen
    }
  }

  async function loadKelas() {
    const res = await fetch('/kelas.json')
    const data = await res.json()
    daftarKelas.value = data
  }

  async function loadGuru() {
    const res = await fetch('/guru.json')
    const data = await res.json()
    daftarGuru.value = data
  }

  function cariWaliKelas(kode_kelas) {
  const kelas = daftarKelas.value.find(k => k.kode_kelas === kode_kelas)
  if (!kelas) return 'Tidak diketahui'

  const guru = daftarGuru.value.find(g => g.id_guru === kelas.id_wali_kelas)
  return guru ? guru.nama_guru : 'Tidak diketahui'
}


  function updateStatus(nisn, status) {
    const item = absen.value.find(i => i.nisn === nisn)
    if (item) item.status = status
  }

  function hapusMurid(nisn) {
    absen.value = absen.value.filter(i => i.nisn !== nisn)
  }

  function toggleSort(key) {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortKey.value = key
      sortOrder.value = 'asc'
    }
  }

  function tambahMurid(newItem) {
    const exists = absen.value.some(i => i.nisn === newItem.nisn)
    if (exists) {
      alert('NISN sudah terdaftar.')
      return
    }
    absen.value.push(newItem)
  }

  function updateKeterangan(nisn, keterangan) {
    const item = absen.value.find(i => i.nisn === nisn)
    if (item) item.keterangan = keterangan
  }


  return {
    absen,
    daftarKelas,
    kodeKelas,
    namaWaliKelas,
    tanggal,
    displayKodeKelas,
    displayTanggal,
    namaKelasAktif,
    sortKey,
    sortOrder,
    loadData,
    loadKelas,
    loadGuru,
    cariWaliKelas,
    updateStatus,
    hapusMurid,
    toggleSort,
    tambahMurid,
    updateKeterangan
  }
}
