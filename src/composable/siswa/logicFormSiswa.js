// // src/composables/siswa/logicFormSiswa.js
// import { ref } from 'vue'


// export function useFormSiswa() {
//   const formData = ref({
//     nama: '',
//     alamat: '',
//     tgl_lahir: '',
//     jk: '',
//     no_tlp: '',
//     nama_wali: ''
//   })

//   const isEdit = ref(false)
//   const editIndex = ref(null)

//   const submitForm = () => {
//     if (isEdit.value) {
//       console.log('Update data:', formData.value)
//       // Tambah logic update ke list siswa
//     } else {
//       console.log('Tambah data baru:', formData.value)
//       // Tambah logic tambah ke list siswa
//     }
//     resetForm()
//   }

//   const setEditForm = (data, index) => {
//     formData.value = { ...data }
//     isEdit.value = true
//     editIndex.value = index
//   }

//   const resetForm = () => {
//     formData.value = {
//       nama: '',
//       alamat: '',
//       tgl_lahir: '',
//       jk: '',
//       no_tlp: '',
//       nama_wali: ''
//     }
//     isEdit.value = false
//     editIndex.value = null
//   }

//   return {
//     formData,
//     isEdit,
//     submitForm,
//     setEditForm,
//     resetForm
//   }
// }
