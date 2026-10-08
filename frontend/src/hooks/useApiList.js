import { useCallback, useEffect, useState } from 'react'

// Drives a paginated, searchable, filterable admin table against any
// service created by createCrudService. Pages just plug in the service and
// column config; this owns loading/error state and refetching.
export function useApiList(service, initialParams = {}) {
  const [items, setItems] = useState([])
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 10, pages: 1 })
  const [params, setParams] = useState({ page: 1, limit: 8, ...initialParams })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchList = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { items: rows, meta: m } = await service.list(params)
      setItems(rows)
      setMeta(m)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [service, JSON.stringify(params)])

  useEffect(() => { fetchList() }, [fetchList])

  const setPage = (page) => setParams((p) => ({ ...p, page }))
  const setFilters = (patch) => setParams((p) => ({ ...p, ...patch, page: 1 }))

  return { items, meta, loading, error, params, setPage, setFilters, refetch: fetchList }
}
