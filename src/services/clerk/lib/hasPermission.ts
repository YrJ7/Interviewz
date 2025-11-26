import { auth } from "@clerk/nextjs/server"

type Permission =
  | "unlimited_resume_analysis"
  | "unlimited_interviews"
  | "1_interview"

// Note: question-specific permissions were removed when the Questions feature
// was deleted. Keep or re-add if you reintroduce that feature.

export async function hasPermission(permission: Permission) {
  const { has } = await auth()
  return has({ feature: permission })
}
