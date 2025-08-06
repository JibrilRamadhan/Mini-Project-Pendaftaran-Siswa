import { ref, computed } from 'vue'

export default function useSearch(source, fields, guruList = null) {
  const query = ref('')

  const filtered = computed(() => {
    if (!query.value) return source.value
    const q = query.value.toLowerCase()

    return source.value.filter(item => {
      const matchField = fields.some(field => {
        const value = (item[field] || '').toString().toLowerCase()
        return value.includes(q)
      })

      const matchGuru = guruList
        ? (guruList[item.id_guru - 1] || '').toLowerCase().includes(q)
        : false

      return matchField || matchGuru
    })
  })

  return { query, filtered }
}
