import { Router } from "express"
import User from "../models/User.ts"

const router = Router()

// GET /api/users?id=... or list
router.get("/", async (req, res) => {
  const { id, clerkId } = req.query as { id?: string; clerkId?: string }
  if (id) {
    const user = await User.findById(id)
    return res.json(user ? [user] : [])
  }
  if (clerkId) {
    const u = await User.findOne({ clerkId: String(clerkId) })
    return res.json(u ? [u] : [])
  }
  const users = await User.find().limit(50)
  res.json(users)
})

// POST /api/users -> upsert by clerkId if present
router.post("/", async (req, res) => {
  const { clerkId, name, email } = req.body
  if (clerkId) {
    const existing = await User.findOne({ clerkId })
    if (existing) {
      existing.name = name ?? existing.name
      existing.email = email ?? existing.email
      await existing.save()
      return res.json(existing)
    }
  }
  const user = await User.create({ clerkId, name, email })
  res.status(201).json(user)
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params
  await User.findByIdAndDelete(id)
  res.status(204).end()
})

export default router
