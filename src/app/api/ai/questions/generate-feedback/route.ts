// Questions feature removed — this endpoint is intentionally disabled.
export async function POST() {
  return new Response("Questions feature removed", { status: 410 })
}
