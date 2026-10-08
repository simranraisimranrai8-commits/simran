export function paginate(items, page, perPage) {
  const pages = Math.max(1, Math.ceil(items.length / perPage))
  const current = Math.min(page, pages)
  return { pages, current, items: items.slice((current - 1) * perPage, current * perPage) }
}
