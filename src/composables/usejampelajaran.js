// composables/useJamPelajaran.js
import { ref } from 'vue'

import Swal from 'sweetalert2'
import dataJson from '@/stores/jam-pelajaran.json'
import useMapel from './useMapel'
import useGuru from './useGuru'
import useKelas from './useKelas'
  

export default function useJamPelajaran() {
  const data = ref([...dataJson])
  const { data: mapelList } = useMapel()
  const { data: guruList } = useGuru()
  const { data: kelasList } = useKelas()

  const showForm = ref(false)
  const mode = ref('add')
  const readonly = ref(false)
  const selectedItem = ref(null)

  const form = ref({
    hari: '',
    jam_mulai: '',
    jam_selesai: '',
    id_mapel: '',
    id_guru: '',
    id_kelas: '',
  })

  const errors = ref({})

  const hariList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat']

  function tambahBaru() {
    mode.value = 'add'
    form.value = {
      hari: '',
      jam_mulai: '',
      jam_selesai: '',
      id_mapel: '',
      id_guru: '',
      id_kelas: '',
    }
    errors.value = {}
    readonly.value = false
    showForm.value = true
  }

  function editItem(item) {
    mode.value = 'edit'
    form.value = { ...item }
    errors.value = {}
    readonly.value = false
    showForm.value = true
  }

  function lihatItem(item) {
    mode.value = 'edit'
    form.value = { ...item }
    errors.value = {}
    readonly.value = true
    showForm.value = true
  }

  async function hapusItem(id) {
    const result = await Swal.fire({
      title: 'Konfirmasi Hapus',
      text: 'Yakin ingin menghapus data ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
      reverseButtons: true,
    })

    if (result.isConfirmed) {
      data.value = data.value.filter((item) => item.id_jam !== id)

      await Swal.fire({
        title: 'Berhasil!',
        text: 'Data berhasil dihapus.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      })
    }
  }

  async function simpan() {
    errors.value = {}

    if (!form.value.hari) errors.value.hari = 'Wajib diisi'
    if (!form.value.jam_mulai) errors.value.jam_mulai = 'Wajib diisi'
    if (!form.value.jam_selesai) errors.value.jam_selesai = 'Wajib diisi'
    if (!form.value.id_mapel) errors.value.id_mapel = 'Wajib diisi'
    if (!form.value.id_guru) errors.value.id_guru = 'Wajib diisi'
    if (!form.value.id_kelas) errors.value.id_kelas = 'Wajib diisi'

    if (Object.keys(errors.value).length > 0) {
      await Swal.fire({
        title: 'Peringatan!',
        text: 'Mohon lengkapi semua field yang wajib diisi.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      })
      return
    }

    try {
      if (mode.value === 'add') {
        let idBaru = 1
        if (data.value.length > 0) {
          const idTerakhir = data.value[data.value.length - 1].id_jam
          idBaru = idTerakhir + 1
        }
        const dataBaru = { ...form.value, id_jam: idBaru }
        data.value.push(dataBaru)
      } else {
        const index = data.value.findIndex((item) => item.id_jam === form.value.id_jam)
        if (index !== -1) {
          data.value[index] = { ...form.value }
        }
      }

      showForm.value = false
      selectedItem.value = null

      await Swal.fire({
        title: 'Berhasil!',
        text: `Data berhasil ${mode.value === 'add' ? 'ditambahkan' : 'diperbarui'}.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      })
    } catch (error) {
      await Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan saat menyimpan data.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      })
    }
  }

  async function batal() {
    // Cek apakah ada perubahan pada form
    const hasChanges = Object.keys(form.value).some((key) => {
      if (mode.value === 'add') {
        return form.value[key] !== ''
      } else {
        // Untuk mode edit, bandingkan dengan data asli jika perlu
        return false // Bisa disesuaikan dengan logika yang diinginkan
      }
    })

    if (hasChanges) {
      const result = await Swal.fire({
        title: 'Konfirmasi Batal',
        text: 'Ada perubahan yang belum disimpan. Yakin ingin membatalkan?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Ya, Batal',
        cancelButtonText: 'Tetap Edit',
        reverseButtons: true,
      })

      if (result.isConfirmed) {
        showForm.value = false
        selectedItem.value = null

        await Swal.fire({
          title: 'Dibatalkan',
          text: 'Perubahan tidak disimpan.',
          icon: 'info',
          timer: 1500,
          showConfirmButton: false,
        })
      }
    } else {
      showForm.value = false
      selectedItem.value = null
    }
  }

  function pilihItem(item) {
    selectedItem.value = item
  }

  function clearSelected() {
    selectedItem.value = null
  }

  return {
    data,
    mapelList,
    guruList,
    kelasList,
    showForm,
    mode,
    readonly,
    form,
    errors,
    hariList,
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
