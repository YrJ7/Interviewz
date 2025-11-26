import { JobInfoTable, InterviewTable, UserTable } from "./schema"

const SERVER_URL = process.env.SERVER_URL ?? "http://localhost:4000"

function parseWhere(where: any) {
  if (!where) return {}
  if (where.type === "eq") return { [where.field]: where.value }
  if (where.type === "and") {
    return Object.assign({}, ...where.conds.map(parseWhere))
  }
  return {}
}

export const db = {
  query: {
    JobInfoTable: {
      async findMany(opts: any = {}) {
        const filters = parseWhere(opts.where)
        const params = new URLSearchParams()
        if (filters.userId) params.set("userId", filters.userId)
        const url = `${SERVER_URL}/api/job-infos?${params.toString()}`
        const res = await fetch(url)
        return res.json()
      },
      async findFirst(opts: any = {}) {
        if (opts.where && opts.where.type === "eq" && opts.where.field === "id") {
          const id = opts.where.value
          const res = await fetch(`${SERVER_URL}/api/job-infos/${id}`)
          if (res.status === 404) return null
          return res.json()
        }
        const list = await this.findMany(opts)
        return list[0] ?? null
      },
    },
    InterviewTable: {
      async findMany(opts: any = {}) {
        const filters = parseWhere(opts.where)
        const params = new URLSearchParams()
        if (filters.jobInfoId) params.set("jobInfoId", filters.jobInfoId)
        const url = `${SERVER_URL}/api/interviews?${params.toString()}`
        const res = await fetch(url)
        return res.json()
      },
      async findFirst(opts: any = {}) {
        if (opts.where && opts.where.type === "eq" && opts.where.field === "id") {
          const id = opts.where.value
          const res = await fetch(`${SERVER_URL}/api/interviews/${id}`)
          if (res.status === 404) return null
          return res.json()
        }
        const list = await this.findMany(opts)
        return list[0] ?? null
      },
    },
    UserTable: {
      async findFirst(opts: any = {}) {
        if (opts.where && opts.where.type === "eq" && opts.where.field === "id") {
          const id = opts.where.value
          const res = await fetch(`${SERVER_URL}/api/users?id=${encodeURIComponent(id)}`)
          const list = await res.json()
          return list[0] ?? null
        }
        return null
      },
    },
  },
  insert(table: any) {
    return {
      values: (obj: any) => ({
        returning: async (projection: any) => {
          if (table === JobInfoTable) {
            const res = await fetch(`${SERVER_URL}/api/job-infos`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(obj),
            })
            const data = await res.json()
            return [data]
          }
          if (table === InterviewTable) {
            const res = await fetch(`${SERVER_URL}/api/interviews`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(obj),
            })
            const data = await res.json()
            return [data]
          }
          if (table === UserTable) {
            const res = await fetch(`${SERVER_URL}/api/users`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(obj),
            })
            const data = await res.json()
            return [data]
          }
          throw new Error("Insert: unknown table")
        },
      }),
    }
  },
  update() {
    // Minimal stub for update flows used in the app. The update API expects a PATCH to the resource.
    return {
      set: (_obj: any) => ({
        where: (_cond: any) => ({
          returning: async (projection: any) => {
            // attempt to extract id from condition
            try {
              const cond = _cond as any
              if (cond && cond.type === "eq" && cond.field === "id") {
                const id = cond.value
                const res = await fetch(`${SERVER_URL}${projection === undefined ? "" : ""}`)
                // Fallback: caller should use higher-level helpers; we return null for safety.
                return [null]
              }
            } catch (e) {
              // ignore
            }
            return [null]
          },
        }),
      }),
    }
  },
}
