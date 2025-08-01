import { ref } from 'vue'

export function useAbsensi() {
  const absen = ref([])
  
  const sortKey = ref('nama') 
  const sortOrder = ref('asc')

  const kodeKelas = ref('KLS001')
  const displayKodeKelas = ref();
  const tanggal = ref('2025-07-28')
  const displayTanggal = ref()

async function loadData(kodeKelas, tanggal) {
  const res = await fetch('/absen.json')
  const data = await res.json()

  const record = data.find(d =>
    d.kode_kelas === kodeKelas && d.tanggal === tanggal
  )

  if (!record) {
    alert('Data absensi tidak ditemukan untuk kelas dan tanggal tersebut.')
  } else {
    displayKodeKelas.value = kodeKelas
    displayTanggal.value = tanggal
    absen.value = record.absen
  }
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


  return {
    absen,
    kodeKelas,
    displayKodeKelas,
    tanggal,
    displayTanggal,
    sortKey,
    sortOrder,
    loadData,
    updateStatus,
    hapusMurid,
    toggleSort,
    tambahMurid
  }
}
