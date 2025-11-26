import { redirect } from "next/navigation"

export default async function QuestionsPage({ params }: { params: { jobInfoId: string } }) {
  const { jobInfoId } = params
  // Questions feature removed — redirect back to job info page
  redirect(`/app/job-infos/${jobInfoId}`)
}
