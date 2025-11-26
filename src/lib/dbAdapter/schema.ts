// Minimal schema objects used by the compatibility shim.
export const experienceLevels = ["junior", "mid-level", "senior"] as const
export type ExperienceLevel = (typeof experienceLevels)[number]

export const questionDifficulties: never[] = []
export type QuestionDifficulty = never

function field(name: string) {
  return { name }
}

export const JobInfoTable = {
  id: field("id"),
  title: field("title"),
  name: field("name"),
  experienceLevel: field("experienceLevel"),
  description: field("description"),
  userId: field("userId"),
  createdAt: field("createdAt"),
  updatedAt: field("updatedAt"),
  $inferSelect: {} as any,
  $inferInsert: {} as any,
}

export const UserTable = {
  id: field("id"),
  clerkId: field("clerkId"),
  name: field("name"),
  email: field("email"),
  createdAt: field("createdAt"),
  updatedAt: field("updatedAt"),
  $inferSelect: {} as any,
  $inferInsert: {} as any,
}

export const InterviewTable = {
  id: field("id"),
  jobInfoId: field("jobInfoId"),
  humeChatId: field("humeChatId"),
  createdAt: field("createdAt"),
  updatedAt: field("updatedAt"),
  interviewer: field("interviewer"),
  $inferSelect: {} as any,
  $inferInsert: {} as any,
}

export default {
  JobInfoTable,
  UserTable,
  InterviewTable,
  experienceLevels,
  questionDifficulties,
}

