import mongoose from "mongoose"

export async function connectDB() {
  const uri = process.env.MONGODB_URI ?? "mongodb://localhost:27017/interviewz"
  await mongoose.connect(uri)
  // eslint-disable-next-line no-console
  console.log("Connected to MongoDB")
}
