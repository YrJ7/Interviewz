import { revalidateUserCache } from "./dbCache"

const SERVER_URL = process.env.SERVER_URL ?? "http://localhost:4000"

export async function upsertUser(user: any) {
  const res = await fetch(`${SERVER_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  })
  const data = await res.json()
  revalidateUserCache(data.id)
}

export async function deleteUser(id: string) {
  await fetch(`${SERVER_URL}/api/users/${id}`, { method: "DELETE" })
  revalidateUserCache(id)
}
