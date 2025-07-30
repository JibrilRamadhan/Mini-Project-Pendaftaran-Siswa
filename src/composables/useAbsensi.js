import { ref } from 'vue'

export function useAbsensi() {
  const absen = ref([])

  async function loadData(kodeKelas, tanggal) {
    const res = await fetch('/absen.json')
    console.log(kodeKelas)
    const data = await res.json()
    console.log(tanggal)

    const record = data.find(d =>
      d.kode_kelas === kodeKelas && d.tanggal === tanggal
    )

    console.log(record)

    if (!record) {
      alert('Data absensi tidak ditemukan untuk kelas dan tanggal tersebut.')
    } else {
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

  return {
    absen,
    loadData,
    updateStatus,
    hapusMurid
  }
}
