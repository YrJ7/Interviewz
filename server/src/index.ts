import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { connectDB } from "./db.ts"
import userRouter from "./routes/users.ts"
import jobInfosRouter from "./routes/jobInfos.ts"
import interviewsRouter from "./routes/interviews.ts"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 4000

app.get("/api/health", (req, res) => res.json({ ok: true }))

app.use("/api/users", userRouter)
app.use("/api/job-infos", jobInfosRouter)
app.use("/api/interviews", interviewsRouter)

async function start() {
  await connectDB()
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://localhost:${PORT}`)
  })
}

start().catch(err => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server", err)
  process.exit(1)
})
