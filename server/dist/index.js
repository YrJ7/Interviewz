const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const { users, jobInfos, interviews, uuidv4 } = require("./data")

const app = express()
app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 4000

app.get("/api/health", (req, res) => res.json({ ok: true }))

// Users
app.get("/api/users", (req, res) => {
  const { id, clerkId } = req.query
  if (id) return res.json(users.filter(u => u.id === id))
  if (clerkId) return res.json(users.filter(u => u.clerkId === clerkId))
  res.json(users.slice(0, 50))
})

app.post("/api/users", (req, res) => {
  const { clerkId, name, email } = req.body
  if (clerkId) {
    const existing = users.find(u => u.clerkId === clerkId)
    if (existing) {
      existing.name = name ?? existing.name
      existing.email = email ?? existing.email
      return res.json(existing)
    }
  }
  const u = { id: uuidv4(), clerkId, name, email, createdAt: new Date(), updatedAt: new Date() }
  users.push(u)
  res.status(201).json(u)
})

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params
  const idx = users.findIndex(u => u.id === id)
  if (idx >= 0) users.splice(idx, 1)
  res.status(204).end()
})

// JobInfos
app.get("/api/job-infos", (req, res) => {
  const { userId } = req.query
  if (userId) return res.json(jobInfos.filter(j => j.userId === userId))
  res.json(jobInfos.slice(0, 200))
})

app.post("/api/job-infos", (req, res) => {
  const item = { id: uuidv4(), ...req.body, createdAt: new Date(), updatedAt: new Date() }
  jobInfos.push(item)
  res.status(201).json(item)
})

app.get("/api/job-infos/:id", (req, res) => {
  const item = jobInfos.find(j => j.id === req.params.id)
  if (!item) return res.status(404).json({ error: "not found" })
  res.json(item)
})

app.put("/api/job-infos/:id", (req, res) => {
  const idx = jobInfos.findIndex(j => j.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: "not found" })
  jobInfos[idx] = { ...jobInfos[idx], ...req.body, updatedAt: new Date() }
  res.json(jobInfos[idx])
})

app.delete("/api/job-infos/:id", (req, res) => {
  const idx = jobInfos.findIndex(j => j.id === req.params.id)
  if (idx >= 0) jobInfos.splice(idx, 1)
  res.status(204).end()
})

// Interviews
app.get("/api/interviews", (req, res) => {
  const { jobInfoId } = req.query
  if (jobInfoId) return res.json(interviews.filter(i => i.jobInfoId === jobInfoId))
  res.json(interviews.slice(0, 200))
})

app.post("/api/interviews", (req, res) => {
  const item = { id: uuidv4(), ...req.body, createdAt: new Date(), updatedAt: new Date() }
  interviews.push(item)
  res.status(201).json(item)
})

app.get("/api/interviews/:id", (req, res) => {
  const item = interviews.find(i => i.id === req.params.id)
  if (!item) return res.status(404).json({ error: "not found" })
  res.json(item)
})

app.put("/api/interviews/:id", (req, res) => {
  const idx = interviews.findIndex(i => i.id === req.params.id)
  if (idx === -1) return res.status(404).json({ error: "not found" })
  interviews[idx] = { ...interviews[idx], ...req.body, updatedAt: new Date() }
  res.json(interviews[idx])
})

app.delete("/api/interviews/:id", (req, res) => {
  const idx = interviews.findIndex(i => i.id === req.params.id)
  if (idx >= 0) interviews.splice(idx, 1)
  res.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Dev server (in-memory) listening on http://localhost:${PORT}`)
})
