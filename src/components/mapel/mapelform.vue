<template>
  <div class="space-y-6">
    <div>
      <input
        :value="form.nama_mapel"
        @input="$emit('update-form', 'nama_mapel', $event.target.value)"
        placeholder="Nama Mapel"
        class="w-full border px-6 py-4 rounded-lg text-xl"
      />
      <p v-if="errors.nama_mapel" class="text-red-500 text-base mt-1">{{ errors.nama_mapel }}</p>
    </div>

    <div>
      <input
        :value="form.kode_mapel"
        @input="$emit('update-form', 'kode_mapel', $event.target.value)"
        placeholder="Kode Mapel"
        class="w-full border px-6 py-4 rounded-lg text-xl"
      />
      <p v-if="errors.kode_mapel" class="text-red-500 text-base mt-1">{{ errors.kode_mapel }}</p>
    </div>

    <div>
      <input
        :value="form.id_guru"
        @input="$emit('update-form', 'id_guru', Number($event.target.value))"
        type="number"
        placeholder="ID Guru"
        class="w-full border px-6 py-4 rounded-lg text-xl"
      />
      <p v-if="errors.id_guru" class="text-red-500 text-base mt-1">{{ errors.id_guru }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['form', 'errors']
};
</script>
