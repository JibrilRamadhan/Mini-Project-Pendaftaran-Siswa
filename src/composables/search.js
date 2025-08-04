import { ref, computed } from 'vue'

export default function useSearch(source, fields) {
  const query = ref('')

  const filtered = computed(() => {
    if (!query.value) return source.value
    const q = query.value.toLowerCase()
    return source.value.filter(item =>
      fields.some(field => {
        const value = (item[field] || '').toString().toLowerCase()
        return value.includes(q)
      })
    )
  })

  return { query, filtered }
}
