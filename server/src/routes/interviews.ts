import { Router } from "express"
import Interview from "../models/Interview.ts"

const router = Router()

// GET /api/interviews?jobInfoId=...
router.get("/", async (req, res) => {
  const { jobInfoId } = req.query as { jobInfoId?: string }
  const q: any = {}
  if (jobInfoId) q.jobInfoId = jobInfoId
  const interviews = await Interview.find(q).sort({ createdAt: -1 }).limit(200)
  res.json(interviews)
})

router.post("/", async (req, res) => {
  const doc = await Interview.create(req.body)
  res.status(201).json(doc)
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  const doc = await Interview.findById(id)
  if (!doc) return res.status(404).json({ error: "not found" })
  res.json(doc)
})

router.put("/:id", async (req, res) => {
  const { id } = req.params
  const updated = await Interview.findByIdAndUpdate(id, req.body, { new: true })
  if (!updated) return res.status(404).json({ error: "not found" })
  res.json(updated)
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  await Interview.findByIdAndDelete(id)
  res.status(204).end()
})

export default router
