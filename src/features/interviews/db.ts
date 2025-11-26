import { revalidateInterviewCache } from "./dbCache"

const SERVER_URL = process.env.SERVER_URL ?? "http://localhost:4000"

export async function insertInterview(interview: any) {
  const res = await fetch(`${SERVER_URL}/api/interviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(interview),
  })
  const data = await res.json()
  revalidateInterviewCache(data)
  return data
}

export async function updateInterview(id: string, interview: any) {
  const res = await fetch(`${SERVER_URL}/api/interviews/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(interview),
  })
  const data = await res.json()
  revalidateInterviewCache(data)
  return data
}
