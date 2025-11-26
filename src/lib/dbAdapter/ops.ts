// Lightweight compatibility shims for common Drizzle operators used in the app.
export function eq(field: any, value: any) {
  return { type: "eq", field: getFieldName(field), value }
}

export function and(...conds: any[]) {
  return { type: "and", conds }
}

export function or(...conds: any[]) {
  return { type: "or", conds }
}

export function desc(field: any) {
  return { type: "order", direction: "desc", field: getFieldName(field) }
}

export function asc(field: any) {
  return { type: "order", direction: "asc", field: getFieldName(field) }
}

export function isNotNull(field: any) {
  return { type: "isNotNull", field: getFieldName(field) }
}

export function count() {
  return { type: "count" }
}

function getFieldName(f: any) {
  if (f == null) return f
  if (typeof f === "string") return f
  if (typeof f.name === "string") return f.name
  if (typeof f === "object" && "column" in f) return (f as any).column
  return String(f)
}
