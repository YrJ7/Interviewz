import mongoose, { Schema, Document } from "mongoose"

export interface IInterview extends Document {
  jobInfoId: string
  humeChatId?: string
  interviewer?: string
  createdAt: Date
  updatedAt: Date
}

const InterviewSchema = new Schema<IInterview>(
  {
    jobInfoId: { type: String, required: true, index: true },
    humeChatId: String,
    interviewer: String,
  },
  { timestamps: true }
)

export default mongoose.models.Interview || mongoose.model<IInterview>("Interview", InterviewSchema)
