<template>
  <table class="w-full border border-gray-400">
    <thead class="bg-gray-200">
      <tr>
        <th class="border px-2 py-1">No</th>
        <th class="border px-2 py-1">Nama</th>
        <th class="border px-2 py-1">NIP</th>
        <th class="border px-2 py-1">JK</th>
        <th class="border px-2 py-1">Lahir</th>
        <th class="border px-2 py-1">Alamat</th>
        <th class="border px-2 py-1">Telp</th>
        <th class="border px-2 py-1">Email</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(guru, index) in guruList" :key="guru.id_guru">
        <td class="border px-2 py-1">{{ guru.id_guru }}</td>
        <td class="border px-2 py-1">{{ guru.nama_guru }}</td>
        <td class="border px-2 py-1">{{ guru.nip }}</td>
        <td class="border px-2 py-1">{{ guru.jenis_kelamin }}</td>
        <td class="border px-2 py-1">{{ guru.tgl_lahir }}</td>
        <td class="border px-2 py-1">{{ guru.alamat }}</td>
        <td class="border px-2 py-1">{{ guru.no_telp }}</td>
        <td class="border px-2 py-1">{{ guru.email }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['guruList'],
  emits: ['editGuru', 'deleteGuru'],
}
</script>
