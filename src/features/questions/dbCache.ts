import { revalidateTag } from "next/cache"

export function getQuestionGlobalTag() {
  return `global:questions` as const
}

export function getQuestionJobInfoTag(jobInfoId: string) {
  return `jobInfo:${jobInfoId}:questions` as const
}

export function getQuestionIdTag(id: string) {
  return `id:${id}:questions` as const
}

export function revalidateQuestionCache({
  id,
  jobInfoId,
}: {
  id: string
  jobInfoId: string
}) {
  revalidateTag(getQuestionGlobalTag())
  revalidateTag(getQuestionJobInfoTag(jobInfoId))
  revalidateTag(getQuestionIdTag(id))
}
