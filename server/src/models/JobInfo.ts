import mongoose, { Schema, Document } from "mongoose"

export interface IJobInfo extends Document {
  userId: string
  name: string
  description?: string
  title?: string
  experienceLevel?: string
  createdAt: Date
  updatedAt: Date
}

const JobInfoSchema = new Schema<IJobInfo>(
  {
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    description: String,
    title: String,
    experienceLevel: String,
  },
  { timestamps: true }
)

export default mongoose.models.JobInfo || mongoose.model<IJobInfo>("JobInfo", JobInfoSchema)
