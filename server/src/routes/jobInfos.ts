import { Router } from "express"
import JobInfo from "../models/JobInfo.ts"

const router = Router()

// GET /api/job-infos?userId=...
router.get("/", async (req, res) => {
  const { userId } = req.query as { userId?: string }
  if (!userId) return res.status(400).json({ error: "userId is required" })
  const jobInfos = await JobInfo.find({ userId }).sort({ updatedAt: -1 }).limit(100)
  res.json(jobInfos)
})

router.post("/", async (req, res) => {
  const { userId, name, description, title, experienceLevel } = req.body
  if (!userId || !name) return res.status(400).json({ error: "userId and name are required" })
  const jobInfo = await JobInfo.create({ userId, name, description, title, experienceLevel })
  res.status(201).json(jobInfo)
})

router.get(":" , async (req, res) => {
  const { id } = req.params
  const jobInfo = await JobInfo.findById(id)
  if (!jobInfo) return res.status(404).json({ error: "not found" })
  res.json(jobInfo)
})

router.put(":id", async (req, res) => {
  const { id } = req.params
  const updated = await JobInfo.findByIdAndUpdate(id, req.body, { new: true })
  if (!updated) return res.status(404).json({ error: "not found" })
  res.json(updated)
})

router.delete(":id", async (req, res) => {
  const { id } = req.params
  await JobInfo.findByIdAndDelete(id)
  res.status(204).end()
})

export default router
